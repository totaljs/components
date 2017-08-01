COMPONENT('centered', function(self, config) {

	self.readonly();
	self.make = function() {
		self.aclass('ui-centered-container hidden');
		self.element.wrapInner('<div class="ui-centered-content"><div class="ui-centered-body"></div></div>');
		self.element.prepend('<span class="fa fa-times ui-centered-button"></span>');
		self.event('click', '.ui-centered-button', function() {
			self.set('');
		});
	};

	self.setter = function(value) {
		self.toggle('hidden', value !== config.if);
	};
});