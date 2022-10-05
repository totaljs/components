COMPONENT('unsaved', 'message:Changes that you made may not be saved.', function(self, config) {

	self.singleton();
	self.readonly();

	self.make = function() {

		var makemessage = function(val) {
			return typeof(val) === 'string' ? val : config.message;
		};

		W.onbeforeunload = function() {

			var val = self.get();
			if (val) {
				return makemessage(val);
			} else if (config.check) {

				var index = config.check.indexOf('/');
				var fn;

				if (index === -1)
					fn = self.get(config.check);
				else {
					var arr = config.check.split('/').trim();
					var tmp = PLUGINS[arr[0]];
					if (tmp)
						fn = tmp[arr[1]];
				}

				if (fn) {
					var msg = fn();
					if (msg)
						return makemessage(msg);
				}
			}
		};
	};

	self.destroy = function() {
		W.onbeforeunload = null;
	};

});