COMPONENT('empty', function(self) {

	self.readonly();
	self.make = function() {
		self.aclass('ui-empty');
	};

	self.setter = function(value) {
		self.tclass('hidden', value && value.length ? true : false);
	};
});