COMPONENT('scrollbar', 'margin:0;visibleX:false;visibleY:false', function(self, config) {
	self.readonly();

	self.done = function() {
		config.parent && self.element.css('height', self.element.closest(config.parent).height());
		self.scrollbar.resize();
	};

	self.on('resize', self.done);

	self.make = function() {
		self.scrollbar = SCROLLBAR(self.element, { visibleX: config.visibleX, visibleY: config.visibleY });
	};

	self.resize = function() {
		self.scrollbar.resize();
	};

});