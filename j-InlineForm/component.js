COMPONENT('inlineform', 'icon:circle-o', function(self, config) {

	var W = window;
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
		if (self.hclass('hidden'))
			return;
		self.release(true);
		self.aclass('hidden');
		self.find('.ui-inlineform').rclass('ui-inlineform-animate');
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass('fa fa-' + value.icon);
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden ui-inlineform-container" style="max-width:{1}"><div class="ui-inlineform"><i class="fa fa-caret-up ui-inlineform-arrow"></i><div class="ui-inlineform-title" data-bind="@config__html span:value.title__change .ui-inlineform-icon:@icon"><button class="ui-inlineform-close"><i class="fa fa-times"></i></button><i class="ui-inlineform-icon"></i><span></span></div></div></div>'.format(self.ID, (config.width || dw) + 'px', self.path));

		var el = $('#' + self.ID);
		el.find('.ui-inlineform')[0].appendChild(self.dom);
		self.rclass('hidden');
		self.replace(el);

		self.find('button').on('click', function() {
			var el = $(this);
			switch (this.name) {
				case 'submit':
					if (el.hclass('exec'))
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
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(function() {
				self.submit(self.hide);
			}, 800);
		});
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
			ma = (w / 2);
			offset.left -= ma - (el.width() / 2);
			ma -= 12;
		}

		offset.top += el.height() + 10;

		if (offsetX)
			offset.left += offsetX;

		if (offsetY)
			offset.top += offsetY;

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		self.find('.ui-inlineform-arrow').css('margin-left', ma);
		self.css(offset);

		var el = self.find('input[type="text"],select,textarea');
		!isMOBILE && el.length && el[0].focus();

		setTimeout(function() {
			self.find('.ui-inlineform').aclass('ui-inlineform-animate');
		}, 300);
	};
});