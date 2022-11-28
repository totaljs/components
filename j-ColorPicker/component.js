COMPONENT('colorpicker', function(self, config, cls) {

	var cls2 = '.' + cls;
	var is = false;
	var events = {};
	var colors = [['', 'E73323', 'EC8632', 'FFFD54', '68B25B', '7CFBFD', '4285F4', 'E73CF7', 'E8357E', '73197B', '91683C', '808080'],['FFFFFF', 'E8E8E8', 'D1D1D1', 'B9B9B9', 'A2A2A2', '8B8B8B', '747474', '5D5D5D', '464646', '2E2E2E', '171717', '000000'],['5C0E07', '5E350F', '66651C', '41641A', '2D6419', '2D6438', '2D6465', '133363', '000662', '2D0962', '5C1262', '5C0F32', '8A1A11', '8E501B', '99982F', '62962B', '47962A', '479654', '479798', '214D94', '010E93', '451393', '8A2094', '8A1C4C', 'B9261A', 'BD6B27', 'CCCB41', '83C83C', '61C83B', '61C871', '62C9CA', '2E67C5', '0216C4', '5C1DC4', 'B92EC5', 'B92865', 'E73323', 'EC8632', 'FFFD54', 'A4FB4E', '7BFA4C', '7BFA8D', '7CFBFD', '3B80F7', '041EF5', '7327F5', 'E73CF7', 'E7357F', 'E8483F', 'EF9D4B', 'FFFE61', 'B4FB5C', '83FA5A', '83FAA2', '83FBFD', '5599F8', '343CF5', '8C42F6', 'E84FF7', 'E84A97', 'EA706B', 'F2B573', 'FFFE7E', 'C5FC7C', '96FA7A', '96FBB9', '96FCFD', '7BB2F9', '666AF6', 'A76EF7', 'EB73F8', 'EA71B0', 'F6CECD', 'FAE6CF', 'FFFED1', 'EBFED1', 'D7FDD0', 'D7FDE7', 'D8FEFE', 'D1E5FD', 'CCCDFB', 'E1CEFB', 'F6CFFC', 'F6CEE4']];

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile();

	self.make = function() {

		var html = '';
		for (var i = 0; i < colors.length; i++) {
			html += '<div>';
			for (var j = 0; j < colors[i].length; j++) {
				var color = colors[i][j];
				html += '<span class="{0}-cell" data-color="{2}"><span style="{1}">{3}</span></span>'.format(cls, color ? ('background-color:#' + color) : '', color, color ? '' : '<i class="ti ti-ban"></i>');
			}
			html += '</div>';
		}

		self.html('<div class="{0}"><div class="{0}-body">{1}</div></div>'.format(cls, html));
		self.aclass(cls + '-container hidden');

		self.event('click', cls2 + '-cell', function() {
			var el = $(this);
			var color = el.find('span').attr('style').replace('background-color:', '');
			self.opt.callback && self.opt.callback(color ? self.opt.opacity ? self.hex2rgba(color, self.opt.opacity) : color : '');
			self.hide();
		});

		events.click = function(e) {
			var el = e.target;
			var parent = self.dom;
			do {
				if (el == parent)
					return;
				el = el.parentNode;
			} while (el);
			self.hide();
		};

		self.on('scroll + reflow + resize + resize2', self.hide);
	};

	self.hex2rgba = function(hex, opacity) {

		var c = (hex.charAt(0) === '#' ? hex.substring(1) : hex).split('');

		if(c.length === 3)
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];

		var a = c.splice(6);
		if (a.length)
			a = parseFloat(parseInt((parseInt(a.join(''), 16) / 255) * 1000) / 1000);
		else
			a = opacity || '1';

		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + a + ')';
	};

	self.bindevents = function() {
		if (!events.is) {
			events.is = true;
			$(document).on('click', events.click);
		}
	};

	self.unbindevents = function() {
		if (events.is) {
			events.is = false;
			$(document).off('click', events.click);
		}
	};

	self.show = function(opt) {

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		events.is && self.unbindevents();
		self.target = tmp;
		self.opt = opt;

		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else
			self.rclass('hidden');

		var target = $(opt.element);
		var w = self.element.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
				default:
					css.left = offset.left;
					break;
			}

			css.top = opt.position === 'bottom' ? (offset.top - self.element.height() - 10) : (offset.top + target.innerHeight() + 10);

		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		is = true;
		self.element.css(css);
		setTimeout(self.bindevents, 10);
	};

	self.hide = function() {
		if (is) {
			is = false;
			self.target = null;
			self.opt = null;
			setTimeout(self.unbindevents, 50);
			self.aclass('hidden');
		}
	};
});