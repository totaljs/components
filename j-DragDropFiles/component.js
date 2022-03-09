COMPONENT('dragdropfiles', 'click:true;class:ui-dragdropfiles;accept:*/*;', function(self, config) {

	var file;

	self.readonly();
	self.nocompile && self.nocompile();

	self.destroy = function() {
		file.off('*').remove();
	};

	self.make = function() {

		var has = false;
		var id = 'file' + self.ID;

		self.aclass(config.class);

		$(document.body).append('<input type="file" id="{0}" class="hidden" accept="{1}" multiple />'.format(id, config.accept));

		file = $('#' + id);

		self.event('click', function() {
			config.click && file.trigger('click');
		});

		file.on('change', function(e) {
			var self2 = this;
			self.EXEC(config.exec, this.files, e);
			setTimeout(function() {
				self2.value = '';
			}, 1000);
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					config.class && has && self.rclass('over');
					break;
				case 'dragenter':
				case 'dragover':
					config.class && !has && self.aclass('over');
					has = true;
					return;
				case 'dragleave':
				case 'dragexit':
				default:
					setTimeout2(self.id, function() {
						config.class && has && self.rclass('over');
						has = false;
					}, 100);
					return;
			}

			self.EXEC(config.exec, e.originalEvent.dataTransfer.files, e);
		});
	};
});