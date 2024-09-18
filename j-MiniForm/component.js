COMPONENT('miniform', 'zindex:12', function(self, config, cls) {

	var cls2 = '.' + cls;
	var csspos = {};

	if (!W.$$miniform) {

		W.$$miniform_level = W.$$miniform_level || 1;
		W.$$miniform = true;

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

			if (el.hclass(cls + '-container-cell')) {
				var form = $(this).find(cls2);
				var c = cls + '-animate-click';
				form.aclass(c).rclass(c, 300);
				var com = el.parent().component();
				if (com && com.config.closeoutside)
					com.set('');
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
		self.esc(false);
		self.set('');
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
			self.find(cls2).rclass(cls + '-animate');
			W.$$miniform_level--;
		}
	};

	self.resize = function() {

		if (!config.center || self.hclass('hidden'))
			return;

		var ui = self.find(cls2);
		var fh = ui.innerHeight();
		var wh = WH;
		var r = (wh / 2) - (fh / 2);
		csspos.marginTop = (r > 30 ? (r - 15) : 20) + 'px';
		ui.css(csspos);
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}-container-table"><div class="{4}-container-cell"><div class="{4}" style="max-width:{1}px"><div class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="ti ti-times"></i></button><i class="{4}-icon hidden"></i><span></span></div></div></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		if (scr.length)
			scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2)[0];

		while (self.dom.children.length)
			body.appendChild(self.dom.children[0]);

		self.rclass('hidden invisible');
		var csscls = self.attr('class');
		csscls && el.aclass(csscls);
		self.replace(el, true);

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
				!init && value !== prev && self.find(cls2).css('max-width', value + 'px');
				break;
			case 'closebutton':
				!init && self.find(cls2 + '-button-close').tclass('hidden', value !== true);
				break;
		}
	};

	self.setter = function(value) {

		setTimeout2(cls + '-noscroll', function() {
			$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && setTimeout(() => self.EXEC(config.reload, self), 2);
				config.default && DEFAULT(self.makepath(config.default), true);
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

		if (W.$$miniform_level < 1)
			W.$$miniform_level = 1;

		W.$$miniform_level++;

		self.css('z-index', W.$$miniform_level * config.zindex);
		self.rclass('hidden');

		self.resize();
		self.release(false);

		config.reload && setTimeout(() => self.EXEC(config.reload, self), 2);
		config.default && DEFAULT(self.makepath(config.default), true);

		setTimeout(function() {
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');
			config.autofocus && self.autofocus(config.autofocus);
		}, 200);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$miniform_level * config.zindex) + 1);
		}, 400);

		config.closeesc && self.esc(true);
	};
});