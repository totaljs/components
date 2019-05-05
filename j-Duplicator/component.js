COMPONENT('duplicator', function(self) {

	var cls = 'ui-duplicator';
	var cls2 = '.' + cls;
	var open = [];
	var ready = false;
	var template;

	self.readonly();

	self.make = function() {

		var tmp = self.find('script');
		if (tmp.length) {
			template = tmp.html().trim();
			tmp.remove();
		}

		self.aclass(cls);
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'datasource':
				self.datasource(value, self.rebind);
				break;
			case 'url':
				AJAX('GET ' + value, function(response) {
					if (typeof(response) === 'string')
						template = response.trim();
				});
				break;
		}
	};

	self.insert = function(obj, show) {

		if (open.indexOf(obj) !== -1)
			return;

		var scope = 'duplicator' + GUID(5);

		obj.scopename = function() {
			return scope;
		};

		open.push(obj);
		W[scope] = obj;
		self.append('<div data-scope="{0}__isolated:true" data-id="{0}" class="{2}-container hidden">{1}</div>'.format(scope, template, cls));
		show && self.set(obj);
	};

	self.rebind = function(path, arr) {

		if (!template) {
			setTimeout(self.rebind, 500, path, arr);
			return;
		}

		if (typeof(path) === 'object')
			arr = path;

		if (arr == null)
			return;

		var is = false;
		var cache = {};

		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if (open.indexOf(arr) === -1) {
				self.insert(item);
				cache[item.scopename()] = 1;
				is = true;
			}
		}

		var remove = [];

		for (var i = 0; i < open.length; i++) {
			var item = open[i];
			var sn = item.scopename();
			if (cache[sn])
				continue;
			else
				remove.push(item);
		}

		for (var i = 0; i < remove.length; i++) {
			var item = remove[i];
			var sn = item.scopename();
			open = open.remove(item);
			self.find(cls2 + '-container[data-id="{0}"]'.format(sn)).remove();
			delete W[sn];
		}

		remove.length && FREE();
		is && COMPILE();

		if (!ready) {
			ready = true;
			self.refresh();
			self.rclass('invisible');
		}
	};

	self.setter = function(value) {

		if (!ready)
			return;

		var arr = self.find(cls2 + '-container');
		var scope = value && value.scopename ? value.scopename() : '';
		var target = null;

		for (var i = 0; i < arr.length; i++) {
			var el = $(arr[i]);
			var s = el.attrd('id');
			if (s === scope)
				target = el;
			else
				el.aclass('hidden');
		}

		target && target.rclass('hidden');
	};

});