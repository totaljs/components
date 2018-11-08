COMPONENT('dragdropfiles', 'click:true', function(self, config) {

	var file;

	self.readonly();
	self.nocompile && self.nocompile();

	self.destroy = function() {
		file.off('*').remove();
	};

	self.make = function() {

		var has = false;
		var id = 'file' + self.ID;
		$(document.body).append('<input type="file" id="{0}" class="hidden" multiple />'.format(id));

		file = $('#' + id);

		self.event('click', function() {
			config.click && file.trigger('click');
		});

		file.on('change', function(e) {
			var self = this;
			EXEC(config.exec, this.files, e);
			setTimeout(function() {
				self.value = '';
			}, 1000);
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					config.class && has && self.rclass(config.class);
					break;
				case 'dragenter':
				case 'dragover':
					config.class && !has && self.aclass(config.class);
					has = true;
					return;
				case 'dragleave':
				case 'dragexit':
				default:
					setTimeout2(self.id, function() {
						config.class && has && self.rclass(config.class);
						has = false;
					}, 100);
					return;
			}

			EXEC(config.exec, e.originalEvent.dataTransfer.files, e);
		});
	};
});