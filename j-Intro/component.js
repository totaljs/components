COMPONENT('intro', function(self) {

	var container = 'intro' + GUID(4);
	var condition, content, figures, buttons, button;
	var index = 0;
	var visible = false;

	self.readonly();
	self.make = function() {
		condition = FN(self.attrd('if'));
		$(document.body).append('<div id="{0}" class="hidden ui-intro"><div class="ui-intro-body"></div></div>'.format(container));
		content = self.element;
		container = $('#' + container);
		content.removeClass('hidden');
		var body = container.find('.ui-intro-body');
		body.get(0).appendChild(self.element.get(0));
		self.replace(container);
		content.addClass('ui-intro-figures');
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
		figures.filter('.visible').removeClass('visible');
		buttons.filter('.selected').removeClass('selected');
		figures.eq(index).addClass('visible');
		buttons.eq(index).addClass('selected');
		button.html(index < buttons.length - 1 ? ((self.attrd('next') || 'Next') + '<i class="fa fa-chevron-right"></i>') : (self.attrd('close') || 'Done'));
		return self;
	};

	self.setter = function(value) {
		var is = condition(value);
		if (is === visible)
			return;
		visible = is;
		self.toggle('hidden', !is);
		setTimeout(function() {
			self.find('.ui-intro-body').toggleClass('ui-intro-body-visible', is);
		}, 100);
	};
});