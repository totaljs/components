COMPONENT('parts', 'parent:auto;margin:0', function(self, config, cls) {

	var skip = false;
	var partw;
	var parth;

	self.make = function() {
		self.aclass(cls);
		self.on('resize + resize2', self.resize);
	};

	var itemreplace = function(item, content) {
		if (item.path)
			content = content.replace(/~PATH~/g, item.path);
		return content.replace(/~ID~/g, item.id || '');
	};

	var itempath = function(item, path) {
		return path.replace(/\?/g, item.scope || item.path || item.id || '?');
	};

	self.focus = function(id, fromsetter) {

		var is = false;
		var model = self.get();
		var classname = cls + '-focused';
		var selected = model.findItem('id', id);

		if (fromsetter && selected) {
			if (selected.element.hclass(classname))
				return;
		}

		var item = model.findItem('focused', true);
		if (item && item.id !== id) {
			is = true;
			item.focused = false;
			item.element.rclass(classname);
			item.blur && self.EXEC(itempath(item, item.blur), item.element, item);
		}

		item = selected;
		if (item) {

			if (!item.element.hclass(classname)) {
				item.focused = true;
				item.element.aclass(classname);
				is = true;
			}

			item.reload && self.EXEC(itempath(item, item.reload), item.element, item);
			item.focus && self.EXEC(itempath(item, item.focus), item.element, item);
		}

		if (is) {
			skip = true;
			self.update(true);
		}
	};

	self.rename = function(id, name, icon) {
		var model = self.get();
		var item = model.findItem('id', id);
		if (item) {
			if (name)
				item.name = name;
			if (icon)
				item.icon = icon;
			skip = true;
			self.update(true);
		}
	};

	self.close = function(id) {

		var model = self.get();
		if (id == null) {
			for (var item of model)
				self.close(item.id);
			return;
		}

		var item = model.findItem('id', id);
		if (item) {
			var index = model.indexOf(item);
			model.splice(index, 1);

			if (item.focused) {
				// next part to focus
				var next = model[index];
				if (!next)
					next = model[0];
				next && setTimeout(self.focus, 5, next.id);
			}

			skip = true;
			self.update(true);
			item.remove && self.EXEC(itempath(item, item.remove), item.element, item);
			item.element.remove();
			setTimeout2(self.ID + 'free', FREE, 1000);
		}
	};

	self.create = function(item) {

		if (item.processed)
			return;

		item.processed = true;
		var div = $('<div></div>');
		div.aclass(cls + '-item');
		div.attrd('id', item.id);

		if (item.attr) {
			for (var key in item.attr)
				div.attr(key, item.attr[key]);
		}

		if (item.attrd) {
			for (var key in item.attrd)
				div.attrd(key, item.attrd[key]);
		}

		if (parth || partw)
			div.css({ width: partw, height: parth });

		if (item.import) {
			IMPORT(item.import, div, function() {
				item.init && self.EXEC(itempath(item, item.init), div, item);
			}, true, function(content) {
				return itemreplace(item, content);
			});
		} else if (div.html) {
			div.append(itemreplace(item, item.html));
			item.html.COMPILABLE() && setTimeout(COMPILE, 1, div);
		}

		div[0].$part = item;
		item.element = div;
		config.create && self.EXEC(config.create, item);
		self.append(div);
		setTimeout2(self.ID + 'focus', self.focus, 100, null, item.id);

		if (!item.import)
			item.init && self.EXEC(itempath(item, item.init), div, item);
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {
		var parent = self.parent(config.parent);
		var w = parent.width();
		var h = parent.height() - config.margin;
		if (parth !== h || partw !== w) {
			parth = h;
			partw = w;
			self.find('> div').css({ width: w, height: h });
			self.element.SETTER('*/resize');
		}
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		var model = value || EMPTYARRAY;

		for (var item of model) {
			self.create(item);
			item.focused && self.focus(item.id);
		}

		// Clean ghosts
		var div = self.find('> div').toArray();
		for (var i = 0; i < div.length; i++) {
			var el = $(div[i]);
			if (!model.findItem('id', el.attrd('id'))) {
				var obj = div[i].$part;
				if (obj) {
					obj.remove && self.EXEC(itempath(obj, obj.remove), obj.element, obj);
					obj.element.remove();
				}
			}
		}

		self.resize();
	};

});