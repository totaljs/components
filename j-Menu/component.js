COMPONENT('menu', function(self) {

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();

	var cls = 'ui-menu';
	var is = false;
	var events = {};
	var ul;

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.append('<ul></ul>');
		ul = self.find('ul');

		self.event('touchstart mousedown', 'li', function(e) {
			var el = $(this);
			if (el.hclass(cls + '-divider')) {
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

		events.click = function(e) {
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

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		var builder = [];

		self.target = tmp;
		self.opt = opt;

		for (var i = 0; i < opt.items.length; i++) {
			var item = opt.items[i];
			var cn = item.classname || '';

			if (!item.icon)
				cn = (cn ? ' ' : '') + cls + '-nofa';

			builder.push(typeof(item) == 'string' ? '<li class="{1}-divider">{0}</li>'.format(item === '-' ? '<hr />' : ('<span>' + item + '</span>'), cls) : '<li class="{2}">{3}{0}{1}</li>'.format(item.icon ? '<i class="{0}"></i>'.format(item.icon.charAt(0) === '!' ? item.icon.substring(1) : ('fa fa-' + item.icon)) : '', item.name, cn, item.shortcut ? '<b>{0}</b>'.format(item.shortcut) : ''));
		}

		var css = {};

		ul.html(builder.join(''));

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else {
			self.rclass('hidden');
			self.aclass(cls + '-visible', 100);
			is = true;
			if (!events.is)
				self.bindevents();
		}

		var target = $(opt.element);
		var w = self.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
				default:
					css.left = offset.left;
					break;
			}

			css.top = opt.position === 'bottom' ? (offset.top - self.element.height() - 10) : (offset.top + target.innerHeight() + 10);
		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		self.element.css(css);
	};

	self.hide = function() {
		events.is && self.unbindevents();
		is = false;
		self.opt && self.opt.hide && self.opt.hide();
		self.target = null;
		self.opt = null;
		self.aclass('hidden');
		self.rclass(cls + '-visible');
	};

});