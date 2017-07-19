COMPONENT('recaptcha', function(self) {

	var isRequired = self.attrd('required') === 'true';

	self.getter = null;

	self.validate = function(value) {
		return !isRequired || (value && value.length > 300);
	};

	!isRequired && self.noValid();

	self.make = function() {
		WAIT(function() {
			return window.grecaptcha ? true : false;
		}, function(err, again) {
			if (err)
				return again(100);
			grecaptcha.render(self.element.get(0), { sitekey: self.attrd('key'), theme: self.attrd('theme') || 'light', callback: function(response) {
				self.set(response);
				self.change(true);
			}});
		});
	};
});