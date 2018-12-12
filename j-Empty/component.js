COMPONENT('empty', function(self) {

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-empty');
	};

	self.setter = function(value) {
		self.tclass('hidden', !!(value && value.length));
	};
});