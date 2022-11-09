COMPONENT('tagger', 'text:name', function(self, config, cls) {

	// self.bindvisible();
	self.nocompile && self.nocompile();

	var obj = VBINDARRAY('<div class="{0}-item"><i class="fa fa-times"></i><span data-bind=".{1}__text__title"></span></div>'.format(cls, config.text), self);

	self.make = function() {

		self.aclass(cls);
		config.fullwidth && self.aclass(cls + '-fullwidth');

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
					self.tclass(cls + '-fullwidth', !!value);
				break;
		}
	};

	self.setter = function(value) {
		obj.set(value || EMPTYARRAY);
	};

});