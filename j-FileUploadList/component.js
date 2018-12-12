COMPONENT('fileuploadlist', 'multiple:true;url:/api/upload/', function(self, config) {

	var id = 'fileuploadlist' + self.id;
	var input = null;

	self.template = Tangular.compile('<div class="ui-fileuploadlist-item" data-id="{{ $.index }}"><div class="ui-fileuploadlist-remove"><i class="fa fa-times"></i></div><div class="ui-fileuploadlist-name"><a href="{{ url }}" target="_blank">{{ name }}</a></div></div>');

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'accept':
				var el = $('#' + id);
				if (value)
					el.prop('accept', value);
				else
					el.removeProp('accept');
				break;
			case 'multiple':
				var el = $('#' + id);
				if (value)
					el.prop('multiple', true);
				else
					el.removeProp('multiple');
				break;
			case 'label':
				self.html(value);
				break;
		}
	};

	self.make = function() {
		self.aclass('ui-fileuploadlist hidden');
		$(document.body).append('<input type="file" id="{0}" class="hidden"{1}{2} />'.format(id, config.accept ? ' accept="{0}"'.format(config.accept) : '', config.multiple ? ' multiple="multiple"' : ''));
		input = $('#' + id);
		input.on('change', function(evt) {
			self.upload(evt.target.files);
		});

		self.event('click', '.ui-fileuploadlist-remove', function() {
			var index = +$(this).closest('.ui-fileuploadlist-item').attrd('index');
			self.get().splice(index, 1);
			self.change(true);
			self.update();
		});
	};

	self.browse = function() {
		input.click();
	};

	self.upload = function(files) {

		var data = new FormData();

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

			input.value = '';
			SETTER('loading', 'hide', 500);

			if (err) {
				SETTER('snackbar', 'warning', err.toString());
				return;
			}

			self.change(true);
			self.push(response);
		});
	};

	self.setter = function(value) {

		if (!value)
			value = EMPTYARRAY;

		var builder = [];
		var g = {};

		for (var i = 0, length = value.length; i < length; i++) {
			var item = value[i];
			g.index = i;
			builder.push(self.template(item, g));
		}

		self.tclass('hidden', !builder.length);
		self.html(builder.join(''));
	};

	self.destroy = function() {
		input.off().remove();
	};
});