COMPONENT('info', function(self) {

	var is = false;
	var orient = { left: '' };
	var timeout, container, arrow;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.make = function() {

		self.aclass('ui-info');
		self.append('<span class="ui-info-arrow fa fa-caret-up"></span><div class="ui-info-body"></div>');
		container = self.find('.ui-info-body');
		arrow = self.find('.ui-info-arrow');

		$(document).on('touchstart mousedown', function() {
			self.hide();
		});
	};

	self.show = function(orientation, target, body) {

		if (is) {
			clearTimeout(timeout);
			var obj = target instanceof jQuery ? target[0] : target;
			if (self.target === obj)
				return self.hide(0);
		}

		target = $(target);

		if (!body)
			return self.hide(0);

		container.html(body);

		var offset = target.offset();

		switch (orientation) {
			case 'left':
				orient.left = '15px';
				break;
			case 'right':
				orient.left = '210px';
				break;
			case 'center':
				orient.left = '107px';
				break;
		}

		arrow.css(orient);

		var options = SINGLETON('ui-info');
		options.left = orientation === 'center' ? Math.ceil((offset.left - self.element.width() / 2) + (target.innerWidth() / 2)) : orientation === 'left' ? offset.left - 8 : (offset.left - self.element.width()) + target.innerWidth();
		options.top = offset.top + target.innerHeight() + 10;
		self.element.css(options);

		if (is)
			return;

		self.element.show();

		setTimeout(function() {
			self.aclass('ui-info-visible');
		}, 100);

		is = true;
	};

	self.hide = function(sleep) {
		if (!is)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.element.hide().removeClass('ui-info-visible');
			self.target = null;
			is = false;
		}, sleep ? sleep : 100);
	};
});