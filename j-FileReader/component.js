COMPONENT('filereader', function() {
	var self = this;
	var input;
	self.readonly();
	self.make = function() {
		self.classes('hidden');
		self.append('<input type="file" />');
		input = self.find('input');
		input.on('change', function(e) {
			var files = e.target.files;
			var file = files[0];
			var el = this;
			var reader = new FileReader();
			reader.onload = function() {
				el.value = '';
				self.callback && self.callback({ body: reader.result, filename: file.name, type: file.type, size: file.size });
				reader = null;
			};
			reader.readAsText(file);
		});
	};

	self.open = function(accept, callback) {

		if (typeof(accept) === 'function') {
			callback = accept;
			accept = undefined;
		}

		console.log('OK');
		self.callback = callback;
		input.attr('accept', accept ? accept : '');
		input.trigger('click');
	};
});