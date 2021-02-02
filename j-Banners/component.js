COMPONENT('banners', 'class:ui-banners-hidden;interval:3000;icon:far fa-circle', function(self, config, cls) {

	var divs, nav, interval, indexer = 0;

	self.readonly();
	self.nocompile();

	self.destroy = function() {
		interval && clearInterval(interval);
		interval = null;
	};

	self.make = function() {
		self.element.wrapInner('<div />');
		self.aclass(cls);

		interval = setInterval(self.show, config.interval);

		divs = self.find('div > div');
		divs.aclass(config.class);
		divs.eq(0).rclass(config.class);

		var builder = [];
		for (var i = 0, length = divs.length; i < length; i++)
			builder.push('<li><i class="' + config.icon + '"></i></li>');

		self.append('<img src="{0}" class="img-responsive" alt="" /><ul>{1}</ul>'.format(config.empty, builder.join('')));
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

		divs.filter(':visible').aclass(config.class);
		divs.eq(index).rclass(config.class);
		self.button(index);
	};

	self.button = function(index) {
		nav.filter('.selected').rclass('selected');
		nav.eq(index).aclass('selected');
	};
});