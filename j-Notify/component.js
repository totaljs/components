COMPONENT('notify', 'timeout:3000;position:top-right', function(self, config, cls) {

	var cls2 = '.' + cls;
	var istop = false;
	var autoclosing;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.template = Tangular.compile('<div class="{0} {0}-{{ type }} {0}-hidden" data-id="{{ id }}"><figure><div class="{0}-dot"></div><div class="{0}-icon"><i class="fa {{ icon }}"></i></div><div class="{0}-message">{{ message | raw }}</div></figure></div>'.format(cls));
	self.items = {};

	self.make = function() {

		self.aclass(cls + '-container');

		self.event('click', cls2, function() {
			var el = $(this);
			self.close(el.attrd('id'));
			clearTimeout(autoclosing);
			autoclosing = null;
			self.autoclose();
		});
	};

	self.configure = function(key, value) {
		if (key === 'position') {
			var c = cls + '-container-';
			self.rclass2(c).aclass(c + value.replace(/_|\s/, '-'));
			istop = value.indexOf('top') !== -1;
		}
	};

	self.close = function(id) {
		var obj = self.items[id];
		if (obj) {
			delete self.items[id];
			var item = self.find('div[data-id="{0}"]'.format(id));
			item.find('figure').empty();
			item.animate({ height: 0 }, 300, function() {
				item.remove();
			});
		}
	};

	self.response = function(message, callback, response) {

		var fn;

		if (typeof(message) === 'function') {
			response = callback;
			fn = message;
			message = null;
		} else if (typeof(callback) === 'function')
			fn = callback;
		else {
			response = callback;
			fn = null;
		}

		if (response instanceof Array) {
			var builder = [];
			for (var i = 0; i < response.length; i++) {
				var err = response[i].error;
				err && builder.push(err);
			}
			self.append(builder.join('<br />'), 2);
			SETTER('!loading/hide');
		} else if (typeof(response) === 'string') {
			self.append(response, 2);
			SETTER('!loading/hide');
		} else {

			if (message) {
				if (message.length < 40 && message.charAt(0) === '?')
					SET(message, response);
				else
					self.append(message, 1);
			}

			if (typeof(fn) === 'string')
				SET(fn, response);
			else if (fn)
				fn(response);
		}
	};

	self.warning = function(message) {
		self.append(message, 2);
	};

	self.success = function(message) {
		self.append(message, 1);
	};

	self.info = function(message) {
		self.append(message, 3);
	};

	self.append = function(message, type) {

		if (!type)
			type = 1;

		switch (type) {
			case 'success':
				type = 1;
				break;
			case 'warning':
				type = 2;
				break;
			case 'info':
				type = 3;
				break;
		}

		var icon;

		if (message.charAt(0) === '"') {
			var index = message.indexOf('"', 1);
			icon = self.faicon(message.substring(1, index).trim());
			message = message.substring(index + 1).trim();
		}

		// type 1: success
		// type 2: warning
		// type 3: info

		var obj = { id: Math.floor(Math.random() * 100000).toString(36), message: message, type: type, icon: icon || (type === 1 ? 'fa-check-circle' : type === 2 ? 'fa-times-circle' : 'fa-info-circle') };
		self.items[obj.id] = obj;
		var el = $(self.template(obj));
		if (istop)
			self.element.append(el);
		else
			self.element.prepend(el);
		self.autoclose();
		setTimeout(function() {
			el.rclass(cls + '-hidden');
		}, 20);
	};

	self.autoclose = function() {

		if (autoclosing)
			return;

		autoclosing = setTimeout(function() {
			clearTimeout(autoclosing);
			autoclosing = null;
			var el = self.find(cls2);
			el.length > 1 && self.autoclose();
			el.length && self.close(el.eq(istop ? 0 : (el.length - 1)).attrd('id'));
		}, config.timeout);

	};
});