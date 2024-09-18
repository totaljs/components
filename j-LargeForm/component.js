COMPONENT('largeform', 'zindex:12;padding:30;scrollbar:1;scrolltop:1;style:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var csspos = {};
	var nav = false;
	var init = false;

	if (!W.$$largeform) {

		W.$$largeform_level = W.$$largeform_level || 1;
		W.$$largeform = true;

		$(document).on('click', cls2 + '-button-close', function() {
			$(this).component().set(null);
		});

		var resize = function() {
			setTimeout2(self.name, function() {
				for (var m of M.components) {
					if (m.name === self.name && !HIDDEN(m.dom) && (m.ready || (m.$ready && !m.$removed)))
						m.resize();
				}
			}, 200);
		};

		ON('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			if (e.target === this) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			var el = $(e.target);
			if (el.hclass(cls + '-container') && !el.hclass(cls + '-style-2')) {
				var form = el.find(cls2);
				var c = cls + '-animate-click';
				form.aclass(c);
				setTimeout(function() {
					form.rclass(c);
				}, 300);
			}
		});
	}

	self.readonly();
	self.submit = function() {
		if (config.submit)
			self.EXEC(config.submit, self.hide, self.element);
		else
			self.hide();
	};

	self.cancel = function() {
		if (config.cancel)
			self.EXEC(config.cancel, self.hide);
		else
			self.hide();
	};

	self.hide = function() {
		config.close && self.EXEC(config.close);
		if (config.independent)
			self.hideforce();
		self.set('');
	};

	self.resize = function() {

		if (self.hclass('hidden'))
			return;

		var padding = isMOBILE ? 0 : config.padding;
		var ui = self.find(cls2);

		csspos.height = WH - (config.style == 1 ? (padding * 2) : padding);
		csspos.top = padding;

		var w = ui.css('max-width').parseInt();
		if (w > WW)
			w = WW;

		csspos.width = w;
		ui.css(csspos);

		var el = self.find(cls2 + '-title');
		var th = el.height();

		csspos = { height: csspos.height - th, width: w };

		if (nav)
			csspos.height -= nav.height();

		self.find(cls2 + '-body').css(csspos);
		self.scrollbar && self.scrollbar.resize();
		self.element.SETTER('*', 'resize');
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}" style="max-width:{1}px"><div class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="ti ti-times"></i></button><i class="{4}-icon hidden"></i><span></span></div><div class="{4}-body"></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		scr.length && scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2 + '-body')[0];

		while (self.dom.children.length) {
			var child = self.dom.children[0];
			if (child.tagName === 'NAV') {
				nav = $(child);
				body.parentNode.appendChild(child);
			} else
				body.appendChild(child);
		}

		self.rclass('hidden invisible');
		var csscls = self.attr('class');
		csscls && el.aclass(csscls);
		self.replace(el, true);

		if (config.scrollbar)
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-body'), { shadow: config.scrollbarshadow, visibleY: config.visibleY, orientation: 'y' });

		if (config.style === 2)
			self.aclass(cls + '-style-2');

		self.event('scroll', function() {
			EMIT('scroll', self.name);
			EMIT('reflow', self.name);
		});

		self.event('click', 'button[name]', function() {
			var t = this;
			switch (t.name) {
				case 'submit':
					self.submit(self.hide);
					break;
				case 'cancel':
					!t.disabled && self[t.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout2(self.ID + 'enter', self.submit, 500);
		});
	};

	self.configure = function(key, value, init, prev) {
		switch (key) {
			case 'title':
				self.find(cls2 + '-title > span').text(value);
				break;
			case 'icon':
				var icon = self.find(cls2 + '-icon');
				icon.rclass2('fa ti');
				if (value)
					icon.aclass(self.icon(value)).rclass('hidden');
				else
					icon.aclass('hidden');
				break;
			case 'width':
				if (!init && value !== prev) {
					self.find(cls2).css('max-width', value + 'px');
					self.rsize();
				}
				break;
			case 'closebutton':
				!init && self.find(cls2 + '-button-close').tclass('hidden', value !== true);
				break;
		}
	};

	self.esc = function(bind) {
		if (bind) {
			if (!self.$esc) {
				self.$esc = true;
				$(W).on('keydown', self.esc_keydown);
			}
		} else {
			if (self.$esc) {
				self.$esc = false;
				$(W).off('keydown', self.esc_keydown);
			}
		}
	};

	self.esc_keydown = function(e) {
		if (e.which === 27 && !e.isPropagationStopped()) {
			var val = self.get();
			if (!val || config.if === val) {
				e.preventDefault();
				e.stopPropagation();
				self.hide();
			}
		}
	};

	self.hideforce = function() {
		if (!self.hclass('hidden')) {
			config.hide && self.SEEX(config.hide);
			self.aclass('hidden');
			self.release(true);
			self.esc(false);
			self.find(cls2).rclass(cls + '-animate');
			W.$$largeform_level--;
		}
	};

	var allowscrollbars = function() {
		$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
	};

	self.setter = function(value) {

		setTimeout2(self.name + '-noscroll', allowscrollbars, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && setTimeout(() => self.EXEC(config.reload, self), 2);
				config.default && DEFAULT(self.makepath(config.default), true);
				config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);
			}
			return;
		}

		setTimeout2(cls, function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			if (!config.independent)
				self.hideforce();
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find(cls2).append(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$largeform_level < 1)
			W.$$largeform_level = 1;

		W.$$largeform_level++;

		self.css('z-index', W.$$largeform_level * config.zindex);
		self.aclass('invisible');
		self.rclass('hidden');
		self.release(false);

		config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);
		config.reload && setTimeout(() => self.EXEC(config.reload, self), 2);
		config.default && DEFAULT(self.makepath(config.default), true);

		self.resize();

		setTimeout(function() {
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');
			if (!init && isMOBILE) {
				$('body').aclass('hidden');
				setTimeout(function() {
					$('body').rclass('hidden');
				}, 50);
			}

			config.autofocus && self.autofocus(config.autofocus);
			init = true;
		}, 200);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$largeform_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});