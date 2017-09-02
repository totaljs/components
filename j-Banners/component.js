COMPONENT('banners', function(self) {

	var cls = self.attrd('class-hidden');
	var divs, nav, interval, indexer = 0;

	self.readonly();

	self.make = function() {
		self.element.wrapInner('<div />');
		self.aclass('ui-banners');

		interval = setInterval(function() {
			self.show();
		}, +(self.attrd('interval') || '3000'));

		divs = self.find('div > div');
		divs.aclass(cls);
		divs.eq(0).rclass(cls);

		var builder = [];
		for (var i = 0, length = divs.length; i < length; i++)
			builder.push('<li><i class="fa fa-circle-o"></i></li>');

		self.append('<img src="{0}" class="img-responsive" alt="" /><ul>{1}</ul>'.format(self.attrd('empty'), builder.join('')));
		nav = self.find('li');

		self.button(indexer);

		self.event('click', '.fa', function() {
			self.show($(this).parent().index());
		});
	};

	self.show = function(index) {
		if (index !== undefined && interval)
			clearInterval(interval);
		else if (index === undefined) {
			indexer++;
			if (indexer >= divs.length)
				indexer = 0;
			index = indexer;
		}

		divs.filter(':visible').aclass(cls);
		divs.eq(index).rclass(cls);
		self.button(index);
	};

	self.button = function(index) {
		nav.find('.fa-circle').rclass('fa-circle').aclass('fa-circle-o');
		nav.eq(index).find('i').rclass('fa-circle-o').aclass('fa-circle');
	};
});