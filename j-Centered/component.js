COMPONENT('centered', function() {
	var self = this;
	self.readonly();
	self.make = function() {
		self.element.addClass('ui-centered-container hidden');
		self.element.wrapInner('<div class="ui-centered-content"><div class="ui-centered-body"></div></div>');
		self.element.prepend('<span class="fa fa-times ui-centered-button"></span>');
		self.element.on('click', '.ui-centered-button', function() {
			self.set('');
		});
	};

	self.setter = function(value) {
		self.element.toggleClass('hidden', value !== self.attr('data-if'));
	};
});