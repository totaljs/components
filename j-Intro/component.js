COMPONENT('intro', function(self, config) {

	var container = 'intro' + GUID(4);
	var condition, content, figures, buttons, button = null;
	var index = 0;
	var visible = false;

	self.readonly();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'if':
				condition = FN(config.if);
				break;
		}
	};

	self.make = function() {
		condition = FN(config.if);
		$(document.body).append('<div id="{0}" class="hidden ui-intro"><div class="ui-intro-body"></div></div>'.format(container));
		content = self.element;
		container = $('#' + container);
		content.rclass('hidden');
		var body = container.find('.ui-intro-body');
		body[0].appendChild(self.element[0]);
		self.replace(container);
		content.aclass('ui-intro-figures');
		figures = content.find('figure');
		var items = [];

		figures.each(function(index) {
			items.push('<i class="fa fa-circle ui-intro-button" data-index="{0}"></i>'.format(index));
		});

		body.append('<div class="ui-intro-pagination"><button name="next"></button>{0}</div>'.format(items.join('')));
		buttons = self.find('.ui-intro-button');
		button = self.find('.ui-intro-pagination').find('button');

		self.event('click', 'button[name="next"]', function() {
			index++;
			if (index >= figures.length)
				self.set('');
			else
				self.move(index);
		});

		self.event('click', 'button[name="close"]', function() {
			self.set('');
		});

		self.event('click', '.ui-intro-button', function() {
			self.move(+this.getAttribute('data-index'));
		});

		self.move(0);
	};

	self.move = function(index) {
		figures.filter('.visible').rclass('visible');
		buttons.filter('.selected').rclass('selected');
		figures.eq(index).aclass('visible');
		buttons.eq(index).aclass('selected');
		button.html(index < buttons.length - 1 ? ((config.next || 'Next') + '<i class="fa fa-chevron-right"></i>') : (config.close || 'Done'));
		return self;
	};

	self.setter = function(value) {
		var is = condition(value);
		if (is === visible)
			return;
		visible = is;
		self.tclass('hidden', !is);
		setTimeout(function() {
			self.find('.ui-intro-body').tclass('ui-intro-body-visible', is);
		}, 100);
	};
});