COMPONENT('dropfiles', function(self, config, cls) {

	self.readonly();
	self.singleton();
	self.nocompile();

	var has = false;
	var is = false;
	var events = 'dragenter dragover dragexit drop dragleave';

	var hide = function() {
		is = false;
		self.rclass(cls + '-visible');
		config.class && has && self.rclass('over');
		has = false;
	};

	self.destroy = function() {
		$(W).off(events, self.filehandler);
	};

	self.make = function() {
		self.aclass(cls).rclass('hidden');
		self.element.wrapInner('<div><div></div></div>');
		$(W).on(events, self.filehandler);
	};

	self.filehandler = function (e) {

		if (config.disabled)
			return;

		if (e.type === 'dragenter') {
			is = e.originalEvent.dataTransfer.types.includes('Files');
			self.tclass(cls + '-visible', is);
		}

		if (!is)
			return;

		e.stopPropagation();
		e.preventDefault();

		switch (e.type) {
			case 'drop':
				break;
			case 'dragenter':
			case 'dragover':
				has = true;
				return;
			case 'dragleave':
			case 'dragexit':
			default:
				if (is && e.target === self.dom)
					setTimeout2(self.ID, hide, 300);
				return;
		}

		hide();
		self.EXEC(config.exec, e.originalEvent.dataTransfer.files, e);
	};

});