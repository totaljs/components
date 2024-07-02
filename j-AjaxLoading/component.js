COMPONENT('ajaxloading', 'icon:true', function(self) {

	var pattern, html;

	self.readonly();

	self.make = function() {
		self.aclass('ui-ajaxloading hidden');
		html = self.html();
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'url':
				pattern = new RegExp(value);
				break;
			case 'label':
				html = value;
				self.html(value);
				break;
			case 'icon':
				self.html((value ? '<i class="ti ti-spinner ti-pulse"></i>' : '') + html);
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
			SETTER('ajaxloading/apply', 'req', req.url);
		});
		ON('response', function(res) {
			SETTER('ajaxloading/apply', 'res', res.url);
		});
	};
});
