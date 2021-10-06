COMPONENT('panel', 'width:350;icon:home;zindex:12;scrollbar:true;scrollbarY:true;margin:0;padding:20;closeicon:fa fa-times', function(self, config, cls) {

	var cls2 = '.' + cls;

	if (!W.$$panel) {

		W.$$panel_level = W.$$panel_level || 1;
		W.$$panel = true;

		$(document).on('click touchend', cls2 + '-button-close,' + cls2 + '-container', function(e) {
			var target = $(e.target);
			var curr = $(this);
			var main = target.hclass(cls + '-container');
			if (curr.hclass(cls + '-button-close') || main) {
				var parent = target.closest(cls2 + '-container');
				var com = parent.component();
				if (!main || com.config.bgclose) {

					if (com.config.close)
						com.EXEC(com.config.close, com);
					else
						com.hide();

					e.preventDefault();
					e.stopPropagation();
				}
			}
		});

		var resize = function() {
			SETTER('panel/resize');
		};

		ON('resize + resize2', function() {
			setTimeout2('panelresize', resize, 100);
		});
	}

	self.icon = function(value, path, el) {
		el.rclass().aclass(cls + '-icon ' + self.faicon(value.icon));
	};

	self.readonly();

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

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		var el = self.element.find(cls2 + '-body');
		var h = WH - self.find(cls2 + '-header').height() - (config.padding * 2);
		el.height(h);
		config.container && el.find(config.container).height(h - config.margin);
		self.scrollbar && self.scrollbar.resize();
	};

	self.make = function() {

		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';
		$(document.body).append('<div id="{0}" class="hidden {5}-container{3}"><div class="{5}" style="max-width:{1}px"><div data-bind="@config__change .ui-panel-icon:@icon__html span:value.title" class="{5}-title"><button name="cancel" class="{5}-button-close{2}"><i class="{6}"></i></button><button name="menu" class="{5}-button-menu{4}"><i class="fa fa-ellipsis-h"></i></button><i class="{5}-icon"></i><span></span></div><div class="{5}-header"></div><div class="{5}-body"></div></div>'.format(self.ID, config.width, config.closebutton == false ? ' hidden' : '', config.bg ? '' : ' ui-panel-inline', config.menu ? '' : ' hidden', cls, config.closeicon));
		var el = $('#' + self.ID);
		var body = el.find(cls2 + '-body');

		while (self.dom.children.length)
			body[0].appendChild(self.dom.children[0]);

		self.rclass('hidden');
		self.replace(el, true);

		if (config.scrollbar && window.SCROLLBAR) {
			if (config.container)
				body = body.find(config.container);
			self.scrollbar = SCROLLBAR(body, { shadow: config.scrollbarshadow, visibleY: !!config.scrollbarY, orientation: 'y' });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		} else
			body.aclass(cls + '-scroll');

		self.event('click', 'button[name],.cancel', function() {
			switch (this.name) {
				case 'menu':
					EXEC(config.menu, $(this), self);
					break;
				case 'cancel':
					self.hide();
					break;
				default:
					if ($(this).hclass('cancel'))
						self.hide();
					break;
			}
		});

		self.resize();
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'bg':
				self.tclass(cls + '-inline', !value);
				self.element.css('max-width', value ? 'inherit' : (config.width + 1));
				break;
			case 'closebutton':
				!init && self.find(cls2 + '-button-close').tclass(value !== true);
				break;
			case 'width':
				self.element.css('max-width', config.bg ? 'inherit' : value);
				self.find(cls2 + '').css('max-width', value);
				break;
		}
	};

	var autofocus = function(counter) {
		if (!counter || counter < 10) {
			var el = self.find(typeof(config.autofocus) === 'string' ? config.autofocus : 'input[type="text"],select,textarea')[0];
			if (el)
				el.focus();
			else
				setTimeout(autofocus, 200, (counter || 1) + 1);
		}
	};

	self.setter = function(value) {

		setTimeout2(cls + '-noscroll', function() {
			$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && self.EXEC(config.reload, self);
				config.default && DEFAULT(self.makepath(config.default), true);
			}
			return;
		}

		setTimeout2('panelreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.aclass('hidden');
			self.release(true);
			self.esc(false);
			self.rclass(cls + '-animate');
			W.$$panel_level--;
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find('div[data-jc-replaced]').html(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$panel_level < 1)
			W.$$panel_level = 1;

		W.$$panel_level++;

		var container = self.element.find(cls2 + '-body');
		self.css('z-index', W.$$panel_level * config.zindex);
		container.scrollTop(0);
		self.rclass('hidden');
		self.release(false);
		setTimeout(self.resize, 100);

		config.reload && self.EXEC(config.reload, self);
		config.refresh && self.EXEC(config.refresh, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		setTimeout(function() {
			if (self.scrollbar)
				self.scrollbar.scroll(0, 0);
			else
				container.scrollTop(0);
			self.aclass(cls + '-animate');

			if (!isMOBILE && config.autofocus)
				setTimeout(autofocus, 100);

		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$panel_level * config.zindex) + 1);
		}, 1000);

		config.closeesc && self.esc(true);
	};
});