COMPONENT('iframepreview', function(self) {

	var iframe, is;

	if (!window.$iframepreview) {
		window.$iframepreview = true;
		$(window).on('keydown', function(e) {
			e.which === 27 && FIND('iframepreview', true).forEach(FN('n => n.hide()'));
		});
	}

	self.readonly();
	self.make = function() {
		self.aclass('ui-iframepreview hidden');
		self.html('<div style="max-width:{0}"><i class="fa fa-times-circle"></i><iframe src="about:blank" frameborder="0" allowfullscreen></div>'.format(self.attrd('width') || '960px'));
		iframe = self.find('iframe');
		self.event('click', '.fa', self.hide);
	};

	self.open = function(url) {

		window.$iframepreview_current && window.$iframepreview_current !== self && window.$iframepreview_current.hide();
		url && iframe.attr('src', url);

		if (is)
			return;

		self.rclass('hidden');
		window.$iframepreview_current = self;
		is = true;
	};

	self.show = self.open;

	self.hide = function() {
		if (is) {
			self.aclass('hidden');
			is = false;
		}
	};

	self.setter = function(value) {
		if (value)
			self.open(value);
		else
			self.hide();
	};
});