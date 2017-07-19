COMPONENT('loading', function(self) {

	var pointer;

	self.readonly();
	self.singleton();

	self.make = function() {
		self.aclass('ui-loading');
	};

	self.show = function() {
		clearTimeout(pointer);
		self.toggle('hidden', false);
		return self;
	};

	self.hide = function(timeout) {
		clearTimeout(pointer);
		pointer = setTimeout(function() {
			self.toggle('hidden', true);
		}, timeout || 1);
		return self;
	};
});