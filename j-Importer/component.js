COMPONENT('importer', function(self, config) {

	var imported = false;

	self.readonly();
	self.setter = function() {

		if (!self.evaluate(config.if))
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