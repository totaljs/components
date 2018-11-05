COMPONENT('window', 'zindex:12', function(self, config) {

	var W = window;

	if (!W.$$window) {

		W.$$window_level = W.$$window_level || 1;
		W.$$window = true;

		$(document).on('click', '.ui-window-button-close', function() {
			SET($(this).attrd('path'), '');
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
		var el = self.find('.ui-window-body');
		el.height(WH - self.find('.ui-window-header').height());
	};

	self.make = function() {
		$(document.body).append('<div id="{0}" class="hidden ui-window-container"><div class="ui-window"><div data-bind="@config__change .ui-window-icon:@icon__html span:value.title" class="ui-window-title"><button class="ui-window-button-close{2}" data-path="{1}"><i class="fa fa-times"></i></button><i class="ui-window-icon"></i><span></span></div><div class="ui-window-header"></div><div class="ui-window-body"></div></div>'.format(self.ID, self.path, config.closebutton == false ? ' hidden' : ''));
		var el = $('#' + self.ID);
		el.find('.ui-window-body')[0].appendChild(self.dom);
		self.rclass('hidden');
		self.replace(el);
		self.find('button').on('click', function() {
			switch (this.name) {
				case 'cancel':
					self.hide();
					break;
			}
		});
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass('fa fa-' + value.icon);
	};

	self.configure = function(key, value, init) {
		if (!init) {
			switch (key) {
				case 'closebutton':
					self.find('.ui-window-button-close').tclass(value !== true);
					break;
			}
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

		var body = self.find('.ui-window-body');

		self.css('z-index', W.$$window_level * config.zindex);
		body.scrollTop(0);
		self.rclass('hidden');
		self.release(false);
		self.resize();

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus === true ? 'input[type="text"],select,textarea' : config.autofocus);
			el.length && el[0].focus();
		}

		setTimeout(function() {
			body.scrollTop(0);
			self.find('.ui-window').aclass('ui-window-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$window_level * config.zindex) + 1);
		}, 500);
	};
});