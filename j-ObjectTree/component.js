COMPONENT('objecttree', function(self, config) {
	var tmpl_expand = '<i class="fa fa-chevron-down"></i>';
	var tmpl_toolbox = '<div class="toolbox"><i class="fa fa-copy" title="Copy data"></i><i class="fa fa-link" title="Copy path"></i></div>';
	var tmpl_beg = '<div class="objecttree-item" data-path="{0}" title="{0}"><div class="objecttree-item-key"><span class="objecttree-key {1}">{2}</span>{4}{3}<span class="dots hidden"> ...</span>{5}</div>';
	var tmpl_end = '<div>{0}{1}</div></div>';
	var tmpl_simple = '<div class="objecttree-item objecttree-item-key" data-path="{0}" title="{0}"><span class="objecttree-key mr5">"{1}":</span><span class="objecttree-{2} mr5">{3}</span>{4}</div>';
	var data;

	const get = (obj, path) => path.split(".").reduce((r, k) => r?.[k], obj);

	self.readonly();

	self.make = function() {
		self.aclass('objecttree');
		self.event('click', 'i.fa-chevron-down', function() {
			var el = $(this);
			el.tclass('fa-rotate-270');
			el.parent().find('.dots').tclass('hidden');
			el.closest('.objecttree-item').find('> div.objecttree-item').tclass('hidden');
		});
		self.event('click', '.toolbox i', function() {
			var el = $(this);
			var ispath = el.hclass('fa-link');
			var path = el.closest('.objecttree-item').attrd('path');
			var data2;
			if (ispath)
				data2 = path;
			else
				data2 = get(data, path);
			navigator.clipboard.writeText(ispath ? data2 : STRINGIFY(data2)).catch(e => {});
			config.exec && EXEC(config.exec, ispath ? 'path' : 'data', data2);
		});
	};

	self.setter = function(value) {
		if (!value || typeof value !== 'object') {
			self.html(value);
			return;
		}
		data = value;
		var isArr = value instanceof Array;
		var html = '<div class="" data-path="{0}" title="{0}"><div><span class="objecttree-key {1}"></span>{2}</div>'.format('', '', isArr ? '[' : '{');
		html += isArr ? self.treeArray(value, '', 0) : self.tree(value, '', 0);
		html += tmpl_end.format(isArr ? ']' : '}');
		self.html(html);
	};

	self.tree = function(obj, path, indent) {
		var isArr = obj instanceof Array;
		var keys = Object.keys(obj);
		var kl = keys.length;
		if ((isArr && !obj.length) || !kl)
			return '';
		var temp = '';
		indent++;
		for (var i = 0; i < kl; i++) {
			var isNum = !isNaN(keys[i]);
			var p = path + (path === '' ? path : '.') + keys[i];
			var item = obj[keys[i]];
			var type = item instanceof Array ? 'array' : item instanceof Date ? 'date' : typeof(item);
			if (item == null)
				type = 'null';
			var length = type === 'array' ? item.length : type === 'object' ? Object.keys(item).length : 0;
			var last = i === (kl - 1);
			if (type === 'array' && length) {
				temp += tmpl_beg.format(p, 'mr5', '"{0}":'.format(keys[i]), '[', length > 0 ? tmpl_expand : '', tmpl_toolbox);
				temp += self.treeArray(item, p, indent + 1);
				temp += tmpl_end.format(']', last ? '' : ',');
			} else if (type === 'object' && length) {
				temp += tmpl_beg.format(p, 'mr5', '"{0}":'.format(keys[i]), '{', length > 0 ? tmpl_expand : '', tmpl_toolbox);
				temp += self.tree(item, p, indent);
				temp += tmpl_end.format('}', last ? '' : ',');
			} else
				temp += tmpl_simple.format(p, keys[i], type, simpleformat(type, item),tmpl_toolbox);
		}
		return temp;
	};

	self.treeArray = function(arr, path, indent) {
		var tmp = '';
		for (let i = 0; i < arr.length; i++) {
			var item = arr[i];
			var type = item instanceof Array ? 'array' : item instanceof Date ? 'date' : typeof(item);
			var value = '';
			var path2 = path + (path === '' ? path : '.') + i;
			var last = i === (arr.length - 1);
			switch (type) {
				case 'array':
					value += tmpl_beg.format(path2, 'mr5', '', '[', tmpl_expand, tmpl_toolbox);
					value += self.treeArray(item, path2, indent);
					value += tmpl_end.format(']', last ? '' : ',');
					break;
				case 'object':
					value += tmpl_beg.format(path2, 'mr5', '', '{', tmpl_expand, tmpl_toolbox);
					value += self.tree(item, path2, indent);
					value += tmpl_end.format('}', last ? '' : ',');
					break;
				default:
					value = '<div class="objecttree-item objecttree-item-key" data-path="{0}" title="{0}"><span class="objecttree-key mr5"></span><span class="objecttree-{1} mr5">{2}</span>{3}{4}</div>'.format(path2, type, simpleformat(type, item), last  ? '' : ',', tmpl_toolbox);
			}
			tmp += value;
		}
		return tmp;
	};

	function simpleformat(type, val) {
		var value;
		switch (type) {
			case 'date':
				value = val;
				break;
			case 'string':
				value = '"' + val + '"';
				break;
			case 'null':
				value = 'null';
				break;
			case 'array':
				value = '[]';
				break;
			case 'object':
				value = '{}';
				break;
			default:
				value = val;
		}
		return value;
	};
});