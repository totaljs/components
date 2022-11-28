COMPONENT('markdowneditor', function (self, config) {

	var input, editor, content;

	self.nocompile && self.nocompile();

	self.make = function () {
		content = self.html();
		self.redraw();
	};

	self.redraw = function () {

		var label = config.label || content;
		var builder = ['<div>'];

		label && builder.push((config.required ? '<div class="ui-markdown-editor-label ui-markdown-editor-label-required"><i class="ti ti-pencil"></i>{0}:</div>' : '<div class="ui-markdown-editor-label">{0}:</div>').format(label));
		builder.push('<textarea></textarea></div>');
		self.html(builder.join(''));

		input = self.find('textarea')[0];
		editor = new SimpleMDE({element: input});
		editor.codemirror.on('change', function () {
			SET(self.path, editor.value(), 3);
			self.change(true);
		});
	};

	self.setter = function (value, path, type) {
		if (type !== 3)
			editor.value(value || '');
	};

	self.validate = function(value, init) {

		if (init || !config.required)
			return true;

		if (value == null)
			value = '';
		else
			value = value + '';

		return value.length > 0;
	};

	self.state = function (type) {
		if (type) {
			var invalid = config.required ? self.isInvalid() : false;
			if (invalid !== self.$oldstate) {
				self.$oldstate = invalid;
				self.find('.CodeMirror-wrap').tclass('ui-markdown-editor-invalid', invalid);
			}
		}
	};

}, ['https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js', 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css']);