COMPONENT('rating', function(self, config, cls) {

	var iok = 'ti-star-alt';
	var ino = 'ti-star-alt';

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		var builder = [];
		for (var i = 0; i < 5; i++)
			builder.push('<i class="ti {0}"></i>'.format(ino));
		self.aclass(cls);
		self.html('{0}<div>{1}</div>'.format(self.html(), builder.join('')));
		self.event('click', 'i', function() {
			!config.disabled && self.set($(this).index() + 1);
		});
	};

	self.setter = function(value) {
		var index = (value > 0 ? value >> 0 : 0);
		self.find('i').each(function(counter) {
			var el = $(this);
			var is = counter < index;
			if (is)
				el.rclass(ino).aclass(iok);
			else
				el.rclass(iok).aclass(ino);
			el.tclass(cls + '-selected', is);
		});
	};
});