COMPONENT('colorpicker', function(self) {

	var container = null;
	var template = '<li data-index="{0}"><i class="fa fa-circle" style="color:#{1}"></i></li>';
	var is = false;
	var opener = {};
	var css = {};
	var colors = 'ff0000,ff4000,ff8000,ffbf00,ffff00,bfff00,80ff00,40ff00,00ff00,00ff40,00ff80,00ffbf,00ffff,00bfff,0080ff,0040ff,0000ff,4000ff,8000ff,bf00ff,ff00ff,ff00bf,ff0080,ff0040,ff0000,F0F0F0,D0D0D0,AAB2BD,505050,000000'.split(',');

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-colorpicker hidden');
		self.append('<ul></ul>');
		container = self.find('ul');

		self.event('click', 'li', function() {
			var color = '#' + colors[+this.getAttribute('data-index')];
			opener.callback && opener.callback(color, opener.target);
			self.hide();
			EMIT('colorpicker', color);
		});

		self.on('reflow', self.$hide);
		self.on('resize', self.$hide);
	};

	self.$hide = function() {
		is && self.hide();
	};

	self.render = function() {
		var builder = [];
		for (var i = 0, length = colors.length; i < length; i++)
			builder.push(template.format(i, colors[i]));
		container.empty().html(builder.join(''));
	};

	self.hide = function() {
		if (is) {
			self.aclass('hidden');
			is = false;
		}
	};

	self.show = function(x, y, target, callback) {

		if (is && opener.x === x && opener.y === y) {
			opener.x = null;
			opener.y = null;
			self.hide();
			return;
		}

		if (typeof(target) === 'function') {
			callback = target;
			target = null;
		}

		opener.callback = callback;
		opener.target = target;
		opener.x = x;
		opener.y = y;

		!is && self.render();
		is = true;

		css.left = x;
		css.top = y;

		self.element.css(css).rclass('hidden');
	};
});