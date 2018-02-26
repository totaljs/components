COMPONENT('panel', 'width:300', function(self, config) {

	var W = window;
	var header = null;

	if (!W.$$panel) {

		W.$$panel_level = W.$$panel_level || 1;
		W.$$panel = true;

		$(document).on('click', '.ui-panel-button-close', function() {
			SET($(this).attr('data-path'), '');
		});

		$(W).on('resize', function() {
			SETTER('panel', 'resize');
		});
	}

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		var el = self.element.find('.ui-panel-body');
		el.height($(W).height() - self.find('.ui-panel-header').height());
	};

	self.make = function() {

		var icon;

		if (config.icon)
			icon = '<i class="fa fa-{0}"></i>'.format(config.icon);
		else
			icon = '<i></i>';

		$(document.body).append('<div id="{0}" class="hidden ui-panel-container"><div class="ui-panel" style="width:{1}px"><div class="ui-panel-title"><button class="ui-panel-button-close{5}" data-path="{2}"><i class="fa fa-times"></i></button>{4}<span>{3}</span></div><div class="ui-panel-header"></div><div class="ui-panel-body"></div></div>'.format(self._id, config.width, self.path, config.title, icon, config.closebutton == false ? ' hidden' : ''));

		var el = $('#' + self._id);
		el.find('.ui-panel-body').get(0).appendChild(self.element.get(0));
		self.rclass('hidden');
		self.replace(el);

		header = self.virtualize({ title: '.ui-panel-title > span', icon: '.ui-panel-title > i' });

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
				self.find('.ui-panel-button-close').tclass(value !== true);
				break;
		}
	};

	self.setter = function(value) {

		setTimeout2('ui-panel-noscroll', function() {
			$('html').tclass('ui-panel-noscroll', !!$('.ui-panel-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden)
			return;

		setTimeout2('panelreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.aclass('hidden');
			self.release(true);
			self.find('.ui-panel').rclass('ui-panel-animate');
			W.$$panel_level--;
			return;
		}

		if (W.$$panel_level < 1)
			W.$$panel_level = 1;

		W.$$panel_level++;

		self.css('z-index', W.$$panel_level * 10);
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
			self.find('.ui-panel').aclass('ui-panel-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$panel_level * 10) + 1);
		}, 1000);
	};
});