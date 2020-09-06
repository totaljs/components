COMPONENT('mainprogress', function(self, config, cls) {

	var old = null;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.make = function() {
		var temp = config.position === 'bottom' ? ' ' + cls + '-bottom' : '';
		self.aclass(cls + temp + ' hidden');
	};

	self.setter = function(value) {
		!value && (value = 0);

		if (old === value)
			return;

		if (value > 100)
			value = 100;
		else if (value < 0)
			value = 0;

		old = value >> 0;

		self.element.stop().animate({ width: old + '%' }, 80).show();
		self.tclass('hidden', old === 0 || old === 100);
	};
});
