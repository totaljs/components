COMPONENT('modificator', function(self) {

	var keys, keys_unique;
	var db = {};

	self.readonly();
	self.blind();

	self.make = function() {
		self.watch('*', self.autobind);
		self.scan();

		self.on('component', function() {
			setTimeout2(self.id, self.scan, 200);
		});

		self.on('destroy', function() {
			setTimeout2(self.id, self.scan, 200);
		});

		$(document).on('click', '.modify', function() {
			var el = $(this);
			var item = el.data('data-m');
			if (item) {
				item.event.type = 'click';
				item.event.bindtype = -1;
				var schema = db[item.schema];
				schema && schema(GET(item.path), item.selector ? item.element.find(item.selector) : item.element, item.event);
			}
		});

	};

	self.autobind = function(path, value, type) {

		var mapper = keys[path];
		if (!mapper)
			return;

		for (var i = 0, length = mapper.length; i < length; i++) {
			var item = mapper[i];
			var schema = db[item.schema];
			item.event.type = 'bind';
			item.event.bindtype = type;
			schema && schema(GET(item.path), item.selector ? item.element.find(item.selector) : item.element, item.event);
		}

	};

	self.register = function(name, fn) {
		db[name] = fn;
		return self;
	};

	self.scan = function() {
		keys = {};
		keys_unique = {};
		self.find('[data-m]').each(function() {

			var el = $(this);
			var path = (el.attrd('m') || '').replace('%', 'jctmp.');
			var arr = path.split('.');
			var p = '';

			var obj = el.data('data-m');

			keys_unique[path] = true;

			if (!obj) {
				obj = {};
				obj.path = path;
				obj.schema = el.attrd('m-schema');
				obj.selector = el.attr('m-selector');
				obj.element = el;
				obj.event = { type: 'init' };
				el.data('data-m', obj);
				db[obj.schema] && db[obj.schema](GET(self.path), obj.selector ? obj.element.find(obj.selector) : obj.element, obj.event);
			}

			for (var i = 0, length = arr.length; i < length; i++) {
				p += (p ? '.' : '') + arr[i];
				if (keys[p])
					keys[p].push(obj);
				else
					keys[p] = [obj];
			}
		});

		Object.keys(keys_unique).forEach(function(key) {
			self.autobind(key, GET(key));
		});

		return self;
	};
});