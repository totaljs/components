COMPONENT('dragdropfiles', 'click:true', function(self, config) {

	var file;

	self.readonly();

	self.mirror = function(cls) {
		var arr = cls.split(' ');
		for (var i = 0, length = arr.length; i < length; i++) {
			arr[i] = arr[i].replace(/^(\+|-)/g, function(c) {
				return c === '+' ? '-' : '+';
			});
		}
		return arr.join(' ');
	};

	self.destroy = function() {
		file.off('*').remove();
	};

	self.make = function() {

		var has = false;
		var id = 'file' + self.ID;
		$(document.body).append('<input type="file" id="{0}" multiple />'.format(id));

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
					config.class && has && self.classes(self.mirror(config.class));
					break;
				case 'dragenter':
				case 'dragover':
					config.class && !has && self.classes(config.class);
					has = true;
					return;
				case 'dragleave':
				case 'dragexit':
				default:
					setTimeout2(self.id, function() {
						config.class && has && self.classes(self.mirror(config.class));
						has = false;
					}, 100);
					return;
			}

			EXEC(config.exec, e.originalEvent.dataTransfer.files, e);
		});
	};
});