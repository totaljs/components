COMPONENT('rating', function(self) {

	var iok = 'fa-star';
	var ino = 'fa-star-o';

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		var builder = [];
		for (var i = 0; i < 5; i++)
			builder.push('<i class="fa {0}"></i>'.format(ino));

		self.aclass('ui-rating');
		self.html('{0}<div>{1}</div>'.format(self.html(), builder.join('')));
		self.event('click', '.fa', function() {
			!self.disabled && self.set($(this).index() + 1);
		});
	};

	self.setter = function(value) {
		var index = (value > 0 ? value >> 0 : 0) - 1;
		self.find('.fa').each(function(counter) {
			var el = $(this);
			if (counter > index)
				el.rclass(iok).aclass(ino);
			else
				el.rclass(ino).aclass(iok);
		});
	};
});