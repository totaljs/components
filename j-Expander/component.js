COMPONENT('expander', function() {
	var self = this;
	self.readonly();

	self.toggle = function(v) {

		if (v === undefined)
			v = !self.element.hasClass('ui-expander-expanded');

		self.element.toggleClass('ui-expander-expanded', v);
		var fa = self.find('.ui-expander-button').find('.fa');
		fa.toggleClass('fa-angle-double-down', !v);
		fa.toggleClass('fa-angle-double-up', v);
	};

	self.make = function() {
		self.classes('ui-expander' + (self.attr('data-expand') === 'true' ? ' ui-expander-expanded' : ''));
		self.element.wrapInner('<div class="ui-expander-container"></div>');
		self.append('<div class="ui-expander-fade"></div><div class="ui-expander-button"><span class="fa fa-angle-double-down"></span></div>');
		self.event('click', '.ui-expander-button', function() {
			self.toggle();
		});
	};
});