COMPONENT('dragdropelement', 'class:ui-dragdropelement;text:Drag & drop files here;', function (self, config) {

	var modal;
	var timeout_id;

	self.readonly();
	self.destroy = function () {
		modal.off('*').remove();
	};

	self.make = function () {
		var hidden = true;
		var id = 'dde' + self.ID;

		self.append('<div id="{0}" class="{1} hidden"><span>{2}</span></div>'.format(id, config.class, config.text));

		modal = $('#' + id);

		const show = function (e) {
			e.stopPropagation();
			e.preventDefault();

			if (timeout_id) {
				clearTimeout(timeout_id);
				timeout_id = null;
			} else {
				if (hidden) {
					modal.rclass('hidden');
					hidden = false;
				}
			}
		};

		const hide = function (e) {
			e.stopPropagation();
			e.preventDefault();

			if (!timeout_id)
				timeout_id = setTimeout(function () {
					modal.aclass('hidden');
					timeout_id = null;
					hidden = true;
				}, 100);
		};

		const finish = function (e) {
			self.EXEC(config.exec, e.originalEvent.dataTransfer.files, e);
		};

		modal.on('dragenter dragover', show);
		modal.on('drop dragleave', hide);
		modal.on('drop', finish);

		self.event('dragenter dragover', show);
		self.event('drop dragleave', hide);
		self.event('drop', finish);
	};
});