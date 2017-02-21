COMPONENT('disable', function() {
	var self = this;
	var condition;
	var selector;
	var validate;

	self.readonly();

	self.make = function() {
		condition = self.attr('data-if');
		selector = self.attr('data-selector') || 'input,texarea,select';
		validate = self.attr('data-validate');
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

		validate && validate.forEach(FN('n => jC.reset({0}n)'.format(self.pathscope ? '\'' + self.pathscope + '.\'+' : '')));
	};

	self.state = function(type) {
		self.update();
	};
});