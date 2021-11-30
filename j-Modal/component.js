COMPONENT('modal', 'zindex:12;width:800;bg:true;scrollbar:false', function(self, config, cls) {

	var cls2 = '.' + cls;
	var eheader, earea, ebody, efooter, emodal, icon, first = true;

	if (W.$$modal == null) {
		W.$$modal = 0;

		var resizemodal = function() {
			SETTER('modal', 'resize');
		};

		var resize = function() {
			setTimeout2(cls, resizemodal, 300);
		};

		ON('resize2', resize);
	}

	self.readonly();

	self.make = function() {

		$(document.body).append('<div id="{0}" class="{1}-container hidden"></div>'.format(self.ID, cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';
		self.aclass(cls);

		var el = $('#' + self.ID);
		el[0].appendChild(self.dom);

		self.rclass('hidden');
		self.replace(el);

		self.event('click', '.cancel', self.cancel);
		self.event('click', 'button[name]', function() {
			var t = this;
			if (!t.disabled) {
				switch (t.name) {
					case 'submit':
					case 'cancel':
						self[t.name]();
						break;
				}
			}
		});

		if (!self.template)
			self.prepare();

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 800);
		});
	};

	self.submit = function() {
		if (config.submit)
			EXEC(config.submit, self.hide);
		else
			self.hide();
	};

	self.cancel = function() {
		if (config.cancel)
			EXEC(config.cancel, self.hide);
		else
			self.hide();
	};

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {

		if (self.hclass('hidden'))
			return;

		var mobile = WIDTH() === 'xs';
		var hh = eheader.height();
		var hb = ebody.height();
		var hf = efooter.height();
		var h = Math.ceil((WH / 100) * (mobile ? 94 : 98));
		var hs = hh + hb + hf;

		var top = ((WH - h) / 2.2) >> 0;
		var width = mobile ? emodal.width() : config.width;
		var ml = Math.ceil(width / 2) * -1;
		var empty = false;

		if (!width) {
			empty = true;
			width = WW.inc('-10%') >> 0;
		}

		if (config.center) {
			top = Math.ceil((WH / 2) - (hs / 2));
			if (top < 0)
				top = (WH - h) / 2 >> 0;
		}

		if (!mobile && config.align) {
			top = '';
			ml = '';
			hh += 25;
		} else {
			if (top < 20) {
				top = 20;
				h -= 27;
			}
		}

		var css = { top: top, 'margin-left': ml };
		if (empty)
			css.width = width;

		emodal.css(css);
		earea.tclass(cls + '-noscrollbar', !config.scrollbar);

		if (config.scrollbar) {
			var nh = 0;
			if (config.height && (hb - hh - hf) < config.height) {
				if (config.height < (h - hh - hf))
					nh = config.height;
				else
					nh = h - hh - hf;
			} else
				nh = h - hh - hf;

			earea.css({ height: nh, width: width });
			self.scrollbar && self.scrollbar.resize();
		} else {
			earea[0].$noscrollbarwidth = 0;
			earea.css({ 'max-height': h - hh - hf, width: width });
		}
	};

	self.configure = function(key, value, init, prev) {
		switch (key) {
			case 'bg':
				self.tclass(cls + '-bg', !!value);
				break;
			case 'title':
				eheader && eheader.find('label').text(value);
				break;
			case 'width':
				emodal && emodal.css('max-width', config.width);
				self.resize();
				break;
			case 'center':
				self.resize();
				break;
			case 'align':
				prev && self.rclass(cls + '-align-' + prev);
				value && self.aclass(cls + '-align-' + value);
				self.resize();
				break;
			case 'icon':
				if (eheader) {
					if (icon) {
						prev && icon.rclass('fa-' + prev);
					} else {
						eheader.prepend('<i class="{0}-icon fa"></i>'.format(cls));
						icon = eheader.find(cls2 + '-icon');
					}
					value && icon.aclass('fa-' + value);
				}
				break;
		}
	};

	self.prepare = function(dynamic) {

		self.find(cls2 + ' > div').each(function(index) {
			$(this).aclass(cls + '-' + (index === 0 ? 'header' : index === 1 ? 'body' : 'footer'));
		});

		eheader = self.find(cls2 + '-header');
		ebody = self.find(cls2 + '-body');
		efooter = self.find(cls2 + '-footer');
		emodal = self.find(cls2);
		ebody.wrap('<div class="{0}-body-area" />'.format(cls));
		earea = self.find(cls2 + '-body-area');
		config.label && eheader.find('label').html(config.label);
		dynamic && self.reconfigure(config);

		earea.on('scroll', function() {
			if (!self.$scrolling) {
				EMIT('scrolling', self.name);
				EMIT('reflow', self.name);
				self.$scrolling = true;
				setTimeout(function() {
					self.$scrolling = false;
				}, 1500);
			}
		});
	};

	self.setter = function(value) {

		setTimeout2(cls + '-noscroll', function() {
			$('html').tclass(cls + '-noscroll', !!$(cls2 + '-bg').not('.hidden').length);
		}, 789);

		var hidden = value !== config.if;

		if (self.hclass('hidden') === hidden) {
			if (!hidden) {
				config.reload && EXEC(config.reload, self);
				config.default && DEFAULT(config.default, true);
			}
			return;
		}

		setTimeout2(cls + 'reflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (hidden) {
			self.rclass(cls + '-visible');
			setTimeout(function() {
				self.aclass('hidden');
				self.release(true);
			}, 100);
			W.$$modal--;
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find('div[data-jc-replaced]').html(self.template);
			self.prepare(true);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$modal < 1)
			W.$$modal = 1;

		W.$$modal++;

		self.css('z-index', W.$$modal * config.zindex);
		self.element.scrollTop(0);
		self.rclass('hidden');

		self.resize();
		self.release(false);

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		if (config.scrollbar) {
			!self.scrollbar && (self.scrollbar = SCROLLBAR(self.find(cls2 + '-body-area'), { visibleY: true }));
		} else
			$(cls2 + '-body-area').aclass(cls + '-noscrollbar');

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus ? 'input[type="text"],input[type="password"],select,textarea' : config.autofocus);
			el.length && setTimeout(function() {
				el[0].focus();
			}, 1500);
		}

		var delay = first ? 500 : 0;

		setTimeout(function() {
			if (self.scrollbar)
				self.scrollbar.scrollTop(0);
			else
				earea[0].scrollTop = 0;
			self.aclass(cls + '-visible');
		}, 300 + delay);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$modal * config.zindex) + 1);
		}, 500 + delay);

		first = false;
	};
});