COMPONENT('ajaxloading', function(self) {

	var pattern;

	self.readonly();

	self.make = function() {
		self.aclass('ui-ajaxloading');
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'url':
				pattern = new RegExp(value);
				break;
			case 'label':
				self.html(value);
				break;
		}
	};

	self.apply = function(type, url) {
		if (pattern && pattern.test(url)) {
			if (type === 'req')
				self.rclass('hidden');
			else
				self.aclass('hidden', 300);
		}
	};

	self.init = function() {
		ON('request', function(req) {
			SETTER('ajaxloading', 'apply', 'req', req.url);
		});
		ON('response', function(res) {
			SETTER('ajaxloading', 'apply', 'res', res.url);
		});
	};
});