COMPONENT('menu', function(self) {

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();

	var ul;
	var is = false;
	var events = {};

	self.make = function() {
		self.aclass('ui-menu hidden');
		self.append('<ul></ul>');
		ul = self.find('ul');

		self.event('touchstart mousedown', 'li', function(e) {
			var el = $(this);
			if (el.hclass('ui-menu-divider')) {
				e.preventDefault();
				e.stopPropagation();
			} else {
				self.opt.callback(self.opt.items[el.index()]);
				self.hide();
			}
		});

		events.hide = function() {
			is && self.hide();
		};

		self.event('scroll', events.hide);
		self.on('reflow', events.hide);
		self.on('scroll', events.hide);
		self.on('resize', events.hide);

		events.click = function() {
			if (is && (!self.target || (self.target !== e.target && !self.target.contains(e.target))))
				self.hide();
		};
	};

	self.bindevents = function() {
		events.is = true;
		$(document).on('touchstart mousedown', events.click);
		$(window).on('scroll', events.hide);
	};

	self.unbindevents = function() {
		events.is = false;
		$(document).off('touchstart mousedown', events.click);
		$(window).off('scroll', events.hide);
	};

	self.showxy = function(x, y, items, callback) {
		var opt = {};
		opt.x = x;
		opt.y = y;
		opt.items = items;
		opt.callback = callback;
		self.show(opt);
	};

	self.show = function(opt) {

		if (typeof(opt) === 'string') {
			// old version
			opt = { align: opt };
			opt.element = arguments[1];
			opt.items = arguments[2];
			opt.callback = arguments[3];
			opt.offsetX = arguments[4];
			opt.offsetY = arguments[5];
		}

		var tmp = opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element;

		if (is && self.target === tmp) {
			self.hide();
			return;
		}

		var builder = [];

		self.target = tmp;
		self.opt = opt;

		for (var i = 0; i < opt.items.length; i++) {
			var item = opt.items[i];
			builder.push(typeof(item) == 'string' ? '<li class="ui-menu-divider">{0}</li>'.format(item === '-' ? '<hr />' : ('<span>' + item + '</span>')) : '<li{2}>{0}{1}</li>'.format(item.icon ? '<i class="fa fa-{0}"></i>'.format(item.icon) : '', item.name, item.icon ? '' : ' class="ui-menu-nofa"'));
		}

		var css = {};
		css.left = 0;
		css.top = 0;
		self.element.css(css);

		ul.html(builder.join(''));

		if (!is) {
			self.rclass('hidden');
			self.aclass('ui-menu-visible', 100);
			is = true;
			if (!events.is)
				self.bindevents();
		}

		var target = $(opt.element);
		var w = self.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'left':
					css.left = offset.left;
					break;
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
			}
		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		css.top = offset.top + target.innerHeight() + 10 + (opt.offsetY || 0);

		if (opt.offsetX)
			css.left += opt.offsetX;

		self.element.css(css);
	};

	self.hide = function() {
		events.is && self.unbindevents();
		is = false;
		self.target = null;
		self.opt = null;
		self.aclass('hidden');
		self.rclass('ui-menu-visible');
	};

});