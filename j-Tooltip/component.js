COMPONENT('tooltip', function(self) {

	var container;
	var css = {};
	var anim = {};
	var body;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-tooltip hidden');
		self.html('<div></div>');
		container = $(self.find('div')[0]);
	};

	self.hide = function() {
		setTimeout2(self.id, function() {
			self.toggle('hidden', true);
		}, 100);
	};

	// show(el, body, width, offX, offY)
	// show(x, y, body, width)
	self.show = function() {

		clearTimeout2(self.id);

		if (typeof(arguments[0]) !== 'number') {
			var target = $(arguments[0]);
			var off = target.offset();
			body = arguments[1] || '';
			css.width = arguments[2] || 140;
			css.top = off.top + target.height() + (arguments[4] || 0);
			css.left = (off.left - ((css.width / 2) - (target.width() / 2))) + (arguments[3] || 0);
		} else {
			css.left = arguments[0] || 0;
			css.top = arguments[1] || 0;
			body = arguments[2] || '';
			css.width = arguments[3] || 140;
		}

		if (body.substring(0, 1) !== '<')
			body = '<div class="ui-tooltip-arrow"><span class="fa fa-caret-up"></span></div><div class="ui-tooltip-body">{0}</div>'.format(body);

		container.html(body);
		var el = self.element;

		if (el.hclass('hidden')) {
			anim.top = css.top;
			css.top += 20;
			el.css(css).rclass('hidden').animate(anim, 100);
		} else
			el.css(css);
	};

});