COMPONENT('clipboard', function(self, config, cls) {

	var container;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.make = function() {
		if (navigator.clipboard && W.isSecureContext && window.self === window.top) {
			self.copy = function(value) {
				navigator.clipboard.writeText(value).catch(err => console.error(err));
				config.oncopy && self.EXEC(config.oncopy, value);
			};
		} else {
			var id = 'clipboard' + self.id;
			$(document.body).append('<textarea id="{0}" class="{1}"></textarea>'.format(id, cls));
			container = $('#' + id);
			self.copy = function(value) {
				container.val(value);
				container.focus();
				container.select();
				document.execCommand('copy');
				container.blur();
				config.oncopy && self.EXEC(config.oncopy, value);
			};
		}
	};

	self.setter = function(value) {
		value && self.copy(value);
	};
});