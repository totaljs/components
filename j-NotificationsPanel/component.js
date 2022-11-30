COMPONENT('notificationspanel', 'top:0;visibleY:1;title:Notifications;autoremove:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, scrollbar, elclear, items;

	self.nocompile();
	self.singleton();

	self.make = function() {
		var scr = self.find('script');
		self.aclass(cls + ' hidden');
		self.template = Tangular.compile('<div class="{0}-item" data-index="{{ index }}">{1}</div>'.format(cls, scr.html().trim()));
		self.html('<div class="{0}-header"><span class="{0}-close"><i class="ti ti-caret-square-down"></i></span><i class="ti ti-trash {0}-clear"></i><span>{1}</span></div><div class="{0}-container"><div class="{0}-items"></div></div>'.format(cls, config.title));
		scrollbar = SCROLLBAR(self.find(cls2 + '-container'), { visibleY: config.visibleY, parent: self.element });
		container = self.find('.ui-scrollbar-body');
		self.scrolltop = scrollbar.scrollTop;
		self.scrollbottom = scrollbar.scrollBottom;
		elclear = self.find(cls2 + '-clear');
		elclear.on('click', self.clear);
		self.event('click', cls2 + '-item', function() {
			var el = $(this);
			config.click && self.EXEC(config.click, items[+el.attrd('index')], el);
			if (config.autoremove) {
				el.remove();
				elclear.tclass('hidden', !container.find(cls2 + '-item').length);
			}
		});

		self.event('click', cls2 + '-close', function() {
			self.set(!self.get());
		});

		self.on('resize2', self.resize);
		self.resize();
	};

	self.resizeforce = function() {
		var css = {};
		css.height = WH;
		css.top = config.top;
		self.css(css);
		delete css.top;
		var content = self.find(cls2 + '-container');
		css.height = css.height - content.offset().top;
		content.css(css);
		scrollbar.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.render = function(value) {

		if (!value)
			value = EMPTYARRAY;

		items = value;
		var builder = [];
		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			item.index = i;
			builder.push(self.template(item));
		}

		container.html(builder.join(''));
		elclear.tclass('hidden', !builder.length);
		builder.length && self.resize();
	};

	self.clear = function() {
		container.empty();
		elclear.aclass('hidden');
	};

	self.setter = function(value) {
		if (value) {
			self.EXEC(config.exec, function(value) {
				self.rclass('hidden');
				self.render(value);
			});
		} else
			self.aclass('hidden');
	};

});