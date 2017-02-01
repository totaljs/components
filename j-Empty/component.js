COMPONENT('empty', function() {
	var self = this;
	self.readonly();

	self.make = function() {
		self.classes('ui-empty');
	};

	self.setter = function(value) {
		self.toggle('hidden', value && value.length ? true : false);
	};
});