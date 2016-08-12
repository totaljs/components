COMPONENT('importer', function() {
	var self = this;
	var imported = false;
	self.readonly();
	self.setter = function(value) {

		if (imported) {
			self.setter = null;
			return;
		}

		if (!self.evaluate(self.attr('data-if')))
			return;

		imported = true;
		IMPORT(self.attr('data-url'));
		self.remove();
	};
});