COMPONENT('objecttree', 'copydata:Copy data;copypath:Copy path', function(self, config, cls) {

	var cls2 = '.' + cls;
	var tmpl_expand = '<i class="ti ti-chevron-down"></i>';
	var tmpl_toolbox = '<div class="toolbox"><i class="ti ti-copy" title="{copydata}"></i><i class="ti ti-link" title="{copypath}"></i></div>'.args(config);
	var tmpl_beg = '<div class="CLS-item" data-path="{0}" title="{0}"><div class="CLS-item-key"><span class="CLS-key {1}">{2}</span>{4}{3}<span class="dots hidden"> ...</span>{5}</div>'.replace(/CLS/g, cls);
	var tmpl_end = '<div>{0}{1}</div></div>';
	var tmpl_simple = '<div class="CLS-item CLS-item-key" data-path="{0}" title="{0}"><span class="CLS-key mr5">"{1}":</span><span class="CLS-{2} mr5">{3}</span>{4}</div>'.replace(/CLS/g, cls);
	var data;

	var get = (obj, path) => path.split('.').reduce((r, k) => r?.[k], obj);

	self.readonly();

	self.make = function() {

		self.aclass(cls);

		self.event('click', 'i.ti-chevron-down', function() {
			var el = $(this);
			el.tclass('ti-rotate-270');
			el.parent().find('.dots').tclass('hidden');
			el.closest(cls2 + '-item').find('> div' + cls2 + '-item').tclass('hidden');
		});

		self.event('click', '.toolbox i', function() {
			var el = $(this);
			var ispath = el.hclass('ti-link');
			var path = el.closest(cls2 + '-item').attrd('path');
			var data2;
			data2 = ispath ? path : get(data, path);
			navigator.clipboard.writeText(ispath ? data2 : STRINGIFY(data2)).catch(e => {});
			config.exec && self.EXEC(config.exec, ispath ? 'path' : 'data', data2);
		});
	};

	self.setter = function(value) {

		if (!value || typeof value !== 'object') {
			self.html(value);
			return;
		}

		data = value;
		var isArr = value instanceof Array;
		var html = ('<div data-path="{0}" title="{0}"><div><span class="' + cls + '-key {1}"></span>{2}</div>').format('', '', isArr ? '[' : '{');
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
			if (item == null)
				type = 'null';
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
					value = '<div class="{5}-item {5}-item-key" data-path="{0}" title="{0}"><span class="{5}-key mr5"></span><span class="{5}-{1} mr5">{2}</span>{3}{4}</div>'.format(path2, type, simpleformat(type, item), last  ? '' : ',', tmpl_toolbox, cls);
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