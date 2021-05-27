COMPONENT('paste', function(self) {

	self.readonly();
	self.singleton();
	self.blind();

	self.make = function() {
		$(W).on('paste', function(e) {
			var text = (e.originalEvent.clipboardData || W.clipboardData).getData('text') || '';
			text && EMIT('paste', text, e);
		});
	};

});