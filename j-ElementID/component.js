COMPONENT('elementid', function(self) {
	self.setter = function(value) {
		self.attrd('id', value == null ? '' : value);
	};
});