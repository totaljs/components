/**
 * Checkbox
 * @version 2.0.0
 */
COMPONENT('checkbox', function() {

	var self = this;
	var input;
	var isRequired = self.attr('data-required') === 'true';

	self.validate = function(value) {
		var type = typeof(value);
		if (input.prop('disabled') || !isRequired)
			return true;

		if (type === 'undefined' || type === 'object')
			value = '';
		else
			value = value.toString();

		return value === 'true' || value === 'on';
	};

	self.required = function(value) {
		self.find('span').toggleClass('ui-checkbox-label-requir', value === true);
		isRequired = value;
		return self;
	};

	!required && self.noValid();

	self.make = function() {
		self.element.addClass('ui-checkbox');
		self.html('<label><input type="checkbox" data-component-bind="" /><span{1}>{0}</span></label>'.format(self.html(), isRequired ? ' class="ui-checkbox-label-required"' : ''));
		input = self.find('input');
	};
});