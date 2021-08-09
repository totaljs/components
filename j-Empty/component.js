COMPONENT('empty', 'icon:fa fa-database;parent:parent;margin:0;wait:1', function(self, config, cls) {

	var visible = false;
	var special = false;
	var table;

	self.readonly();

	self.make = function() {

		self.aclass(cls);

		var scr = self.find('> scri' + 'pt,> template');
		var text = scr.length ? scr.html() : self.html();
		var html = '<div class="{0}-table hidden"><div class="{0}-cell"><i class="{1}"></i><div>{2}</div></div></div>'.format(cls, config.icon, text);

		if (scr.length) {
			special = true;
			scr.remove();
			self.element.prepend(html);
		} else
			self.html(html);

		table = self.find('> .' + cls + '-table');

		self.on('resize2 + resize', function() {
			if (!visible)
				self.resize();
		});

		self.rclass('hidden invisible');
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {

		if (config.height) {
			table.css('height', config.height);
			return;
		}

		var parent = self.parent(config.parent);
		var wh = parent.height() - 10;

		if (config.topoffset)
			wh -= self.element.offset().top;

		if (config.topposition)
			wh -= self.element.position().top;

		table.css('height', wh < 100 ? 'auto' : wh - config.margin);
	};

	self.setter = function(value, path, type) {

		if (type === 1 && config.wait)
			return;

		var value = self.get();
		visible = false;

		if (value instanceof Array)
			visible = !!value.length;
		else if (value)
			visible = value.items && !!value.items.length;

		table.tclass('hidden', visible);

		if (!visible)
			self.resizeforce();

		if (special) {
			for (var i = 1; i < self.dom.children.length; i++)
				$(self.dom.children[i]).tclass('hidden', !visible);
		}

	};

});