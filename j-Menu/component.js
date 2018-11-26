COMPONENT('menu', function(self) {

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();

	var ul;
	var is = false;

	self.make = function() {
		self.aclass('ui-menu hidden');
		self.append('<ul></ul>');
		ul = self.find('ul');

		self.event('touchstart mousedown', 'li', function() {
			self.callback(self.items[$(this).index()]);
			self.hide();
		});

		$(window).on('scroll', function() {
			is && self.hide();
		});

		self.event('scroll', function() {
			is && self.hide();
		});

		$(document).on('touchstart mousedown', function(e) {
			if (is && (!self.target || (self.target !== e.target && !self.target.contains(e.target))))
				self.hide();
		});
	};

	self.showxy = function(x, y, items, callback) {

		var builder = [];

		self.target = null;
		self.items = items;
		self.callback = callback;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			builder.push('<li{2}>{0}{1}</li>'.format(item.icon ? '<i class="fa fa-{0}"></i>'.format(item.icon) : '', item.name, item.icon ? '' : ' class="ui-menu-nofa"'));
		}

		ul.html(builder.join(''));

		if (!is) {
			self.rclass('hidden');
			self.aclass('ui-menu-visible', 100);
			is = true;
		}

		var opt = {};
		opt.left = x;
		opt.top = y;

		self.element.css(opt);
	};

	self.show = function(orientation, element, items, callback, offsetX, offsetY) {

		var target = $(element);
		var builder = [];
		var tmp = element instanceof jQuery ? element[0] : element;

		self.items = items;
		self.callback = callback;

		if (is && self.target === tmp) {
			self.hide();
			return;
		}

		self.target = tmp;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			builder.push('<li{2}>{0}{1}</li>'.format(item.icon ? '<i class="fa fa-{0}"></i>'.format(item.icon) : '', item.name, item.icon ? '' : ' class="ui-menu-nofa"'));
		}

		var opt = {};
		opt.left = 0;
		opt.top = 0;
		self.element.css(opt);

		ul.html(builder.join(''));

		if (!is) {
			self.rclass('hidden');
			self.aclass('ui-menu-visible', 100);
			is = true;
		}

		var w = self.width();
		var offset = target.offset();

		switch (orientation) {
			case 'left':
				opt.left = offset.left;
				break;
			case 'center':
				opt.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
				break;
			case 'right':
				opt.left = (offset.left - w) + target.innerWidth();
				break;
		}

		opt.top = offset.top + target.innerHeight() + 10 + (offsetY || 0);

		if (offsetX)
			opt.left += offsetX;

		self.element.css(opt);

	};

	self.hide = function() {
		is = false;
		self.target = null;
		self.aclass('hidden');
		self.rclass('ui-menu-visible');
	};

});