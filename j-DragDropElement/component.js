COMPONENT('dragdropelement', function(self, config, cls) {

	var area;
	var timeoutid;

	self.readonly();
	self.destroy = function () {
		area.off('*').remove();
	};

	self.make = function () {

		var hidden = true;
		var text = '';

		if (config.text)
			text = '<span>{0}</span>'.format(config.text);

		self.aclass(cls);
		self.append('<div class="{0}-area hidden">{1}</div>'.format(cls, text));
		area = self.find('.' + cls + '-area');

		var show = function(e) {

			e.stopPropagation();
			e.preventDefault();

			if (config.disabled)
				return;

			if (timeoutid) {
				clearTimeout(timeoutid);
				timeoutid = null;
			} else {
				if (hidden) {
					area.rclass('hidden');
					hidden = false;
				}
			}
		};

		var hide = function(e) {

			e.stopPropagation();
			e.preventDefault();

			if (config.disabled)
				return;

			if (!timeoutid) {
				timeoutid = setTimeout(function () {
					area.aclass('hidden');
					timeoutid = null;
					hidden = true;
				}, 100);
			}
		};

		var finish = function (e) {
			if (config.disabled)
				return;
			self.EXEC(config.exec, e.originalEvent.dataTransfer.files, e);
		};

		area.on('dragenter dragover', show);
		area.on('drop dragleave', hide);
		area.on('drop', finish);

		self.event('dragenter dragover', show);
		self.event('drop dragleave', hide);
		self.event('drop', finish);
	};
});