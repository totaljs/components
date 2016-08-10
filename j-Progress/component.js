COMPONENT('progress', function() {
	var self = this;
	var container;
    var old;

	self.readonly();

	self.make = function() {
		self.element.addClass('ui-progress');
		self.append('<div style="width:10%">0%</div>');
		container = self.find('div');
	};

	self.setter = function(value) {
		if (!value)
			value = 0;
        if (old === value)
            return;
        old = value;
		container.animate({ width: (old < 10 ? 10 : old) + '%' }, 100).html(old + '%');
	};
});