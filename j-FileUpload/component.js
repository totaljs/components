COMPONENT('fileupload', function() {

	var self = this;

	self.readonly();

	self.make = function() {
		var id = 'fileupload' + self.id;
		var accept = self.attr('data-accept');
        var multiple = self.attr('data-multiple');

		$(document.body).append('<input type="file" id="{0}" class="hidden"{1}{2} />'.format(id, accept ? ' accept="{0}"'.format(accept) : '', multiple ? ' multiple="multiple"' : ''));

		var input = $('#' + id);

		self.element.on('click', function() {
			input.click();
		});

		input.on('change', function(evt) {

			var files = evt.target.files;
			var data = new FormData();
			var el = this;

			for (var i = 0, length = files.length; i < length; i++)
				data.append('file' + i, files[i]);

			SETTER('loading', 'show');
			UPLOAD(self.attr('data-url'), data, function(response, err) {

				el.value = '';
				SETTER('loading', 'hide', 500);

				if (err) {
					SETTER('message', 'warning', self.attr('data-error') || err.toString());
					return;
				}

				self.change();

				if (self.attr('data-array') === 'true')
					self.push(response);
				else
					self.set(response);
			});
		});
	};
});