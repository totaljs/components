/**
 * Disable
 * @version 1.0.0
 */
COMPONENT('disable', function() {
	var self = this;
	var condition = self.attr('data-if');
	var selector = self.attr('data-selector') || 'input,texarea,select';
	var validate = self.attr('data-validate');

	if (validate)
		validate = validate.split(',').trim();

	self.readonly();

	self.setter = function(value) {
		var is = true;

		if (condition)
			is = EVALUATE(self.path, condition);
		else
			is = value ? false : true;

		self.find(selector).each(function() {
			var el = $(this);
			var tag = el.get(0).tagName;
			if (tag === 'INPUT' || tag === 'SELECT') {
				el.prop('disabled', is);
				el.parent().toggleClass('ui-disabled', is);
				return;
			}
			el.toggleClass('ui-disabled', is);
		});

		validate && validate.forEach(function(key) { jC.reset(key); });
	};

	self.state = function(type) {
		self.update();
	};
});