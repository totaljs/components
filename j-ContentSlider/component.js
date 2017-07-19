COMPONENT('contentslider', function() {

	var self = this;
	var cssv = 'ui-contentslider-item-visible';
	var cssi = 'ui-contentslider-item';
	var cssp = 'ui-contentslider-pagination';
	var css = { 'min-height': 0 };
	var container;
	var length = 0;
	var cacheid;
	var interval;

	self.readonly();
	self.blind();

	self.make = function() {

		self.aclass('ui-contentslider');
		self.element.wrapInner('<div class="ui-contentslider-items" />');
		self.find(self.attrd('selector')).wrap('<div class="{0}" />'.format(cssi));
		self.append('<div class="{0}" />'.format(cssp));
		self.refresh();
		container = self.find('.ui-contentslider-items');

		var id = self.attr('data-id');
		var indexer = 0;

		if (id) {
			cacheid = 'contentslider' + id;
			indexer = CACHE(cacheid) || 0;
		}

		self.rclass('hidden');
		self.show(indexer++);

		self.event('click', '.fa', function() {
			clearInterval(interval);
			self.show($(this).attr('data-index').parseInt());
		});

		interval = setInterval(function() {
			if (!document.hasFocus())
				return;
			self.show(indexer++);
			if (indexer > length)
				indexer = 0;
		}, +(self.attr+('interval') || '3000'));
	};

	self.refresh = function(noredraw) {
		length = self.find('.' + cssi).length;
		var builder = '';
		for (var i = 0; i < length; i++)
			builder += '<i class="fa fa-circle" data-index="{0}"></i>'.format(i);
		noredraw !== true && self.find('.' + cssp).empty().html(builder);
	};

	self.show = function(index) {

		if (index >= length)
			index = 0;
		else if (index < 0)
			index = 0;

		var current = self.find('.' + cssv);
		var next = self.find('.' + cssi).eq(index);
		current.removeClass(cssv);
		next.addClass(cssv);
		css['min-height'] = next.height();
		container.css(css);
		self.find('.' + cssp + '-selected').removeClass(cssp + '-selected');
		self.find('.' + cssp).find('i').eq(index).addClass(cssp + '-selected');
		cacheid && CACHE(cacheid, index, '1 day');
	};
});