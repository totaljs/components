COMPONENT('recaptcha', function() {

	var self = this;
	var isRequired = self.attr('data-required') === 'true';

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
			grecaptcha.render(self.element.get(0), { sitekey: self.attr('data-key'), theme: self.attr('data-theme') || 'light', callback: function(response) {
				self.set(response);
				self.change(true);
			}});
		});
	};
});