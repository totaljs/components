COMPONENT('inlineform', 'autohide:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var regnohide = /ui-datepicker|ui-timepicker|ui-directory|ui-inlineform|ui-floatinginput|ui-inlineform/g;
	var dw = 300;
	var options;
	var events = {};
	var skip = false;

	if (!W.$$inlineform) {
		W.$$inlineform = true;

		$(document).on('click', cls2 + '-close', function() {
			SETTER(self.name, 'hide');
		});

		ON('resize2 + reflow + scroll + resize', function() {
			SETTER(self.name, 'hide');
		});
	}

	var disableskip = function() {
		skip = false;
	};

	var autohide = function(e) {

		if (skip)
			return;

		var tmp = e.target;
		while (tmp) {

			if (tmp.tagName === 'BODY' || tmp.tagName === 'HTML' || !tmp.getAttribute)
				break;

			var cc = tmp.getAttribute('class') || '';

			if (cc && regnohide.test(cc)) {
				skip = true;
				setTimeout(disableskip, 100);
				return;
			}

			// Due to removed elements in some nested component
			tmp = tmp.parentNode;
			if (!tmp) {
				skip = true;
				setTimeout(disableskip, 100);
				return;
			}
		}

		self.hide();
	};

	self.readonly();

	self.submit = function() {
		if (config.submit)
			self.EXEC(config.submit, self.hide);
		else
			self.hide();
		options.callback && options.callback(self.hide);
	};

	self.cancel = function() {
		config.cancel && self.EXEC(config.cancel, self);
		self.hide();
	};

	self.hide = function() {
		if (!self.hclass('hidden')) {
			self.release(true);
			self.aclass('hidden invisible');
			self.find(cls2).rclass(cls + '-animate');
			config.hide && self.EXEC(config.hide);
			events.unbind();
		}
	};

	self.icon = function(value) {
		var el = this.rclass2('ti');
		value.icon && el.aclass((value.icon.indexOf(' ') === -1 ? 'ti ti-' : '') + value.icon);
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			if (config.autohide)
				$(document).on('click', autohide);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			if (config.autohide)
				$(document).off('click', autohide);
		}
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {3}-container" style="max-width:{1}"><div class="{3}"><div class="{3}-title" data-bind="@config__html span:value.title__change .ui-inlineform-icon:@icon"><button name="cancel" class="{3}-close"><i class="ti ti-times"></i></button><i class="{3}-icon"></i><span></span></div></div></div>'.format(self.ID, (config.width || dw) + 'px', self.path, cls));

		var el = $('#' + self.ID);
		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';

		el.find(cls2)[0].appendChild(self.dom);
		self.aclass(cls + '-body');
		self.rclass('hidden invisible');
		self.replace(el);

		self.event('click', 'button[name]', function() {
			var t = this;
			var el = $(this);
			switch (t.name) {
				case 'submit':
					if (el.hclass('exec'))
						self.hide();
					else
						self.submit(self.hide);
					break;
				case 'cancel':
					!t.disabled && self[t.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 500, self.hide);
		});
	};

	self.toggle = function(opt) {
		if (self.hclass('hidden'))
			self.show(opt);
		else
			self.hide();
	};

	self.show = function(opt) {

		var el = opt.element;
		var is = false;
		options = opt;

		if (!self.hclass('hidden')) {
			SETTER(self.name, 'hide');
			return;
		}

		if (self.template) {
			is = self.template.COMPILABLE();
			self.find('div[data-jc-replaced]').html(self.template);
			self.template = null;
			is && COMPILE();
			setTimeout(self.show, 250, opt);
			return;
		}

		self.release(false);
		self.rclass('hidden');

		var offset = el.offset();
		var w = config.width || dw;
		var ma = 35;

		if (opt.align === 'right') {
			offset.left -= w - el.width();
			ma = w - 35;
		} else if (opt.align === 'center') {
			ma = (w / 2);
			offset.left -= ma - (el.width() / 2);
			ma -= 12;
		}

		if (opt.position === 'bottom')
			offset.top -= self.element.innerHeight() + 10;
		else
			offset.top += el.height() + 10;

		if (opt.offsetX)
			offset.left += opt.offsetX;

		if (opt.offsetY)
			offset.top += opt.offsetY;

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		self.css(offset);
		config.autofocus && self.autofocus(config.autofocus);

		setTimeout(function() {
			events.bind();
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');
		}, 300);
	};
});