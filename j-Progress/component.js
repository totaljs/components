COMPONENT('progress', function(self, config) {

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
		old = value;
		if (config.animate !== false)
			container.animate({ width: (old < 10 ? 10 : old) + '%' }, 20);
		else
			container.css({ width: (old < 10 ? 10 : old) + '%' });
		container.html(old + '%');
	};
});
