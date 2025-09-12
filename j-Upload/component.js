COMPONENT('upload', function(self) {

	var id = 'upload' + self._id;
	var input = null;

	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.show = function(opt) {

		self.opt = opt;

		if (opt.accept)
			input.attr('accept', opt.accept);
		else
			input.removeAttr('accept');

		if (opt.multiple)
			input.attr('multiple', 'multiple');
		else
			input.removeAttr('multiple');

		input[0].value = '';
		input.trigger('click');
	};

	self.make = function() {

		$(document.body).append('<input type="file" id="{0}" class="hidden" />'.format(id));
		input = $('#' + id);

		input.on('change', function(evt) {
			self.upload(evt.target.files);
			this.value = '';
		});
	};

	self.upload = function(files) {

		var data = new FormData();
		var el = this;

		for (var i = 0, length = files.length; i < length; i++) {

			var filename = files[i].name;
			var index = filename.lastIndexOf('/');

			if (index === -1)
				index = filename.lastIndexOf('\\');

			if (index !== -1)
				filename = filename.substring(index + 1);

			data.append((self.opt.name || 'file') + i, files[i], filename);
		}

		if (self.opt.data) {
			var keys = Object.keys(self.opt.data);
			for (var i = 0; i < keys.length; i++)
				data.append(keys[i], self.opt.data[keys[i]]);
		}

		SETTER('loading', 'show');
		UPLOAD(self.opt.url, data, function(response, err) {

			el.value = '';
			SETTER('loading/hide', 1000);

			if (err) {

				if (self.opt.error)
					self.opt.error(err);
				else
					SETTER('snackbar/warning', err.toString());

			} else {

				if (typeof(self.opt.callback) === 'string')
					SET(self.opt.callback, response);
				else
					self.opt.callback(response);

				self.change(true);
			}
		});
	};
});