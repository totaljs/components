COMPONENT('iframepreview', 'width:800', function(self, config) {

	var iframe, is = null;
	var W = window;

	if (!W.$iframepreview) {
		W.$iframepreview = true;
		$(W).on('keydown', function(e) {
			e.which === 27 && FIND('iframepreview', true).forEach(FN('n => n.hide()'));
		});
	}

	self.reconfigure = function(key, value, init) {
		if (init)
			return;
		key === 'width' && self.find('div').eq(0).css('width', value + 'px');
	};

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-iframepreview hidden');
		self.html('<div style="max-width:{0}px"><i class="fa fa-times-circle"></i><iframe src="about:blank" frameborder="0" allowfullscreen></div>'.format(config.width));
		iframe = self.find('iframe');
		self.event('click', '.fa', self.hide);
	};

	self.open = function(url) {

		W.$iframepreview_current && W.$iframepreview_current !== self && W.$iframepreview_current.hide();
		url && iframe.attr('src', url);

		if (is)
			return;

		self.rclass('hidden');
		W.$iframepreview_current = self;
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