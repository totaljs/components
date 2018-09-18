COMPONENT('drawer', 'align:left', function(self, config) {

	self.readonly();

	self.make = function() {
		self.aclass('ui-drawer ui-drawer-a' + config.align);
		self.element.wrapInner('<div class="ui-drawer-nav"></div>');
		self.event('click', function() {
			self.set('');
		});
	};

	self.setter = function(value) {
		if (value === config.if) {
			self.rclass('hidden');
			self.aclass('ui-drawer-visible', 100);
		} else
			self.rclass('ui-drawer-visible').aclass('hidden', 800);
	};
});
