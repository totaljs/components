COMPONENT('window', function(self, config) {

	var W = window;
	var header = null;

	if (!W.$$window) {

		W.$$window_level = W.$$window_level || 1;
		W.$$window = true;

		$(document).on('click', '.ui-window-button-close', function() {
			SET($(this).attr('data-path'), '');
		});

		$(window).on('resize', function() {
			SETTER('window', 'resize');
		});
	}

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		var el = self.element.find('.ui-window-body');
		el.height($(window).height() - self.find('.ui-window-header').height());
	};

	self.make = function() {

		var icon;

		if (config.icon)
			icon = '<i class="fa fa-{0}"></i>'.format(config.icon);
		else
			icon = '<i></i>';

		$(document.body).append('<div id="{0}" class="hidden ui-window-container"><div class="ui-window"><div class="ui-window-title"><button class="ui-window-button-close{4}" data-path="{1}"><i class="fa fa-times"></i></button>{3}<span>{2}</span></div><div class="ui-window-header"></div><div class="ui-window-body"></div></div>'.format(self._id, self.path, config.title, icon, config.closebutton == false ? ' hidden' : ''));

		var el = $('#' + self._id);
		el.find('.ui-window-body').get(0).appendChild(self.element.get(0));
		self.rclass('hidden');
		self.replace(el);

		header = self.virtualize({ title: '.ui-window-title > span', icon: '.ui-window-title > i' });

		self.find('button').on('click', function() {
			switch (this.name) {
				case 'cancel':
					self.hide();
					break;
			}
		});
	};

	self.configure = function(key, value, init) {
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
			case 'closebutton':
				self.find('.ui-window-button-close').tclass(value !== true);
				break;
		}
	};

	self.setter = function(value) {

		setTimeout2('ui-window-noscroll', function() {
			$('html').tclass('ui-window-noscroll', !!$('.ui-window-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden)
			return;

		setTimeout2('windowreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.aclass('hidden');
			self.release(true);
			self.find('.ui-window').rclass('ui-window-animate');
			W.$$window_level--;
			return;
		}

		if (W.$$window_level < 1)
			W.$$window_level = 1;

		W.$$window_level++;

		self.css('z-index', W.$$window_level * 10);
		self.element.scrollTop(0);
		self.rclass('hidden');
		self.release(false);
		self.resize();

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus === true ? 'input[type="text"],select,textarea' : config.autofocus);
			el.length && el.eq(0).focus();
		}

		setTimeout(function() {
			self.element.scrollTop(0);
			self.find('.ui-window').aclass('ui-window-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$window_level * 10) + 1);
		}, 1000);
	};
});