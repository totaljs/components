COMPONENT('visible', function() {
	var self = this;
	self.readonly();
	self.setter = function(value) {

		var is = true;
		var condition = self.attr('data-if');

		if (condition)
			is = self.evaluate(condition);
		else
			is = value ? true : false;

		self.toggle('hidden', !is);
	};
});