COMPONENT('nativenotifications', 'timeout:8000', function(self, config) {

	var autoclosing;
	var system = false;
	var N = W.Notification;

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();
	self.items = [];

	self.make = function() {
		if (!N)
			return;
		system = N.permission === 'granted';
		!system && N.requestPermission(function (permission) {
			system = permission === 'granted';
		});
	};

	self.show = self.append = function(title, message, callback, img) {

		if (!system || !self.get())
			return;

		var obj = { id: Math.floor(Math.random() * 100000), date: new Date(), callback: callback };
		var options = {};

		options.body = message.replace(/(<([^>]+)>)/ig, '');
		self.items.push(obj);

		self.autoclose();

		if (img === undefined)
			options.icon = config.icon || '/icon.png';
		else if (img != null)
			options.icon = img;

		obj.system = new N(title, options);
		obj.system.onclick = function() {

			W.focus();
			self.items = self.items.remove('id', obj.id);

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
			var obj = self.items.shift();
			if (obj) {
				obj.system.onclick = null;
				obj.system.close();
				obj.system = null;
			}
			self.items.length && self.autoclose();
		}, config.timeout);
	};
});