COMPONENT('visible', function(self) {

	var processed = false;
	var template = self.attrd('template');

	self.readonly();
	self.setter = function(value) {

		var is = true;
		var condition = self.attrd('if');

		if (condition)
			is = self.evaluate(condition);
		else
			is = value ? true : false;

		if (is && template && !processed) {
			IMPORT(template, self);
			processed = true;
		}

		self.toggle('hidden', !is);
	};
});