COMPONENT('banners', function() {
	var self = this;
	var cls = self.attr('data-class-hidden');
	var divs, nav, interval, indexer = 0;

	self.readonly();

	self.make = function() {
		self.element.wrapInner('<div />');
		self.classes('ui-banners');

		interval = setInterval(function() {
			self.show();
		}, (self.attr('data-interval') || '3000').parseInt());

		divs = self.find('div > div');
		divs.addClass(cls);
		divs.eq(0).removeClass(cls);

		var builder = [];
		for (var i = 0, length = divs.length; i < length; i++)
			builder.push('<li><i class="fa fa-circle-o"></i></li>');

		self.append('<img src="{0}" class="img-responsive" alt="" /><ul>{1}</ul>'.format(self.attr('data-empty'), builder.join('')));
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

		divs.filter(':visible').addClass(cls);
		divs.eq(index).removeClass(cls);
		self.button(index);
	};

	self.button = function(index) {
		nav.find('.fa-circle').removeClass('fa-circle').addClass('fa-circle-o');
		nav.eq(index).find('i').removeClass('fa-circle-o').addClass('fa-circle');
	};
});