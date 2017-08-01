COMPONENT('template', function(self) {

	self.readonly();
	self.make = function(template) {

		if (template) {
			self.template = Tangular.compile(template);
			return;
		}

		var script = self.find('script');

		if (!script.length) {
			script = self.element;
			self.element = self.parent();
		}

		self.template = Tangular.compile(script.html());
		script.remove();
	};

	self.setter = function(value) {
		if (NOTMODIFIED(self.id, value))
			return;
		if (value) {
			KEYPRESS(function() {
				self.html(self.template(value)).rclass('hidden');
			}, 100, self.id);
		} else
			self.aclass('hidden');
	};
});