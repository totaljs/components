COMPONENT('inlineform', function(self) {

	var config = self.config;
	var W = window;
	var header = null;
	var dw = 300;

	if (!W.$$inlineform) {
		W.$$inlineform = true;
		$(document).on('click', '.ui-inlineform-close', function() {
			SETTER('inlineform', 'hide');
		});
		$(window).on('resize', function() {
			SETTER('inlineform', 'hide');
		});
	}

	self.readonly();
	self.submit = self.cancel = function() { self.hide(); };

	self.hide = function() {
		if (self.hclass('hidden'))
			return;
		self.release(true);
		self.aclass('hidden');
		self.find('.ui-inlineform').removeClass('ui-inlineform-animate');
	};

	self.make = function() {

		var icon;

		if (config.icon)
			icon = '<i class="fa fa-{0}"></i>'.format(config.icon);
		else
			icon = '<i></i>';

		$(document.body).append('<div id="{0}" class="hidden ui-inlineform-container" style="max-width:{1}"><div class="ui-inlineform"><i class="fa fa-caret-up ui-inlineform-arrow"></i><div class="ui-inlineform-title"><button class="ui-inlineform-close"><i class="fa fa-times"></i></button>{4}<span>{3}</span></div></div></div>'.format(self._id, (config.width || dw) + 'px', self.path, config.title, icon));

		var el = $('#' + self._id);
		el.find('.ui-inlineform').get(0).appendChild(self.element.get(0));
		self.rclass('hidden');
		self.replace(el);

		header = self.virtualize({ title: '.ui-inlineform-title > span', icon: '.ui-inlineform-title > i' });

		self.find('button').on('click', function() {
			var el = $(this);
			switch (this.name) {
				case 'submit':
					if (el.hasClass('exec'))
						self.hide();
					else
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
		}
	};

	self.toggle = function(el, position, offsetX, offsetY) {
		if (self.hclass('hidden'))
			self.show(el, position, offsetX, offsetY);
		else
			self.hide();
	};

	self.show = function(el, position, offsetX, offsetY) {
		SETTER('inlineform', 'hide');
		self.rclass('hidden');
		self.release(false);

		var offset = el.offset();
		var w = config.width || dw;
		var ma = 35;

		if (position === 'right') {
			offset.left -= w - el.width();
			ma = w - 35;
		} else if (position === 'center') {
			ma = (w / 2) - (el.width() / 2);
			offset.left -= ma;
			ma -= 12;
		}

		offset.top += el.height() + 10;

		if (offsetX)
			offset.left += offsetX;

		if (offsetY)
			offset.top += offsetY;

		self.find('.ui-inlineform-arrow').css('margin-left', ma);
		self.css(offset);
		var el = self.find('input[type="text"],select,textarea');
		!isMOBILE && el.length && el.eq(0).focus();
		setTimeout(function() {
			self.find('.ui-inlineform').addClass('ui-inlineform-animate');
		}, 300);
	};
});