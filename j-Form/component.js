COMPONENT('form', function(self, config) {

	var W = window;
	var header = null;
	var csspos = {};

	if (!W.$$form) {
		W.$$form_level = W.$$form_level || 1;
		W.$$form = true;
		$(document).on('click', '.ui-form-button-close', function() {
			SET($(this).attr('data-path'), '');
			W.$$form_level--;
		});

		$(window).on('resize', function() {
			SETTER('form', 'resize');
		});

		$(document).on('click', '.ui-form-container', function(e) {
			var el = $(e.target);
			if (!(el.hclass('ui-form-container-padding') || el.hclass('ui-form-container')))
				return;
			var form = $(this).find('.ui-form');
			var cls = 'ui-form-animate-click';
			form.aclass(cls);
			setTimeout(function() {
				form.rclass(cls);
			}, 300);
		});
	}

	self.readonly();
	self.submit = function() {
		if (config.submit)
			EXEC(config.submit, self);
		else
			self.hide();
	};

	self.cancel = function() {
		config.cancel && EXEC(config.cancel, self);
		self.hide();
	};

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		if (!config.center || self.hclass('hidden'))
			return;
		var ui = self.find('.ui-form');
		var fh = ui.innerHeight();
		var wh = $(W).height();
		var r = (wh / 2) - (fh / 2);
		csspos.marginTop = (r > 30 ? (r - 15) : 20) + 'px';
		ui.css(csspos);
	};

	self.make = function() {

		var icon;

		if (config.icon)
			icon = '<i class="fa fa-{0}"></i>'.format(config.icon);
		else
			icon = '<i></i>';

		$(document.body).append('<div id="{0}" class="hidden ui-form-container"><div class="ui-form-container-padding"><div class="ui-form" style="max-width:{1}px"><div class="ui-form-title"><button class="ui-form-button-close" data-path="{2}"><i class="fa fa-times"></i></button>{4}<span>{3}</span></div></div></div>'.format(self._id, config.width || 800, self.path, config.title, icon));

		var el = $('#' + self._id);
		el.find('.ui-form').get(0).appendChild(self.element.get(0));
		self.rclass('hidden');
		self.replace(el);

		header = self.virtualize({ title: '.ui-form-title > span', icon: '.ui-form-title > i' });

		self.event('scroll', function() {
			EMIT('reflow', self.name);
		});

		self.find('button').on('click', function() {
			W.$$form_level--;
			switch (this.name) {
				case 'submit':
					self.submit(self.hide);
					break;
				case 'cancel':
					!this.disabled && self[this.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]').get(0).disabled && self.submit(self.hide);
		});
	};

	self.configure = function(key, value, init, prev) {
		if (init)
			return;
		switch (key) {
			case 'icon':
				header.icon.rclass(header.icon.attr('class'));
				value && header.icon.aclass('fa fa-' + value);
				break;
			case 'title':
				header.title.html(value);
				break;
			case 'width':
				value !== prev && self.find('.ui-form').css('max-width', value + 'px');
				break;
		}
	};

	self.setter = function(value) {

		setTimeout2('noscroll', function() {
			$('html').tclass('noscroll', $('.ui-form-container').not('.hidden').length ? true : false);
		}, 50);

		var isHidden = value !== config.if;

		self.toggle('hidden', isHidden);

		setTimeout2('formreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.release(true);
			self.find('.ui-form').rclass('ui-form-animate');
			return;
		}

		self.resize();
		self.release(false);

		config.reload && EXEC(config.reload, self);

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus === true ? 'input[type="text"],select,textarea' : config.autofocus);
			el.length && el.eq(0).focus();
		}

		if (W.$$form_level < 1)
			W.$$form_level = 1;

		W.$$form_level++;
		self.css('z-index', W.$$form_level * 10);
		self.element.scrollTop(0);

		setTimeout(function() {
			self.find('.ui-form').aclass('ui-form-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$form_level * 10) + 1);
		}, 1000);
	};
});