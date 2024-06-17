COMPONENT('box', 'zindex:12;padding:25;scrollbar:1;scrolltop:1;style:1;align:center;background:1;transparent:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var csspos = {};
	var nav = false;
	var init = false;

	if (!W.$$box) {

		W.$$box_level = W.$$box_level || 1;
		W.$$box = true;

		$(document).on('click', cls2 + '-button-close', function() {
			$(this).component().set(null);
		});

		var resize = function() {
			setTimeout2(self.name, function() {
				for (var m of M.components) {
					if (m.name === 'box' && !HIDDEN(m.dom) && (m.ready || (m.$ready && !m.$removed)))
						m.resize();
				}
			}, 200);
		};

		self.on('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			if (e.target === this) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			var el = $(e.target);
			if (el.hclass(cls + '-container') && el.hclass(cls + '-style-1')) {
				var form = el.find(cls2);
				var c = cls + '-animate-click';
				form.aclass(c);
				form.rclass(c, 300);
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

		var padding = WIDTH() === 'xs' ? 0 : config.padding;
		var ui = self.find(cls2);

		csspos.height = WH - (config.style == 1 ? (padding * 2) : padding);
		csspos.top = config.style === 3 ? 0 : padding;

		var w = config.width;
		if (w > WW) {
			// w = WW - padding;
			csspos.width = '';
			csspos.maxwidth = '';
			w = 0;
		} else {
			csspos.width = w + 'px';
			csspos.maxwidth = w + 'px';
		}

		// csspos.width = w;
		ui.css(csspos);
		self.element.css('padding', '0 ' + padding + 'px');

		var el = self.find(cls2 + '-title');
		var th = el.height();

		csspos = { height: csspos.height - th };

		if (w)
			csspos.width = w;

		if (nav)
			csspos.height -= nav.height() + 5;

		self.find(cls2 + '-body').css(csspos);
		self.scrollbar && self.scrollbar.resize();
		self.element.SETTER('*/resize');
	};

	self.make = function() {

		var html = '<div id="{0}" class="hidden {4}-container invisible{6}"><div class="{4}{5}"{1}><div class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="ti ti-times"></i></button><i class="{4}-icon hidden"></i><span class="{4}-label"></span></div><div class="{4}-body"></div></div>'.format(self.ID, config.width ? (' style="max-width:' + config.width + 'px"') : '', self.path, config.closebutton == false ? ' hidden' : '', cls, config.align === 'center' ? '' : (' ' + cls + '-align-' + config.align), ' ' + cls + '-' + (config.background ? '' : 'no') + 'bg');
		$(document.body).append(html);

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		scr.length && scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2 + '-body')[0];
		var counter = 0;

		el.css('padding', '0 ' + config.padding + 'px');

		while (self.dom.children.length) {
			var child = self.dom.children[0];
			if (child.tagName === 'NAV') {
				nav = $(child);
				if (counter) {
					body.parentNode.appendChild(child);
				} else {
					el.find(cls2 + '-title')[0].appendChild(child);
					nav = null;
				}
			} else
				body.appendChild(child);
			counter++;
		}

		self.rclass('hidden invisible');
		var csscls = self.attr('class');
		csscls && el.aclass(csscls);
		self.replace(el, true);

		if (config.scrollbar)
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-body'), { shadow: config.scrollbarshadow, visibleY: config.visibleY, orientation: 'y' });

		self.aclass(cls + '-style-' + config.style);

		if (config.transparent)
			self.aclass(cls + '-transparent');

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
			if (e.which === 13 && !self.find('button[name="submit"]')[0].disabled)
				setTimeout2(self.ID + 'enter', self.submit, 500);
		});
	};

	self.configure = function(key, value, init, prev) {
		switch (key) {
			case 'title':
				self.find(cls2 + '-label').text(value);
				break;
			case 'icon':
				var icon = self.find(cls2 + '-icon');
				icon.rclass2('fa ti');
				if (value)
					icon.aclass(self.icon(value)).rclass('hidden');
				else
					icon.aclass('hidden');
				break;
			case 'background':
				!init && self.tclass(cls + '-bg', !!value);
				break;
			case 'algin':
				!init && self.rclass2(cls + '-align').aclass(cls + '–align-' + value);
				break;
			case 'width':
				if (!init && value !== prev) {
					self.find(cls2).css('max-width', value + 'px');
					self.resize();
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
			self.release && self.release(true);
			self.esc(false);
			self.find(cls2).rclass(cls + '-animate');
			W.$$box_level--;
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
				config.reload && self.EXEC(config.reload, self);
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

		if (W.$$box_level < 1)
			W.$$box_level = 1;

		W.$$box_level++;

		self.css('z-index', W.$$box_level * config.zindex);
		self.aclass('invisible');
		self.rclass('hidden');
		self.release && self.release(false);
		self.find(cls2).css({ 'max-width': value + 'px', width: '' });

		config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);
		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		self.resize();

		setTimeout(function() {
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');

			if (!init && isMOBILE)
				$('body').aclass('hidden').rclass('hidden', 200);

			config.autofocus && self.autofocus(config.autofocus);
			init = true;
		}, 200);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$box_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});