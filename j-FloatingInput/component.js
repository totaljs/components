COMPONENT('floatinginput', 'minwidth:200', function(self, config, cls) {

	var cls2 = '.' + cls;
	var timeout, icon, plus, input, summary, area;
	var is = false;
	var plusvisible = false;

	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'placeholder':
				self.find('input').prop('placeholder', value);
				break;
		}
	};

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.append('<div class="{1}-summary hidden"></div><div class="{1}-input"><span class="{1}-add hidden"><i class="ti ti-plus"></i></span><span class="{1}-button"><i class="ti ti-pencil"></i></span><div class="{1}-control"><input type="text" placeholder="{0}" name="dir{2}" autocomplete="dir{2}" /><textarea name="dirt{2}" placeholder="{0}"></textarea></div></div'.format(config.placeholder, cls, Date.now()));

		input = self.find('input');
		icon = self.find(cls2 + '-button').find('i');
		plus = self.find(cls2 + '-add');
		summary = self.find(cls2 + '-summary');
		area = self.find('textarea');

		self.event('click', cls2 + '-button', function(e) {
			input.val('');
			area.val('');
			e.stopPropagation();
			e.preventDefault();
		});

		self.event('click', cls2 + '-add', function() {
			if (self.opt.callback) {
				self.opt.scope && M.scope(self.opt.scope);
				self.opt.callback(self.opt.multiline ? area.val() : input.val(), self.opt.element, true);
				self.hide();
			}
		});

		self.event('keydown', 'input,textarea', function(e) {
			switch (e.which) {
				case 27:
					self.hide();
					break;
				case 13:
					if (!self.opt.multiline) {
						if (self.opt.callback) {
							self.opt.scope && M.scope(self.opt.scope);
							self.opt.callback(this.value, self.opt.element);
						}
						self.hide();
					}
					break;
			}
		});

		var e_click = function(e) {
			var node = e.target;
			var count = 0;

			if (is) {
				while (true) {
					var c = node.getAttribute('class') || '';
					if (c.indexOf(cls + '-input') !== -1)
						return;
					node = node.parentNode;
					if (!node || !node.tagName || node.tagName === 'BODY' || count > 3)
						break;
					count++;
				}
			} else {
				is = true;
				while (true) {
					var c = node.getAttribute('class') || '';
					if (c.indexOf(cls) !== -1) {
						is = false;
						break;
					}
					node = node.parentNode;
					if (!node || !node.tagName || node.tagName === 'BODY' || count > 4)
						break;
					count++;
				}
			}

			is && self.hide(0);
		};

		var e_resize = function() {
			is && self.hide(0);
		};

		self.bindedevents = false;

		self.bindevents = function() {
			if (!self.bindedevents) {
				$(document).on('click', e_click);
				$(W).on('resize', e_resize);
				self.bindedevents = true;
			}
		};

		self.unbindevents = function() {
			if (self.bindedevents) {
				self.bindedevents = false;
				$(document).off('click', e_click);
				$(W).off('resize', e_resize);
			}
		};

		self.event('input', 'input,textarea', function() {
			var is = !!this.value;
			if (plusvisible !== is) {
				plusvisible = is;
				plus.tclass('hidden', !this.value);
			}
		});

		var fn = function() {
			is && self.hide(1);
		};

		self.on('reflow + scroll + resize + resize2', fn);
	};

	self.show = function(opt) {

		// opt.element
		// opt.callback(value, el)
		// opt.offsetX     --> offsetX
		// opt.offsetY     --> offsetY
		// opt.offsetWidth --> plusWidth
		// opt.placeholder
		// opt.render
		// opt.minwidth
		// opt.maxwidth
		// opt.icon;
		// opt.maxlength = 30;

		var el = opt.element instanceof jQuery ? opt.element[0] : opt.element;

		self.tclass(cls + '-default', !opt.render);

		if (!opt.minwidth)
			opt.minwidth = 200;

		if (is) {
			clearTimeout(timeout);
			if (self.target === el) {
				self.hide(1);
				return;
			}
		}

		self.initializing = true;
		self.target = el;
		plusvisible = false;

		var element = $(opt.element);

		setTimeout(self.bindevents, 500);

		self.opt = opt;
		opt.class && self.aclass(opt.class);

		if (opt.multiline) {
			area.val(opt.value || '');
			area.prop('maxlength', opt.maxlength || 1000);
			input.val('');
		} else {
			input.val(opt.value || '');
			input.prop('maxlength', opt.maxlength || 100);
			area.val('');
		}

		self.target = element[0];

		var w = element.width();
		var offset = element.offset();
		var width = w + (opt.offsetWidth || 0);

		if (opt.minwidth && width < opt.minwidth)
			width = opt.minwidth;
		else if (opt.maxwidth && width > opt.maxwidth)
			width = opt.maxwidth;

		var ico = opt.icon ? self.icon(opt.icon) : 'ti ti-pencil-alt';
		icon.rclass2('ti').aclass(ico).rclass('hidden');

		if (opt.value) {
			plusvisible = true;
			plus.rclass('hidden');
		} else
			plus.aclass('hidden');

		var tmp = opt.multiline ? area : input;
		tmp.prop('placeholder', opt.placeholder || config.placeholder);

		var options = { left: 0, top: 0, width: width };

		summary.tclass('hidden', !opt.summary).html(opt.summary || '');

		switch (opt.align) {
			case 'center':
				options.left = Math.ceil((offset.left + w / 2) - (width / 2));
				break;
			case 'right':
				options.left = (offset.left - width) + w;
				break;
			default:
				options.left = offset.left;
				break;
		}

		options.top = opt.position === 'bottom' ? ((offset.top - self.height()) + element.height()) : offset.top;
		options.scope = M.scope ? M.scope() : '';

		area.tclass('hidden', opt.multiline != true);
		input.tclass('hidden', opt.multiline == true);

		self.tclass(cls + '-multiline', opt.multiline == true);

		if (opt.multiline)
			area.css('height', (typeof(opt.height) === 'number' ? (opt.height + 'px') : opt.height) || '100px');

		if (opt.offsetX)
			options.left += opt.offsetX;

		if (opt.offsetY)
			options.top += opt.offsetY;

		self.css(options);

		!isMOBILE && setTimeout(function() {
			opt.select && tmp[0].select();
			tmp.focus();
		}, 200);

		self.tclass(cls + '-monospace', !!opt.monospace);
		self.rclass('hidden');

		setTimeout(function() {
			self.initializing = false;
			is = true;
			if (self.opt && self.target && self.target.offsetParent)
				self.aclass(cls + '-visible');
			else
				self.hide(1);
		}, 100);
	};

	self.hide = function(sleep) {
		if (!is || self.initializing)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.unbindevents();
			self.rclass(cls + '-visible').aclass('hidden');
			if (self.opt) {
				self.opt.close && self.opt.close();
				self.opt.class && self.rclass(self.opt.class);
				self.opt = null;
			}
			is = false;
		}, sleep ? sleep : 100);
	};
});