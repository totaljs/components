COMPONENT('singleupload', 'title:{{ name }};url:/api/upload/', function(self, config) {

	var id = self.name + self._id;
	var input = null;

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				!init && self.tclass('ui-disabled', value);
				break;
			case 'accept':
				if (init)
					return;
				var el = $('#' + id);
				if (value)
					el.prop('accept', value);
				else
					el.removeProp('accept');
				break;
			case 'title':
				config.title = Tangular.compile(value);
				break;
			case 'remap':
				config.remap = value ? FN(value) : null;
				break;
		}
	};

	self.make = function() {

		if (!config.label)
			config.label = self.html();

		self.aclass('ui-singleupload');

		config.disabled && self.aclass('ui-disabled');
		$(document.body).append('<input type="file" id="{0}" class="hidden"{1} />'.format(id, config.accept ? ' accept="{0}"'.format(config.accept) : ''));
		input = $('#' + id);

		self.html('<i class="ti ti-times"></i><span>{0}</span>'.format(config.label));

		self.event('click', 'span', function() {
			!config.disabled && input.click();
		});

		self.event('click', '.ti-times', function() {
			if (!config.disabled) {
				self.change();
				self.set(null);
			}
		});

		input.on('change', function(evt) {
			!config.disabled && self.upload(evt.target.files);
			this.value = '';
		});
	};

	self.setter = function(value) {
		self.tclass('ui-singleupload-is', !!value);
		var span = self.find('span');
		var val = value ? config.title(value) : config.label;
		if (span.html() !== val)
			span.html(val);
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

			data.append('file' + i, files[i], filename);
		}

		SETTER('loading', 'show');
		UPLOAD(config.url, data, function(response, err) {

			el.value = '';
			SETTER('loading', 'hide', 500);

			if (err) {
				SETTER('snackbar', 'warning', err.toString());
			} else {
				self.change();
				self.set(config.remap ? config.remap(response) : response);
			}
		});
	};

	self.destroy = function() {
		input.off().remove();
	};
});