COMPONENT('importer', function() {
	var self = this;
	var imported = false;
	var reload = self.attr('data-reload');

	self.readonly();
	self.setter = function(value) {

		if (!self.evaluate(self.attr('data-if')))
			return;

		if (imported) {
			if (reload)
				return EXEC(reload);
			self.setter = null;
			return;
		}

		imported = true;
		IMPORT(self.attr('data-url'), function() {
			if (reload)
				return EXEC(reload);
			self.remove();
		});
	};
});