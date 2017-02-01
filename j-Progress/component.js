COMPONENT('progress', function() {
	var self = this;
	var container;
	var old;
	var animate = true;

	self.readonly();

	self.make = function() {
		self.classes('ui-progress');
		self.append('<div style="width:10%">0%</div>');
		container = self.find('div');
		animate = self.attr('data-animate') !== 'false';
	};

	self.setter = function(value) {
		if (!value)
			value = 0;
		if (old === value)
			return;
		old = value;
		if (animate)
			container.animate({ width: (old < 10 ? 10 : old) + '%' }, 20);
		else
			container.css({ width: (old < 10 ? 10 : old) + '%' });
		container.html(old + '%');
	};
});
