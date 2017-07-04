COMPONENT('dragdropfiles', function() {
	var self = this;
	self.readonly();

	self.mirror = function(cls) {
		var arr = cls.split(' ');
		for (var i = 0, length = arr.length; i < length; i++) {
			arr[i] = arr[i].replace(/^(\+|\-)/g, function(c) {
				return c === '+' ? '-' : '+';
			});
		}
		return arr.join(' ');
	};

	self.make = function() {
		var cls = self.attr('data-class');
		var has = false;

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					cls && has && self.classes(self.mirror(cls));
					break;
				case 'dragenter':
				case 'dragover':
					cls && !has && self.classes(cls);
					has = true;
					return;
				case 'dragleave':
				case 'dragexit':
				default:
					setTimeout2(self.id, function() {
						cls && has && self.classes(self.mirror(cls));
						has = false;
					}, 100);
					return;
			}

			EXEC(self.attr('data-files'), e.originalEvent.dataTransfer.files, e);
		});
	};
});