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

		if (opt.files) {
			self.process(opt.files, opt.multiple);
		} else {
			input.attr('accept', opt.accept || '*/*').prop('multiple', !!opt.multiple);
			input.trigger('click');
		}
	};

	self.process = function(files, multiple) {

		SETTER('loading/show');

		var arr = [];
		for (var i = 0; i < files.length; i++) {
			arr.push(i);
			if (multiple != null && multiple == false)
				break;
		}

		var length = arr.length;

		arr.wait(function(index, next) {
			var file = files[index];
			var reader = new FileReader();

			reader.onload = function() {
				self.opt.progress && self.opt.progress((100 / length) * (index + 1), file);
				var data = { body: reader.result, filename: file.name, type: file.type, size: file.size };
				if (self.opt.callback)
					self.opt.callback(data);
				else
					self.set(data);
				reader = null;
				setTimeout(next, 500);
			};

			if (self.opt.base64)
				reader.readAsDataURL(file);
			else
				reader.readAsText(file);

		}, function() {
			SETTER('loading/hide', 1000);
			input[0].value = '';
		});
	};
});