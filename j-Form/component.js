COMPONENT('form', 'zindex:12;scrollbar:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container;
	var csspos = {};

	if (!W.$$form) {

		W.$$form_level = W.$$form_level || 1;
		W.$$form = true;

		$(document).on('click', cls2 + '-button-close', function() {
			SET($(this).attrd('path'), '');
		});

		var resize = function() {
			setTimeout2('form', function() {
				for (var i = 0; i < M.components.length; i++) {
					var com = M.components[i];
					if (com.name === 'form' && !HIDDEN(com.dom) && com.$ready && !com.$removed)
						com.resize();
				}
			}, 200);
		};

		ON('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			var el = $(e.target);
			if (e.target === this || el.hclass(cls + '-container-padding')) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			if (!(el.hclass(cls + '-container-padding') || el.hclass(cls + '-container')))
				return;

			var form = $(this).find(cls2);
			var c = cls + '-animate-click';
			form.aclass(c);

			setTimeout(function() {
				form.rclass(c);
			}, 300);
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
		config.cancel && self.EXEC(config.cancel, self.hide);
		self.hide();
	};

	self.hide = function() {
		if (config.independent)
			self.hideforce();
		self.set('');
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass(value.icon.indexOf(' ') === -1 ? ('fa fa-' + value.icon) : value.icon);
		el.tclass('hidden', !value.icon);
	};

	self.resize = function() {

		if (self.scrollbar) {
			container.css('height', WH);
			self.scrollbar.resize();
		}

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

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}-scrollbar"><div class="{4}-container-padding"><div class="{4}" style="max-width:{1}px"><div data-bind="@config__text span:value.title__change .{4}-icon:@icon" class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="fa fa-times"></i></button><i class="{4}-icon"></i><span></span></div></div></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		if (scr.length)
			scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2)[0];
		container = el.find(cls2 + '-scrollbar');

		if (config.scrollbar) {
			el.css('overflow', 'hidden');
			self.scrollbar = SCROLLBAR(el.find(cls2 + '-scrollbar'), { visibleY: 1, orientation: 'y' });
		}

		while (self.dom.children.length)
			body.appendChild(self.dom.children[0]);

		self.rclass('hidden invisible');
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
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 800);
		});
	};

	self.configure = function(key, value, init, prev) {
		if (init)
			return;
		switch (key) {
			case 'width':
				value !== prev && self.find(cls2).css('max-width', value + 'px');
				break;
			case 'closebutton':
				self.find(cls2 + '-button-close').tclass('hidden', value !== true);
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
			self.aclass('hidden');
			self.release(true);
			self.esc(false);
			self.find(cls2).rclass(cls + '-animate');
			W.$$form_level--;
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

		if (W.$$form_level < 1)
			W.$$form_level = 1;

		W.$$form_level++;

		self.css('z-index', W.$$form_level * config.zindex);
		self.aclass('invisible');
		self.rclass('hidden');
		self.resize();
		self.release(false);

		if (self.scrollbar)
			self.scrollbar.scrollTop(0);
		else
			self.element.scrollTop(0);

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		setTimeout(function() {

			self.rclass('invisible');

			if (self.scrollbar)
				self.scrollbar.scrollTop(0);
			else
				self.element.scrollTop(0);

			self.find(cls2).aclass(cls + '-animate');
			config.autofocus && self.autofocus(config.autofocus);

		}, 200);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$form_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});