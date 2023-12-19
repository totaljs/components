COMPONENT('folder', 'up:..;root:Root;scrollbar:true;delimiter:/;key:name', function(self, config, cls) {

	var cls2 = '.' + cls;
	var epath, eitems, eselected;
	var drag = {};

	self.opt = {};
	self.readonly();
	self.nocompile();
	self.template = Tangular.compile('<div data-index="{{ $.index }}" class="{0}-item {0}-{{ if type === 1 }}folder{{ else }}file{{ fi }}"><span class="{0}-item-options"><i class="ti ti-ellipsis-h"></i></span>{{ if checkbox }}<div class="{0}-checkbox{{ if checked }} {0}-checkbox-checked{{ fi }}"><i class="ti ti-check"></i></div>{{ fi }}<span class="{0}-item-icon"><i class="ti ti-{{ icon | def(\'chevron-right\') }}"></i></span><div class="{0}-item-name{{ if classname }} {{ classname }}{{ fi }}">{{ name }}</div></div>'.format(cls));

	drag.drop = function(e) {

		if (!config.drop)
			return;

		var files = e.originalEvent.dataTransfer.files;
		if (!files || !files.length)
			return;

		var el = $(e.target);
		var tmp = null;

		if (el.hclass(cls + '-item-name'))
			tmp = el.closest(cls2 + '-folder');
		else if (el.hclass(cls + '-folder'))
			tmp = el;
		else
			tmp = null;

		config.drop && self.EXEC(config.drop, files, self.get(), tmp ? self.opt.items[+tmp.attrd('index')] : null);
	};

	self.make = function() {
		self.aclass(cls);
		self.append('<div class="{0}-path"></div><div class="{0}-scrollbar"><div class="{0}-items"></div></div>'.format(cls));
		epath = self.find(cls2 + '-path');
		eitems = self.find(cls2 + '-items');

		if (config.scrollbar && window.SCROLLBAR) {
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-scrollbar'), { visibleY: !!config.scrollbarY });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		}

		config.drop && self.event('dragenter dragover dragexit drop dragleave', function(e) {
			switch (e.type) {
				case 'dragenter':
					var el = $(e.target);
					if (drag.el)
						drag.el.rclass(cls + '-dragenter');
					drag.el = el.closest(cls2 + '-folder');
					if (drag.el.length)
						drag.el.aclass(cls + '-dragenter');
					else
						drag.el = null;
					break;
				case 'drop':
					drag.el && drag.el.rclass(cls + '-dragenter');
					drag.el = null;
					drag.drop(e);
					break;
				case 'dragexit':
					drag.el && drag.el.rclass(cls + '-dragenter');
					drag.el = null;
					break;
			}
			e.preventDefault();
		});

		self.event('click', cls2 + '-item-options', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var el = $(this);
			var index = +el.closest(cls2 + '-item').attrd('index');
			config.options && self.EXEC(config.options, self.opt.items[index], el);
		});

		self.event('click', cls2 + '-up', function() {
			var path = self.tidypath(self.get());
			path = path.split(config.delimiter);
			var arr = [];
			for (var i = 0; i < path.length - 1; i++)
				arr.push(path[i]);
			self.opt.selected = null;
			path = arr.join(config.delimiter).trim();
			self.set(path ? self.makepath(path) : '');
		});

		self.event('click', cls2 + '-nav', function(e) {
			e.stopPropagation();
			var el = $(this);
			self.set(self.makepath(el.attrd('path').trim()));
		});

		self.event('click', cls2 + '-checkbox', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var el = $(this);
			el.tclass(cls + '-checkbox-checked');
			self.checked2();
		});

		self.event('click', cls2 + '-item', function() {

			var el = $(this);
			var index = +el.attrd('index');
			var item;

			if (el.hclass(cls + '-folder')) {
				item = self.opt.selected = self.opt.items[index];
				var p = self.get();
				self.set(p ? self.makepath(p + config.delimiter + item[config.key]) : self.makepath(item[config.key]));
			} else if (el.hclass(cls + '-file')) {
				var c = cls + '-selected';
				item = self.opt.selected = self.opt.items[index];
				config.click && self.SEEX(config.click, item);
				eselected && eselected.rclass(c);
				eselected = el.aclass(c);
			}
		});

		self.on('resize', self.resize);
		setTimeout(self.resize, 500);
	};

	self.resize = function() {
		var el = config.parent === 'window' ? $(W) : config.parent ? self.closest(config.parent) : self.element;
		if (self.scrollbar) {
			self.scrollbar.element.css('height', el.height() - epath.height() - (config.margin || 0));
			self.scrollbar.resize();
		}
	};

	self.checked = function() {
		var checked = [];
		self.find(cls2 + '-checkbox-checked').each(function() {
			var el = $(this);
			var index = el.closest(cls2 + '-item').attrd('index');
			var item = self.opt.items[index];
			item && checked.push(item);
		});
		return checked;
	};

	self.checked2 = function() {
		config.checked && self.SEEX(config.checked, self.checked(), self);
	};

	self.renderpath = function(path) {

		var builder = [];

		if (typeof(path) === 'string')
			path = self.tidypath(path);

		path = path.split(config.delimiter);

		var p = [];
		var template = '<span class="{0}-nav" data-path="{2}">{1}</span>';

		self.opt.level = 0;

		for (var i = 0; i < path.length; i++) {
			var cur = path[i];
			if (cur) {
				p.push(cur);
				builder.push(template.format(cls, cur.trim(), p.join(config.delimiter)));
				self.opt.level++;
			}
		}

		builder.unshift(template.format(cls, config.root, ''));
		epath.html(builder.join('<i class="ti ti-caret-right"></i>'));
		epath.tclass('hidden', !path.length);
	};

	self.renderitems = function(items) {

		var builder = [];
		var selindex = -1;
		var g = {};

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			g.index = i;

			if (item.selected)
				selindex = i;

			builder.push(self.template(item, g));
		}

		if (self.opt.level)
			builder.unshift('<div class="{0}-up">{1}</div>'.format(cls, config.up));

		self.opt.items = items;
		eitems.html(builder.join(''));

		if (selindex !== -1) {
			eselected = eitems.find(cls2 + '-item[data-index="{0}"]'.format(selindex)).aclass(cls + '-selected');
			config.click && self.SEEX(config.click, items[selindex]);
		} else
			eselected = null;

		self.checked2();
		self.scrollbar && self.scrolltop(1);
	};

	self.makepath = function(path) {
		return !path || path.charAt(0) === config.delimiter ? path.substring(1, path.length - 1) : path;
	};

	self.tidypath = function(path) {
		return path && path.charAt(0) === config.delimiter ? path.substring(1, path.length - 1) : path;
	};

	self.setter = function(value) {
		// value === path
		value = self.tidypath(value);
		self.renderpath(value || '');
		config.browse && self.EXEC(config.browse, self.makepath(value), self.renderitems, self.opt.selected);
		self.resize();
		self.opt.selected = null;
	};

});