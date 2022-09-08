COMPONENT('importer', function(self, config) {

	var init = false;
	var clid = null;
	var pending = false;
	var content = '';

	var replace = function(value) {
		return self.scope ? self.makepath(value) : value.replace(/\?/g, config.path || config.if);
	};

	var replace2 = function(value) {
		var path = config.path || config.if;
		return value ? value.replace(/~PATH~/g, path).replace(/~ID~/g, config.id || '').replace('PLUGIN(function(', 'PLUGIN(\'{0}\', function('.format(path)) : value;
	};

	self.readonly();

	self.make = function() {
		var scr = self.find('script');
		content = scr.length ? scr.html() : '';
	};

	self.reload = function(recompile) {
		config.reload && EXEC(replace(config.reload));
		recompile && COMPILE();
		setTimeout(function() {
			pending = false;
			init = true;
		}, 1000);
	};

	self.setter = function(value) {

		if (pending)
			return;

		if (config.if !== value) {
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		pending = true;

		if (clid) {
			clearTimeout(clid);
			clid = null;
		}

		if (init) {
			self.reload();
			return;
		}

		if (content) {
			self.html(replace2(content));
			setTimeout(self.reload, 50, true);
		} else
			self.import(config.url, self.reload, true, replace2);
	};

	self.clean = function() {
		config.clean && EXEC(replace(config.clean));
		setTimeout(function() {
			self.empty();
			init = false;
			clid = null;
		}, 1000);
	};
});