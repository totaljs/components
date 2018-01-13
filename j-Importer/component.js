COMPONENT('importer', function(self, config) {

	var imported = false;

	self.readonly();
	self.setter = function(value) {

		if (config.if !== value)
			return;

		if (imported) {
			if (config.reload)
				EXEC(config.reload);
			else
				self.setter = null;
			return;
		}

		imported = true;
		IMPORT(config.url, function() {
			if (config.reload)
				EXEC(config.reload);
			else
				self.remove();
		});
	};
});