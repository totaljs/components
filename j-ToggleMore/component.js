COMPONENT('togglemore', function(self) {

	var cls = 'ui-togglemore';
	var cls2 = '.' + cls;
	var before, after, arrow, arrowcontainer;
	var showed = false;

	self.readonly();

	self.make = function() {
		self.element.aclass(cls);
		self.event('click', cls2 + '-arrow, ' + cls2 + '-before', function() {
			self.toggle();
		});

		self.prepare();
	};

	self.toggle = function(force) {

		if (force != null)
			showed = !force;

		showed = !showed;
		after.tclass('hidden', !showed);
		before.tclass('hidden', showed);
		arrowcontainer.tclass('down', showed);
		arrow.rclass2('fa-chevron').aclass('fa-chevron-' + (showed ? 'down' : 'right'));
	};

	self.prepare = function() {
		self.find(' > div').each(function(index) {
			$(this).aclass(cls + '-' + (index === 0 ? 'before' : 'after'));
		});

		self.element.prepend('<div class="' + cls +'-arrow"><i class="fas fa-chevron-right fa-sm"></i></div>');
		before = self.find(cls2 + '-before');
		after = self.find(cls2 + '-after');
		arrowcontainer = self.find(cls2 + '-arrow');
		arrow = self.find(cls2 + '-arrow i');
		after.tclass('hidden');
	};

	self.setter = function(value) {
		self.toggle(false);
	};
});