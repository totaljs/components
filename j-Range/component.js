COMPONENT('range', function() {
	var self = this;
	var required = self.attr('data-required');

	self.noValid();

	self.make = function() {
		var name = self.html();
		if (name)
			name = '<div class="ui-range-label{1}">{0}:</div>'.format(name, required ? ' ui-range-label-required' : '');
		var attrs = [];
		attrs.attr('step', self.attr('data-step'));
		attrs.attr('max', self.attr('data-max'));
		attrs.attr('min', self.attr('data-min'));
		self.classes('ui-range');
		self.html('{0}<input type="range" data-jc-bind=""{1} />'.format(name, attrs.length ? ' ' + attrs.join(' ') : ''));
	};
});