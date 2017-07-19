COMPONENT('range', function(self) {

	var required = self.attrd('required');

	self.noValid();

	self.make = function() {
		var name = self.html();
		if (name)
			name = '<div class="ui-range-label{1}">{0}:</div>'.format(name, required ? ' ui-range-label-required' : '');
		var attrs = [];
		attrs.attr('step', self.attrd('step'));
		attrs.attr('max', self.attrd('max'));
		attrs.attr('min', self.attrd('min'));
		self.aclass('ui-range');
		self.html('{0}<input type="range" data-jc-bind=""{1} />'.format(name, attrs.length ? ' ' + attrs.join(' ') : ''));
	};
});