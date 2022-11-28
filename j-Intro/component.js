COMPONENT('intro', 'closebutton:0;width:400;height:300;nexticon:ti ti-chevron-right;doneicon:ti ti-check-circle;delay:500', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container = 'intro' + GUID(4);
	var content, figures, buttons, button = null;
	var index = 0;
	var visible = false;
	var body;

	self.readonly();

	self.hide = function() {
		if (visible) {
			self.set('');
			config.exec && self.EXEC(config.exec, true);
			config.remove && self.remove();
		}
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {1}"><div class="{1}-body" style="max-width:{2}px;height:{3}px;top:{4}px"></div></div>'.format(container, cls, config.width, config.height, (WH / 2 >> 0) - config.height / 2 >> 0));
		content = self.element;
		container = $('#' + container);
		content.rclass('hidden');
		body = container.find(cls2 + '-body');
		body[0].appendChild(self.element[0]);
		self.replace(container);
		content.aclass(cls + '-figures');
		figures = content.find('figure');
		var items = [];

		figures.each(function(index) {
			items.push('<i class="ti ti-circle {0}-button" data-index="{1}"></i>'.format(cls, index));
		});

		if (config.closebutton) {
			body.prepend('<span><i class="ti ti-times"></i></span>');
			body.find('span').on('click', self.hide);
		}

		body.append('<div class="{0}-pagination"><button name="next"></button>{1}</div>'.format(cls, items.join('')));
		buttons = self.find(cls2 + '-button');
		button = self.find(cls2 + '-pagination').find('button');

		self.event('click', 'button[name="next"],.next', function() {

			if (config.delay && BLOCKED(self.ID, config.delay))
				return;

			index++;
			if (index >= figures.length) {
				self.set('');
				config.exec && self.EXEC(config.exec);
				config.remove && self.remove();
			} else {
				self.move(index);
				config.page && self.EXEC(config.page, index);
			}
		});

		self.event('click', 'button[name="close"],.close', self.hide);
		self.event('click', cls2 + '-button', function() {
			self.move(+$(this).attrd('index'));
		});

		self.on('resize2', self.resize);
		self.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {

		if (!visible)
			return;

		var css = {};
		var footer = self.find(cls2 + '-pagination').innerHeight();

		css.top = (WH / 2 >> 0) - (config.height + footer) / 2 >> 0;

		if (WIDTH() === 'xs') {
			css['max-width'] = 'auto';
			css.width = '86%';
		} else
			css.width = '';

		css.height = config.height + footer;
		body.css(css);
		figures.css('height', config.height);
	};

	self.move = function(indexer) {
		figures.filter('.visible').rclass('visible');
		buttons.filter('.selected').rclass('selected');
		figures.eq(indexer).aclass('visible');
		buttons.eq(indexer).aclass('selected');
		var isnext = indexer < buttons.length - 1;
		button.html(isnext ? ((config.next || 'Next') + '<i class="{0}"></i>'.format(config.nexticon)) : ('<i class="{0}"></i>'.format(config.doneicon) + (config.close || 'Done')));
		button.tclass('next', isnext);
		button.tclass('done', !isnext);
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
		self.resizeforce();
		setTimeout(function() {
			self.find(cls2 + '-body').tclass(cls + '-body-visible', is);
		}, 200);
	};
});