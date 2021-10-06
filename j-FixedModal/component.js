COMPONENT('fixedmodal', 'zindex:12;width:500', function(self, config, cls) {

	var cls2 = '.' + cls;
	var body, first = true;

	self.readonly();

	self.make = function() {

		$(document.body).append('<div id="{0}" class="{1}-container hidden"></div>'.format(self.ID, cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';
		self.aclass(cls);

		var el = $('#' + self.ID);
		el[0].appendChild(self.dom);
		body = self.element;

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
			self.EXEC(config.submit, self.hide);
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
		self.set('');
	};

	self.resize = function() {
		if (self.hclass('hidden'))
			return;
		var mobile = WIDTH() === 'xs';
		var width = mobile ? body.innerWidth() : config.width;
		var ml = Math.ceil(width / 2) * -1;
		var css = { 'margin-left': ml };
		css.width = width;
		body.css(css);
	};

	self.configure = function(key) {
		switch (key) {
			case 'width':
				body && body.css('max-width', config.width);
				self.resize();
				break;
		}
	};

	self.prepare = function(dynamic) {
		body.find('> div').each(function(index) {
			$(this).aclass(index === 0 ? (cls + '-header') : index === 1 ? (cls + '-body') : (cls + '-footer'));
		});
		dynamic && self.reconfigure(config);
	};

	self.setter = function(value) {

		setTimeout2(cls + '-noscroll', function() {
			$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
		}, 789);

		var hidden = value !== config.if;

		if (self.hclass('hidden') === hidden)
			return;

		setTimeout2(cls + 'reflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (hidden) {
			self.rclass(cls + '-visible');
			setTimeout(function() {
				self.aclass('hidden');
				self.release(true);
			}, 100);
			W.$$fixedmodal--;
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find('div[data-jc-replaced]').html(self.template);
			self.prepare(true);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$fixedmodal < 1 || !W.$$fixedmodal)
			W.$$fixedmodal = 1;

		W.$$fixedmodal++;

		self.css('z-index', W.$$fixedmodal * config.zindex);
		self.rclass('hidden');
		self.resize();
		self.release(false);

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);
		config.autofocus && self.autofocus(config.autofocus);

		var delay = first ? 500 : 0;

		setTimeout(function() {
			body.scrollTop = 0;
			self.aclass(cls + '-visible');
		}, 300 + delay);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$fixedmodal * config.zindex) + 1);
		}, 500 + delay);

		first = false;
	};
});