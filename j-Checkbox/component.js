COMPONENT('checkbox', function() {

	var self = this;
	var input;
	var isRequired = self.attr('data-required') === 'true';

	self.validate = function(value) {
		var type = typeof(value);
		if (input.prop('disabled') || !isRequired)
			return true;
		value = type === 'undefined' || type === 'object' ? '' : value.toString();
		return value === 'true' || value === 'on';
	};

	self.required = function(value) {
		self.find('span').toggleClass('ui-checkbox-label-required', value === true);
		isRequired = value;
		return self;
	};

	!isRequired && self.noValid();

	self.make = function() {
		self.classes('ui-checkbox');
		self.html('<label><input type="checkbox" data-jc-bind="" /><span{1}>{0}</span></label>'.format(self.html(), isRequired ? ' class="ui-checkbox-label-required"' : ''));
		input = self.find('input');
	};
});