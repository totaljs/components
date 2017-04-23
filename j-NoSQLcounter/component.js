COMPONENT('nosqlcounter', function() {
	var self = this;
	var count = (self.attr('data-count') || '0').parseInt();
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	self.readonly();
	self.make = function() {
		self.toggle('ui-nosqlcounter hidden', true);
		var calendar = FIND('calendar');
		calendar && (months = calendar.months);
	};

	self.setter = function(value) {

		var is = !value || !value.length;
		self.toggle('hidden', is);

		if (is)
			return self.empty();

		var maxbars = 12;

		if (count === 0)
			maxbars = self.element.width() / 30 >> 0;
		else
			maxbars = count;

		if (WIDTH() === 'xs')
			maxbars = maxbars / 2;

		var dt = new Date();
		var stats = [];

		for (var i = 0; i < maxbars; i++) {
			var id = dt.format('yyyyMM');
			var item = value.findItem('id', id);
			stats.push(item ? item : { id: id, month: dt.getMonth() + 1, year: dt.getFullYear(), value: 0 });
			dt = dt.add('-1 month');
		}

		stats.reverse();

		var max = stats.scalar('max', 'value');
		var bar = 100 / maxbars;
		var builder = [];

		var current = new Date().format('yyyyMM');
		var cls = '';

		stats.forEach(function(item, index) {
			var val = item.value;
			if (val > 999)
				val = (val / 1000).format(1, 2) + 'K';

			var h = (item.value / max) * 60;
			h += 40;

			cls = item.value ? '' : 'empty';

			if (item.id === current)
				cls += (cls ? ' ' : '') + 'current';

			if (index === maxbars - 1)
				cls += (cls ? ' ' : '') + 'last';

			builder.push('<div style="width:{0}%;height:{1}%" title="{3}" class="{4}"><span>{2}</span></div>'.format(bar.format(2, ''), h.format(0, ''), val, months[item.month - 1] + ' ' + item.year, cls));
		});

		self.html(builder);
	};
});