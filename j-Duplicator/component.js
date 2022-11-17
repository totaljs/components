COMPONENT('duplicator', function(self, config, cls) {

	var cls2 = '.' + cls;
	var open = [];
	var ready = false;
	var templates = {};
	
	self.readonly();

	self.make = function() {

		var tmp = self.find('script');

		for (var i = 0; i < tmp.length; i++) {
			var name = tmp[i].getAttribute('data-id') || 'default';
			templates[name] = { url: tmp[i].getAttribute('data-url'), html: tmp[i].innerHTML.trim() };
		}

		tmp.remove();
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
						templates.default = response.trim();
				});
				break;
		}
	};

	self.insert = function(obj, show, callback) {

		if (open.indexOf(obj) !== -1)
			return;

		var template = templates[obj.template || 'default'];

		// Template not found
		if (!template)
			return;

		if (template.url) {
			AJAX('GET ' + template.url, function(response) {
				template.url = '';
				template.html = response || '';
				self.insert(obj, show);
			});
			return;
		}

		var scope = 'duplicator' + GUID(5);

		obj.scopename = function() {
			return scope;
		};

		open.push(obj);
		W[scope] = obj;
		self.append('<div data-scope="{0}__isolated:true" data-id="{0}" class="{2}-container hidden">{1}</div>'.format(scope, template.html, cls));
		show && self.set(obj);
		callback && callback(obj);
	};

	self.rebind = function(path, arr) {

		if (!Object.keys(templates).length) {
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
			if (open.indexOf(item) === -1) {
				self.insert(item, null, function(item) {
					cache[item.scopename()] = 1;
					setTimeout2(self.ID + 'compile', COMPILE, 100);
				});
			} else { 
				cache[item.scopename()] = 1;
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