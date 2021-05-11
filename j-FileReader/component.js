COMPONENT('filereader', function(self) {

	var input;

	self.readonly();
	self.nocompile();
	self.singleton();

	self.make = function() {
		self.aclass('hidden');
		self.append('<input type="file" />');
		input = self.find('input');
		input.on('change', function(e) {
			self.process(e.target.files);
		});
	};

	self.open = function(opt, callback) {

		self.opt = opt;

		if (!opt.callback)
			opt.callback = callback;

		input.attr('accept', opt.accept || '*/*').prop('multiple', !!opt.multiple);
		input.trigger('click');
	};

	self.process = function(files) {
		var el = this;

		SETTER('loading', 'show');

		var arr = [];
		for (var i = 0; i < files.length; i++)
			arr.push(i);

		arr.wait(function(index, next) {
			var file = files[index];
			var reader = new FileReader();
			reader.onload = function() {
				var data = { body: reader.result, filename: file.name, type: file.type, size: file.size };
				if (self.opt.callback)
					self.opt.callback(data);
				else
					self.set(data);
				reader = null;
				setTimeout(next, 500);
			};
			reader.readAsText(file);
		}, function() {
			SETTER('loading', 'hide', 1000);
			el.value = '';
		});
	};
});