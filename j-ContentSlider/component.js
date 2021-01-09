COMPONENT('contentslider', 'interval:3000;selector:a', function(self, config, cls) {

	var cssv = cls + '-item-visible';
	var cssi = cls + '-item';
	var cssp = cls + '-pagination';
	var css = { 'min-height': 0 };
	var container;
	var length = 0;
	var cacheid;
	var interval;

	self.nocompile && self.nocompile();
	self.readonly();
	self.blind();

	self.make = function() {

		self.aclass(cls);
		self.element.wrapInner('<div class="ui-contentslider-items" />');
		self.find(config.selector).wrap('<div class="{0}" />'.format(cssi));
		self.append('<div class="{0}" />'.format(cssp));
		self.refresh();
		container = self.find('.ui-contentslider-items');

		var id = config.cache;
		var indexer = 0;

		if (id) {
			cacheid = 'contentslider' + id;
			indexer = CACHE(cacheid) || 0;
		}

		self.rclass('hidden');
		self.show(indexer++);

		self.event('click', '.fa', function() {
			clearInterval(interval);
			self.show($(this).attrd('index').parseInt());
		});

		interval = setInterval(function() {
			if (!document.hasFocus())
				return;
			self.show(indexer++);
			if (indexer > length)
				indexer = 0;
		}, config.interval);
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
		current.rclass(cssv);
		next.aclass(cssv);
		css['min-height'] = next.height();
		container.css(css);
		self.find('.' + cssp + '-selected').rclass(cssp + '-selected');
		self.find('.' + cssp).find('i').eq(index).aclass(cssp + '-selected');
		cacheid && CACHE(cacheid, index, '1 day');
	};
});