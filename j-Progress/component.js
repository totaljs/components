COMPONENT('progress', 'animate:true', function(self, config) {

	var container, old = null;
	self.readonly();

	self.make = function() {
		self.aclass('ui-progress');
		self.append('<div style="width:10%">0%</div>');
		container = self.find('div');
	};

	self.setter = function(value) {
		!value && (value = 0);
		if (old === value)
			return;

		if (value > 100)
			value = 100;
		else if (value < 0)
			value = 0;

		old = value;
		if (config.animate)
			container.animate({ width: old + '%' }, 100);
		else
			container.css({ width: old + '%' });

		container.html(old + '%');
	};
});