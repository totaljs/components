COMPONENT('expander', function(self, config) {

	self.readonly();

	self.toggle = function(v) {

		if (v == null)
			v = !self.hclass('ui-expander-expanded');

		self.tclass('ui-expander-expanded', v);
		var fa = self.find('.ui-expander-button').find('.fa');
		fa.tclass('fa-angle-double-down', !v);
		fa.tclass('fa-angle-double-up', v);
	};

	self.make = function() {
		self.aclass('ui-expander' + (config.expand ? ' ui-expander-expanded' : ''));
		self.element.wrapInner('<div class="ui-expander-container"></div>');
		self.append('<div class="ui-expander-fade"></div><div class="ui-expander-button"><span class="fa fa-angle-double-down"></span></div>');
		self.event('click', '.ui-expander-button', function() {
			self.toggle();
		});
	};
});