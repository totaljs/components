COMPONENT('validation', function(self, config) {

	var path, elements = null;

	self.readonly();

	self.make = function() {
		!config.selector && (elements = self.find('button'));
		path = self.path.replace(/\.\*$/, '');
		setTimeout(function() {
			self.watch(self.path, self.state, true);
		}, 50);
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'selector':
				elements = self.find(value || 'button');
				break;
		}
	};

	self.state = function() {
		var disabled = MAIN.disabled(path);
		if (!disabled && config.if)
			disabled = !EVALUATE(self.path, config.if);
		elements.prop('disabled', disabled);
	};
});