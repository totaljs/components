COMPONENT('empty', function() {

	var self = this;

	self.readonly();

	self.make = function() {
		self.element.addClass('ui-empty');
	};

	self.setter = function(value) {
		self.element.toggleClass('hidden', value && value.length ? true : false);
	};
});