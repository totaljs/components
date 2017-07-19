COMPONENT('disable', function(self) {

	var condition, selector, validate;

	self.readonly();

	self.make = function() {
		condition = self.attrd('if');
		selector = self.attrd('selector') || 'input,texarea,select';
		validate = self.attrd('validate');
		validate && (validate = validate.split(',').trim());
	};

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
			} else
				el.toggleClass('ui-disabled', is);
		});

		validate && validate.forEach(FN('n => MAIN.reset({0}n)'.format(self.pathscope ? '\'' + self.pathscope + '.\'+' : '')));
	};

	self.state = function() {
		self.update();
	};
});