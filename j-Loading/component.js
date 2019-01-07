COMPONENT('loading', function(self) {

	var pointer;

	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-loading');
		self.append('<div><div class="ui-loading-text"></div></div>');
	};

	self.show = function(text) {
		clearTimeout(pointer);
		self.find('.ui-loading-text').html(text || '');
		self.rclass('hidden');
		return self;
	};

	self.hide = function(timeout) {
		clearTimeout(pointer);
		pointer = setTimeout(function() {
			self.aclass('hidden');
		}, timeout || 1);
		return self;
	};
});