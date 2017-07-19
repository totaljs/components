COMPONENT('validation', function(self) {

	var self = this;
	var path, elements;

	self.readonly();

	self.make = function() {
		elements = self.find(self.attrd('selector') || 'button');
		elements.prop({ disabled: true });
		self.evaluate = self.attrd('if');
		path = self.path.replace(/\.\*$/, '');
		self.watch(self.path, self.state, true);
	};

	self.state = function() {
		var disabled = MAIN.disabled(path);
		if (!disabled && self.evaluate)
			disabled = !EVALUATE(self.path, self.evaluate);
		elements.prop({ disabled: disabled });
	};
});