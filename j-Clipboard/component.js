COMPONENT('clipboard', function(self) {

	var container;

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		var id = 'clipboard' + self.id;
		$(document.body).append('<textarea id="{0}" class="ui-clipboard"></textarea>'.format(id));
		container = $('#' + id);

		if (navigator.clipboard && window.isSecureContext) {
			self.copy = function(value) {
				navigator.clipboard.writeText(value).catch(err => console.error(err));
			};
		} else {
			self.copy = function(value) {
				container.val(value);
				container.focus();
				container.select();
				document.execCommand('copy');
				container.blur();
			};
		}
	};

	self.setter = function(value) {
		value && self.copy(value);
	};
});