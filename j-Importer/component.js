COMPONENT('importer', function(self, config) {

	self.readonly();
	self.setter = function(value) {

		if (config.if !== value)
			return;

		var imported = self.element.get(0).hasChildNodes();
		if (imported) {
			if (config.reload)
				EXEC(config.reload);
			else
				self.setter = null;
			return;
		}

		IMPORT(config.url, function() {
			if (config.reload)
				EXEC(config.reload);
			else
				self.remove();
		});
	};
});