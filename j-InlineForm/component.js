COMPONENT('inlineform', 'autohide:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var regnohide = /ui-datepicker|ui-timepicker|ui-directory|ui-inlineform/g;
	var dw = 300;
	var options;
	var events = {};

	if (!W.$$inlineform) {
		W.$$inlineform = true;
		$(document).on('click', cls2 + '-close', function() {
			SETTER(self.name, 'hide');
		});

		$(W).on('resize', function() {
			SETTER(self.name, 'hide');
		});
	}

	var autohide = function(e) {
		var tmp = e.target;
		while (tmp) {
			if (tmp.tagName === 'BODY' || tmp.tagName === 'HTML' || !tmp.getAttribute)
				break;
			var cc = tmp.getAttribute('class');
			if (regnohide.test(cc))
				return;
			tmp = tmp.parentNode;
		}
		self.hide();
	};

	self.readonly();

	self.submit = function() {
		if (config.submit)
			EXEC(config.submit, self.hide);
		else
			self.hide();
		options.callback && options.callback(self.hide);
	};

	self.cancel = function() {
		config.cancel && EXEC(config.cancel, self);
		self.hide();
	};

	self.hide = function() {
		if (!self.hclass('hidden')) {
			self.release(true);
			self.aclass('hidden');
			self.find(cls2).rclass(cls + '-animate');
			config.hide && EXEC(config.hide);
			events.unbind();
		}
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass((value.icon.indexOf(' ') === -1 ? 'fa fa-' : '') + value.icon);
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

		$(document.body).append('<div id="{0}" class="hidden {3}-container" style="max-width:{1}"><div class="{3}"><div class="{3}-title" data-bind="@config__html span:value.title__change .ui-inlineform-icon:@icon"><button name="cancel" class="{3}-close"><i class="fa fa-times"></i></button><i class="{3}-icon"></i><span></span></div></div></div>'.format(self.ID, (config.width || dw) + 'px', self.path, cls));

		var el = $('#' + self.ID);
		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';

		el.find(cls2)[0].appendChild(self.dom);
		self.aclass(cls + '-body');
		self.rclass('hidden');
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
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(function() {
				self.submit(self.hide);
			}, 500);
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

		self.rclass('hidden');
		self.release(false);

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

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		self.css(offset);

		if (!isMOBILE) {
			el = self.find('input[type="text"],select,textarea');
			el.length && el[0].focus();
		}

		events.bind();

		setTimeout(function() {
			self.find(cls2).aclass(cls + '-animate');
		}, 300);
	};
});