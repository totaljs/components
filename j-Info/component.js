COMPONENT('info', function(self, config, cls) {

	var is = false;
	var canhide = false;
	var timeout;
	var events = {};
	var templates = {};

	self.singleton();
	self.readonly();
	self.blind();

	events.scroll = function() {
		events.is && self.forcehide();
	};

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.find('script').each(function() {
			var el = $(this);
			templates[el.attrd('name')] = Tangular.compile(el.html());
		});

		self.event('mouseenter mouseleave', function(e) {
			canhide = e.type === 'mouseleave';
			if (canhide)
				self.hide(500);
			else if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		});
	};

	var ehide = function() {
		canhide && self.hide(100);
	};

	var eclick = function() {
		if (self.opt && self.opt.closeclick) {
			canhide = true;
			self.hide(100);
		}
	};

	self.bindevents = function() {
		if (!events.is) {
			events.is = true;
			$(document).on('touchstart mousedown', ehide).on('click', eclick);
			$(W).on('scroll', events.scroll);
			self.on('scroll + reflow + resize2', events.scroll);
		}
	};

	self.unbindevents = function() {
		if (events.is) {
			events.is = false;
			$(document).off('touchstart mousedown', ehide).off('click', eclick);
			$(W).off('scroll', events.scroll);
			self.off('scroll + reflow + resize2', events.scroll);
		}
	};

	self.show = function(opt) {

		// opt.align
		// opt.element
		// opt.value
		// opt.name
		// opt.html
		// opt.offsetX
		// opt.offsetY
		// opt.offsetWidth
		// opt.minwidth
		// opt.maxwidth
		// opt.callback
		// opt.class
		// opt.x
		// opt.y
		// opt.type (position/offset)
		// opt.closeclick

		var target = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.element[0] : opt.element : null;

		timeout && clearTimeout(timeout);
		timeout = null;

		if (is) {

			if (target && self.target === target) {
				self.forcehide();
				return;
			}

			if (self.opt) {
				self.opt.class && self.rclass(self.opt.class);
				self.opt.callback && self.opt.callback(true);
			}
		}

		if (!opt.align)
			opt.align = 'left';

		self.target = target;
		self.opt = opt;

		if (target)
			target = $(target);

		if (opt.html) {
			self.html(opt.html);
		} else {
			self.element.empty();
			self.element.append(templates[opt.name]({ value: opt.value }));
		}

		if (!opt.minwidth)
			opt.minwidth = 150;

		if (!opt.maxwidth)
			opt.maxwidth = 280;

		self.rclass('hidden');
		opt.class && self.aclass(opt.class);

		var offset = target ? opt.type === 'position' ? target.position() : target.offset() : EMPTYOBJECT;
		var options = {};
		var width = self.element.innerWidth() + (opt.offsetWidth || 0);
		var height = self.element.height();

		if (opt.maxwidth && width > opt.maxwidth)
			options.width = width = opt.maxwidth;

		if (opt.minwidth && width < opt.minwidth)
			options.width = width = opt.minwidth;

		if (width > WW)
			width = WW;

		var tw = target ? target.innerWidth() : 0;
		var th = target ? target.height() : 0;

		options.left = opt.x || offset.left;
		options.left = (opt.align === 'half' ? Math.ceil(options.left - (width / 2)) : opt.align === 'center' ? Math.ceil(options.left - ((width / 2) - (tw / 2))) : opt.align === 'left' ? options.left - 8 : (options.left - width) + tw) + (opt.offsetX || 0);

		options.top = opt.y || offset.top;
		options.top = (opt.position === 'bottom' ? (options.top - self.element.height() - 10) : (options.top + th + 10)) + (opt.offsetY || 0);

		var sum = options.left + width;

		if (sum > WW)
			options.left = WW - width - 10;

		if (options.left < 0)
			options.left = 0;

		sum = options.top + height;

		if (sum > WH)
			options.top = WH - height - 10;

		self.element.css(options);
		self.bindevents();
		canhide = true;
		opt.hide = false;

		if (!is) {
			self.aclass(cls + '-visible', 100);
			is = true;
		}
	};

	self.forcehide = function() {

		if (!self.opt || self.opt.hide)
			return;

		self.opt.hide = true;

		if (self.opt) {
			self.opt.class && self.rclass(self.opt.class);
			self.opt.callback && self.opt.callback();
		}

		if (is) {
			self.unbindevents();
			self.rclass(cls + '-visible').aclass('hidden');
			is = false;
		}

		self.target = null;
		self.opt = null;
	};

	self.hide = function(sleep) {

		if (!is || (!canhide && sleep !== true))
			return;

		if (sleep === true)
			sleep = 1000;

		timeout && clearTimeout(timeout);
		if (sleep < 10) {
			self.forcehide();
			timeout = null;
		} else
			timeout = setTimeout(self.forcehide, sleep > 0 ? sleep : 800);
	};
});