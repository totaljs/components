COMPONENT('console', function(self, config, cls) {

	var cls2 = '.' + cls;
	var etabs, source, elogs, current, clearbtn;
	var ready = false;

	self.singleton();
	self.readonly();

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.append(('<div class="{0}-body"><div class="{0}-tabs"><span class="{0}-close"><i class="ti ti-times"></i></span>' + (config.clear ? '<span class="{0}-clear hidden"><i class="ti ti-trash"></i></span>' : '') + '<div></div></div><div class="{0}-output"></div></div>').format(cls));

		etabs = self.find(cls2 + '-tabs > div');
		elogs = self.find(cls2 + '-output');
		clearbtn = self.find(cls2 + '-clear');

		self.event('click', cls2 + '-tab', function() {
			var el = $(this);
			var id = el.attrd('id');
			self.show(id);
		});

		self.event('click', cls2 + '-clear', function() {
			config.clear && self.EXEC(config.clear, source[current]);
		});

		self.event('click', cls2 + '-close', function() {
			self.set(false);
		});

		self.on('resize2 + resize', self.resize);
		self.resize();
	};

	self.resize = function() {
		elogs.css('width', WW + 30);
	};

	self.render_tabs = function() {

		if (!source)
			return;

		var builder = [];

		for (var key in source) {
			var item = source[key];

			if (!current)
				current = key;

			var icon = self.icon(item.icon);
			builder.push(('<span title="{1}" data-id="{2}" class="' + cls + '-tab{3}"><i class="{0}"></i>{1}</span>').format(icon + (item.name ? '' : '" style="margin-right:0'), item.name, key, current === key ? (' ' + cls + '-selected') : ''));
		}

		etabs.html(builder.join(''));
		current && self.render_logs(source[current]);
	};

	self.render_logs = function(obj) {

		if (!obj) {
			elogs.empty();
			return;
		}

		var builder = [];
		var arr = obj.items || EMPTYARRAY;

		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			var type = item.type || 'info';
			var icon = type === 'error' ? 'bug' : type === 'warning' ? type : type === 'success' ? 'check-circle' : 'info-circle';
			builder.push('<div class="{0}-message {0}-{2}"><i class="ti ti-{3}"></i>{1}</div>'.format(cls, obj.encode === true || obj.encode == null ? Thelpers.encode(item.body) : item.body, type, icon));
		}

		elogs.html(builder.join(''));
		elogs[0].scrollTop = 0;
		clearbtn.tclass('hidden', !builder.length);
	};

	self.show = function(id) {

		if (current === id || !ready)
			return;

		etabs.find(cls2 + '-selected').rclass(cls + '-selected');
		etabs.find(cls2 + '-tab[data-id="{0}"]'.format(id)).aclass(cls + '-selected');
		current = id;
		self.render_logs(source[id]);
	};

	self.rebind = function(path, value) {

		if (!ready)
			return;

		source = value;
		if (path === config.datasource)
			self.render_tabs();
		else if (path.substring(config.datasource.length + 1).substring(0, current.length) === current)
			self.render_logs(source[current]);
	};

	self.configure = function(key, value) {
		if (key === 'datasource')
			self.datasource(value, self.rebind);
	};

	self.setter = function(value) {

		if (value && !ready) {
			ready = true;
			self.rebind(config.datasource, GET(self.makepath(config.datasource)));
		}

		if (value) {
			self.rclass('hidden');
			if (typeof(value) === 'string')
				self.show(value);
			self.aclass(cls + '-visible', 100);
		} else {
			self.rclass('hidden', 100);
			self.rclass(cls + '-visible');
		}
	};
});