COMPONENT('notifications', 'timeout:8000', function(self, config) {

	var autoclosing;
	var system = false;
	var N = window.Notification;

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();
	self.template = Tangular.compile('<div class="ui-notification" data-id="{{ id }}" style="border-left-color:{{ color }}{{ if callback }};cursor:pointer{{ fi }}"><i class="ti ti-times-circle"></i><div class="ui-notification-message"><div class="ui-notification-icon"><i class="ti {{ icon }}" style="color:{{ color }}"></i></div><div class="ui-notification-datetime">{{ date | format(\'{0}\') }}</div>{{ message | raw }}</div></div>'.format(config.date || 'yyyy-MM-dd HH:mm'));
	self.items = {};

	self.make = function() {

		self.aclass('ui-notification-container');

		self.event('click', '.ti-times-circle', function() {
			var el = $(this).closest('.ui-notification');
			self.close(+el.attr('data-id'));
			clearTimeout(autoclosing);
			autoclosing = null;
			self.autoclose();
		});

		self.event('click', 'a,button', function(e) {
			e.stopPropagation();
		});

		self.event('click', '.ui-notification', function() {
			var el = $(this);
			var id = +el.attr('data-id');
			var obj = self.items[id];
			if (!obj || !obj.callback)
				return;
			obj.callback();
			self.close(id);
		});

		if (config.native === true && N) {
			system = N.permission === 'granted';
			!system && N.requestPermission(function (permission) {
				system = permission === 'granted';
			});
		}
	};

	self.close = function(id) {
		var obj = self.items[id];
		if (!obj)
			return;
		obj.callback = null;

		if (obj.system) {
			obj.system.onclick = null;
			obj.system.close();
			obj.system = null;
		}

		delete self.items[id];
		var item = self.find('div[data-id="{0}"]'.format(id));
		item.addClass('ui-notification-hide');
		setTimeout(function() {
			item.remove();
		}, 600);
	};

	self.append = function(icon, message, date, callback, color) {
		if (icon && icon.substring(0, 3) !== 'ti-')
			icon = 'ti-' + icon;

		if (typeof(date) === 'function') {
			color = callback;
			callback = date;
			date = null;
		}

		var obj = { id: Math.floor(Math.random() * 100000), icon: icon || 'ti-info-circle', message: message, date: date || new Date(), callback: callback, color: color || 'black' };
		var focus = document.hasFocus();

		self.items[obj.id] = obj;

		if (!system || focus)
			self.element.append(self.template(obj));

		self.autoclose();

		if (!system || focus)
			return;

		obj.system = new N(message.replace(/(<([^>]+)>)/ig, ''));
		obj.system.onclick = function() {

			if (obj.callback) {
				obj.callback();
				obj.callback = null;
			}

			obj.system.close();
			obj.system.onclick = null;
			obj.system = null;
		};
	};

	self.autoclose = function() {

		if (autoclosing)
			return self;

		autoclosing = setTimeout(function() {
			clearTimeout(autoclosing);
			autoclosing = null;
			var el = self.find('.ui-notification');
			el.length > 1 && self.autoclose();
			el.length && self.close(+el.eq(0).attr('data-id'));
		}, config.timeout);
	};
});