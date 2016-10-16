COMPONENT('expander', function() {
	var self = this;
	self.readonly();
	self.make = function() {
		self.element.addClass('ui-expander');
		self.element.wrapInner('<div class="ui-expander-container"></div>');
		self.append('<div class="ui-expander-fade"></div><div class="ui-expander-button"><span class="fa fa-angle-double-down"></span></div>');
		self.element.on('click', '.ui-expander-button,.ui-expander-fade', function() {
			self.element.toggleClass('ui-expander-expanded');
			self.element.find('.ui-expander-button').find('.fa').toggleClass('fa-angle-double-down fa-angle-double-up');
		});
	};
});