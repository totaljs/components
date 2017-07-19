COMPONENT('importer', function(self) {

	var imported = false;
	var reload = self.attrd('reload');

	self.readonly();
	self.setter = function() {

		if (!self.evaluate(self.attrd('if')))
			return;

		if (imported) {
			if (reload)
				EXEC(reload);
			else
				self.setter = null;
			return;
		}

		imported = true;
		IMPORT(self.attrd('url'), function() {
			if (reload)
				EXEC(reload);
			else
				self.remove();
		});
	};
});