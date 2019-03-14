COMPONENT('info', function(self) {

	var cls = 'ui-info';
	var is = false;
	var canhide = false;
	var timeout, templates = {};

	self.singleton();
	self.readonly();
	self.blind();

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

	self.bindevents = function() {
		$(document).on('touchstart mousedown', ehide);
		$(W).on('scroll', ehide);
	};

	self.unbindevents = function() {
		$(document).off('touchstart mousedown', ehide);
		$(W).off('scroll', ehide);
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

		var target = opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.element[0] : opt.element;

		if (is) {
			clearTimeout(timeout);
			if (self.target === target)
				return self.hide(1);
		}

		if (!opt.align)
			opt.align = 'left';

		self.target = target;
		self.opt = opt;

		target = $(target);

		if (opt.html) {
			self.html(opt.html);
		} else {
			self.element.empty();
			self.element.append(templates[opt.name]({ value: opt.value }));
		}

		if (!opt.minwidth)
			opt.minwidth = 100;

		if (!opt.maxwidth)
			opt.maxwidth = 280;

		self.rclass('hidden');

		opt.class && self.aclass(opt.class);

		var offset = target.offset();
		var options = {};
		var width = self.element.width() + (opt.offsetWidth || 0);

		if (opt.maxwidth && width > opt.maxwidth)
			options.width = width = opt.maxwidth;

		if (opt.minwidth && width < opt.minwidth)
			options.width = width = opt.minwidth;

		if (width > WW)
			width = WW;

		options.left = (opt.align === 'center' ? Math.ceil(offset.left - ((width / 2) - (target.innerWidth() / 2))) : opt.align === 'left' ? offset.left - 8 : (offset.left - width) + target.innerWidth()) + (opt.offsetX || 0);
		options.top = (offset.top + target.innerHeight() + 10) + (opt.offsetY || 0);

		var sum = options.left + width;

		if (sum > WW)
			options.left = WW - width;

		if (options.left < 0)
			options.left = 0;

		self.element.css(options);

		if (is)
			return;

		self.bindevents();

		setTimeout(function() {
			self.aclass(cls + '-visible');
		}, 100);

		is = true;
	};

	self.hide = function(sleep) {
		if (!is || !canhide)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.unbindevents();
			self.rclass(cls + '-visible').aclass('hidden', 100);

			if (self.opt) {
				self.opt.class && self.rclass(self.opt.class);
				self.opt.callback && self.opt.callback();
			}

			self.target = null;
			self.opt = null;
			is = false;
		}, sleep ? sleep : 100);
	};
});