COMPONENT('fileuploader', function(self) {

	var input;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.upload = self.browse = function(opt) {

		// opt.url
		// opt.callback {Function(response, err)}
		// opt.progress {Function(progress)}
		// opt.multiple {Boolean}
		// opt.accept {String}
		// opt.prefix = 'file{0}'
		// opt.data = { key: value };

		self.opt = opt;

		if (opt.files) {
			self.uploadfiles(opt.files);
		} else {
			self.find('input').attr('accept', opt.accept || '*/*').prop('multiple', !!opt.multiple);
			input[0].value = '';
			input.click();
		}
	};

	self.make = function() {
		self.aclass('hidden');
		self.append('<input type="file" multiple />');
		input = self.find('input');
		self.event('change', 'input', function(e) {
			self.uploadfiles(e.target.files);
			this.value = '';
		});
	};

	self.uploadfiles = function(files) {

		var data = new FormData();

		for (var i = 0; i < files.length; i++) {

			var filename = files[i].name;
			var index = filename.lastIndexOf('/');

			if (index === -1)
				index = filename.lastIndexOf('\\');

			if (index !== -1)
				filename = filename.substring(index + 1);

			data.append((self.opt.prefix || 'file{0}').format(i), files[i], filename);
		}

		if (self.opt.data) {
			for (var key in self.opt.data)
				data.append(key, self.opt.data[key]);
		}

		SETTER('loading/show');
		UPLOAD(self.opt.url, data, function(response, err) {

			input[0].value = '';
			SETTER('loading/hide', 500);

			if (err) {
				self.opt.callback(null, err);
				return;
			}

			if (response instanceof Array && response[0] && response[0].error)
				self.opt.callback(null, response[0].error);
			else
				self.opt.callback(response);

		}, self.opt.progress);
	};

});