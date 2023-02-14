COMPONENT('pricerange', function(self) {

	var slider;
	var container;
	var min;
	var max;
	var step;
	var curr;
	var drag = { is: false, el: null, width: 0, offset: 0, type: '' };
	var css = { 'margin-left': '0', 'margin-right': '0' };

	self.novalidate();
	self.nocompile && self.nocompile();

	self.make = function() {
		min = (self.attrd('min') || '0').parseInt();
		max = (self.attrd('max') || '0').parseInt(10000);
		step = (self.attrd('step') || '10').parseInt();
		curr = self.attrd('currency') || '{0} &euro;';
		self.aclass('ui-pricerange');
		self.append('<div class="ui-pricerange-to ui-pricerange-price">{1}</div><div class="ui-pricerange-from ui-pricerange-price">{0}</div><div class="ui-pricerange-slider"><div class="ui-pricerange-slider-value"><span data-name="margin-right"><i class="ti ti-angle-right"></i></span><span data-name="margin-left"><i class="ti ti-angle-left"></i></span></div></div>'.format(curr.format(min.format(0)), curr.format(max.format(0))));

		slider = self.find('.ui-pricerange-slider-value');
		container = self.find('.ui-pricerange-slider');

		self.event('mousemove mouseup mouseleave touchend touchcancel touchmove', function(e) {

			if (!drag.is)
				return;

			if (e.type === 'mouseup' || e.type === 'mouseleave' || e.type === 'touchend' || e.type === 'touchcancel') {

				drag.is = false;
				drag.x = e.pageX;
				var l = (slider.css('margin-left').parseInt() / drag.width) * 100;
				var r = (slider.css('margin-right').parseInt() / drag.width) * 100;

				r = drag.steps - Math.ceil((drag.steps / 100) * r);
				l = drag.steps - (drag.steps - Math.ceil((drag.steps / 100) * l));

				l = l * step;
				if (l < min)
					l = min;

				r = r * step;
				if (r > max)
					r = max;

				self.dirty(false, true);
				self.getter(l + '-' + r);
				return;
			}

			var pos;
			var offset;
			var cur;
			var tmp;
			var val;
			var pageX = e.pageX || e.touches[0].pageX;

			if (drag.type === 'margin-left') {
				offset = drag.offsetL;
				pos = offset + (pageX - drag.x);
				cur = (pos / drag.width) * 100;
				cur = Math.round((drag.steps / 100) * cur);
				pos = self.calculate(cur, drag.steps, drag.width);
				tmp = (drag.offsetR / drag.width * 100);
				tmp = drag.steps - Math.ceil((drag.steps / 100) * tmp);
				if (tmp < cur)
					return;
				val = cur * step;
			} else {
				offset = drag.offsetR;
				pos = offset + (drag.x - pageX);
				cur = (pos / drag.width) * 100;
				cur = Math.round((drag.steps / 100) * cur);
				pos = self.calculate(cur, drag.steps, drag.width);
				tmp = (drag.offsetL / drag.width * 100);
				tmp = drag.steps - Math.ceil((drag.steps / 100) * tmp);
				if (tmp < cur)
					return;
				val = (drag.steps - cur) * step;
			}

			if (cur <= 0) {
				cur = 0;
				pos = 0;
			} else if (cur >= drag.steps) {
				cur = drag.steps;
				pos = drag.width - drag.padding;
			}

			if (drag.prev === pos)
				return;

			drag.prev = pos;
			css[drag.type] = pos + 'px';
			slider.stop().animate(css, 100);
			drag.text.html(curr.format(val.format(0)));
		});

		slider.on('mousedown touchstart', 'span', function(e) {
			var pageX = e.pageX || e.touches[0].pageX;
			drag.is = true;
			drag.el = $(this);
			drag.width = container.width();
			drag.x = pageX;
			drag.prev = null;
			drag.type = drag.el.attr('data-name');
			drag.offsetL = slider.css('margin-left').parseInt() + 5;
			drag.offsetR = slider.css('margin-right').parseInt() + 5;
			drag.padding = drag.el.width();
			drag.steps = Math.ceil(max / step);
			drag.text = self.find('.ui-pricerange-price').eq(drag.type === 'margin-left' ? 1 : 0);
		});
	};

	self.calculate = function(step, steps, width) {
		var p = (step / steps) * 100;
		return (width / 100) * p;
	};

	self.values = function(f, t) {
		self.find('.ui-pricerange-price').each(function(index) {
			this.innerHTML = curr.format((index ? f : t).format(0));
		});
	};

	self.setter = function(value) {

		if (!value)
			value = min + '-' + max;

		var arr = value.split('-');
		var f = (arr[0] || '').parseInt();
		var t = (arr[1] || '').parseInt();
		var w = container.width();

		if (f < min)
			f = min;

		if (t > max)
			t = max;

		self.values(f, t);

		var l = (f / max) * 100;
		var r = 100 - ((t / max) * 100);

		l = (w / 100) * l;
		r = (w / 100) * r;

		css['margin-left'] = l + 'px';
		css['margin-right'] = r + 'px';
		slider.stop().animate(css, 100);
	};
});