COMPONENT('intro', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container = 'intro' + GUID(4);
	var content, figures, buttons, button = null;
	var index = 0;
	var visible = false;

	self.readonly();

	self.make = function() {
		$(document.body).append('<div id="{0}" class="hidden {1}"><div class="{1}-body"></div></div>'.format(container, cls));
		content = self.element;
		container = $('#' + container);
		content.rclass('hidden');
		var body = container.find(cls2 + '-body');
		body[0].appendChild(self.element[0]);
		self.replace(container);
		content.aclass('ui-intro-figures');
		figures = content.find('figure');
		var items = [];

		figures.each(function(index) {
			items.push('<i class="fa fa-circle {0}-button" data-index="{1}"></i>'.format(cls, index));
		});

		body.append('<div class="{0}-pagination"><button name="next"></button>{1}</div>'.format(cls, items.join('')));
		buttons = self.find(cls2 + '-button');
		button = self.find(cls2 + '-pagination').find('button');

		self.event('click', 'button[name="next"]', function() {
			index++;
			if (index >= figures.length) {
				self.set('');
				config.exec && EXEC(config.exec);
				config.remove && self.remove();
			} else {
				self.move(index);
				config.page && EXEC(config.page, index);
			}
		});

		self.event('click', 'button[name="close"]', function() {
			self.set('');
			config.exec && EXEC(config.exec, true);
			config.remove && self.remove();
		});

		self.event('click', cls2 + '-button', function() {
			self.move(+this.getAttribute('data-index'));
		});
	};

	self.move = function(indexer) {
		figures.filter('.visible').rclass('visible');
		buttons.filter('.selected').rclass('selected');
		figures.eq(indexer).aclass('visible');
		buttons.eq(indexer).aclass('selected');
		button.html(indexer < buttons.length - 1 ? ((config.next || 'Next') + '<i class="fa fa-chevron-right"></i>') : (config.close || 'Done'));
		index = indexer;
		return self;
	};

	self.setter = function(value) {
		var is = value == config.if;
		if (is === visible)
			return;
		index = 0;
		self.move(0);
		visible = is;
		self.tclass('hidden', !is);
		setTimeout(function() {
			self.find(cls2 + '-body').tclass(cls + '-body-visible', is);
		}, 100);
	};
});