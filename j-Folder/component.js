COMPONENT('folder', 'up:..;root:Root;scrollbar:true;delimiter:/', function(self, config) {

	var cls = 'ui-folder';
	var cls2 = '.ui-folder';
	var epath, eitems, eselected;

	self.opt = {};
	self.readonly();
	self.nocompile();
	self.template = Tangular.compile('<div data-index="{{ $.index }}" class="{0}-item {0}-{{ if type === 1 }}folder{{ else }}file{{ fi }}"><span class="{0}-item-options"><i class="fa fa-ellipsis-h"></i></span>{{ if checkbox }}<div class="{0}-checkbox{{ if checked }} {0}-checkbox-checked{{ fi }}"><i class="fa fa-check"></i></div>{{ fi }}<span class="{0}-item-icon"><i class="far fa-{{ icon | def(\'chevron-right\') }}"></i></span><div class="{0}-item-name">{{ name }}</div></div>'.format(cls));

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

		self.event('click', cls2 + '-item-options', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var el = $(this);
			var index = +el.closest(cls2 + 'item').attrd('index');
			config.options && EXEC(config.options, self.opt.items[index], el);
		});

		self.event('click', cls2 + '-up', function() {
			var path = self.get().split('/');
			var arr = [];
			for (var i = 0; i < path.length - 1; i++)
				arr.push(path[i]);
			self.set(arr.join(config.delimiter).trim());
		});

		self.event('click', cls2 + '-nav', function(e) {
			e.stopPropagation();
			var el = $(this);
			self.set(el.attrd('path').trim());
		});

		self.event('click', cls2 + '-checkbox', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var el = $(this);
			var index = +el.closest(cls2 + 'item').attrd('index');
			el.tclass(cls + '-checkbox-checked');
			self.checked2();
		});

		self.event('click', cls2 + '-item', function() {

			var el = $(this);
			var index = +el.attrd('index');
			var item;

			if (el.hclass(cls + '-folder')) {
				item = self.opt.items[index];
				var p = self.get();
				self.set(p ? (p + config.delimiter + item.name).trim() : item.name);
			} else if (el.hclass(cls + '-file')) {
				var c = cls + '-selected';
				item = self.opt.items[index];
				config.click && SEEX(config.click, item);
				eselected && eselected.rclass(c);
				eselected = el.aclass(c);
			}
		});

		self.on('resize', self.resize);
		setTimeout(self.resize, 500);
	};

	self.resize = function() {
		self.scrollbar && self.scrollbar.element.css('height', self.element.height() - epath.height());
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
		config.checked && SEEX(config.checked, self.checked(), self);
	};

	self.renderpath = function(path) {

		var builder = [];

		if (typeof(path) === 'string')
			path = path.split('/');

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
		epath.html(builder.join('<i class="fa fa-caret-right"></i>'));
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
			config.click && SEEX(config.click, items[selindex]);
		} else
			eselected = null;

		self.checked2();
		self.scrollbar && self.scrolltop(1);
	};

	self.setter = function(value) {
		// value === path
		self.renderpath(value || '');
		config.browse && EXEC(config.browse, value, self.renderitems);
		self.resize();
	}

});