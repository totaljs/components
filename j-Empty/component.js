COMPONENT('empty', 'icon:fa fa-database;parent:parent', function(self, config, cls) {

	var visible = false;

	self.readonly();
	self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.element.wrapInner('<div class="{0}-table"><div class="{0}-cell"><div></div></div></div>'.format(cls)).find('> div > div').prepend('<i class="{0}"></i>'.format(config.icon));
		self.on('resize2 + resize', function() {
			if (!visible)
				self.resize();
		});
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {
		var parent = self.parent(config.parent);
		var wh = parent.height();
		self.css('height', wh < 100 ? 'auto' : wh);
	};

	self.setter = function(value) {

		visible = false;

		if (value instanceof Array)
			visible = !!value.length;
		else if (value)
			visible = value.items && !!value.items.length;

		self.tclass('hidden', visible);

		if (!visible)
			self.resizeforce();
	};

});
