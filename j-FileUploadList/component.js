COMPONENT('fileuploadlist', 'multiple:true;url:/api/upload/;text:name', function(self, config, cls) {

	var id = 'fileuploadlist' + self.id;
	var input = null;
	var cls2 = '.' + cls;

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {

		if (init && key !== 'text')
			return;

		var el;
		switch (key) {
			case 'text':
				self.template = Tangular.compile(('<div class="{0}-item" data-id="{{ $.index }}"><div class="{0}-remove"><i class="fa fa-times"></i></div><div class="{0}-name">{{ if url }}<a href="{{ url }}" target="_blank">{{ fi }}{{ ' + config.text + ' }}{{ if url }}</a>{{ fi }}</div></div>').format(cls));
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'accept':
				el = $('#' + id);
				if (value)
					el.prop('accept', value);
				else
					el.removeProp('accept');
				break;
			case 'multiple':
				el = $('#' + id);
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

		self.aclass(cls + ' hidden' + (config.disabled ? ' ui-disabled' : ''));
		$(document.body).append('<input type="file" id="{0}" class="hidden"{1}{2} />'.format(id, config.accept ? ' accept="{0}"'.format(config.accept) : '', config.multiple ? ' multiple="multiple"' : ''));

		input = $('#' + id);
		input.on('change', function(evt) {
			self.upload(evt.target.files);
		});

		self.event('click', cls2 + '-remove', function() {

			if (config.disabled)
				return;

			var index = +$(this).closest(cls2 + '-item').attrd('index');
			self.get().splice(index, 1);
			self.update(true);
			self.change(true);
		});
	};

	self.browse = function() {
		if (!config.disabled)
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

			input.val('');
			SETTER('loading', 'hide', 500);

			if (err) {
				SETTER('snackbar', 'warning', err.toString());
				return;
			}

			self.change(true);
			self.push(response);
		}, config.progress);
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
		self.element.EXEC && self.element.EXEC('^resize');
	};

	self.destroy = function() {
		input.off().remove();
	};
});