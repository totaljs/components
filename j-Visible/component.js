COMPONENT('visible', function() {
	var self = this;
	self.readonly();
	self.setter = function(value) {

		var is = true;

		if (condition)
			is = self.evaluate(self.attr('data-if'));
		else
			is = value ? true : false;

		self.toggle('hidden', !is);
	};
});