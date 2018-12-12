COMPONENT('tagger', 'text:name', function(self, config) {

	self.bindvisible();
	self.nocompile && self.nocompile();

	var obj = VBINDARRAY('<div class="ui-tagger-item"><i class="fa fa-times"></i><span data-bind=".{0}__text:value__title:value"></span></div>'.format(config.text), self);

	self.make = function() {

		self.aclass('ui-tagger');
		config.fullwidth && self.aclass('ui-tagger-fullwidth');

		self.event('click', 'i', function() {
			var el = $(this);
			var index = el.vbind().index;
			self.get().splice(index, 1);
			self.refresh();
			self.change();
		});
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'fullwidth':
				if (!init || value)
					self.tclass('ui-tagger-fullwidth', !!value);
				break;
		}
	};

	self.setter = function(value) {
		obj.set(value);
	};

});