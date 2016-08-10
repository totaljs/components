/**
 * calendar
 * @version 1.1.0
 */
COMPONENT('calendar', function() {

	var self = this;
	var skip = false;
	var skipDay = false;
	var callback;
	var target;

	self.days = self.attr('data-days').split(',');
	self.months = self.attr('data-months').split(',');
	self.first = parseInt(self.attr('data-firstday'));
	self.today = self.attr('data-today');
	self.months_short = [];

	for (var i = 0, length = self.months.length; i < length; i++) {
		var m = self.months[i];
		if (m.length > 4)
			m = m.substring(0, 3) + '.';
		self.months_short.push(m);
	}

	self.readonly();
	self.singleton();
	self.click = function(date) {};

	function getMonthDays(dt) {

		var m = dt.getMonth();
		var y = dt.getFullYear();

		if (m === -1) {
			m = 11;
			y--;
		}

		return (32 - new Date(y, m, 32).getDate());
	}

	function calculate(year, month, selected) {

		var d = new Date(year, month, 1);
		var output = { header: [], days: [], month: month, year: year };
		var firstDay = self.first;
		var firstCount = 0;
		var from = d.getDay() - firstDay;
		var today = new Date();
		var ty = today.getFullYear();
		var tm = today.getMonth();
		var td = today.getDate();
		var sy = selected ? selected.getFullYear() : -1;
		var sm = selected ? selected.getMonth() : -1;
		var sd = selected ? selected.getDate() : -1;
		var days = getMonthDays(d);

		if (from < 0)
			from = 7 + from;

		while (firstCount++ < 7) {
			output.header.push({ index: firstDay, name: self.days[firstDay] });
			firstDay++;
			if (firstDay > 6)
				firstDay = 0;
		}

		var index = 0;
		var indexEmpty = 0;
		var count = 0;
		var prev = getMonthDays(new Date(year, month - 1, 1)) - from;

		for (var i = 0; i < days + from; i++) {

			count++;
			var obj = { isToday: false, isSelected: false, isEmpty: false, isFuture: false, number: 0, index: count };

			if (i >= from) {
				index++;
				obj.number = index;
				obj.isSelected = sy === year && sm === month && sd === index;
				obj.isToday = ty === year && tm === month && td === index;
				obj.isFuture = ty < year;

				if (!obj.isFuture && year === ty) {
					if (tm < month)
						obj.isFuture = true;
					else if (tm === month)
						obj.isFuture = td < index;
				}

			} else {
				indexEmpty++;
				obj.number = prev + indexEmpty;
				obj.isEmpty = true;
			}

			output.days.push(obj);
		}

		indexEmpty = 0;
		for (var i = count; i < 42; i++) {
			count++;
			indexEmpty++;
			var obj = { isToday: false, isSelected: false, isEmpty: true, isFuture: false, number: indexEmpty, index: count };
			output.days.push(obj);
		}

		return output;
	}

	self.hide = function() {
		if (self.element.hasClass('hidden'))
			return;
		self.element.addClass('hidden');
		return self;
	};

	self.toggle = function(el, value, callback, offset) {
		if (self.element.hasClass('hidden') || target !== el.get(0))
			self.show(el, value, callback, offset);
		else
			self.hide();
		return self;
	};

	self.show = function(el, value, callback, offset) {

		if (!el)
			return self.hide();

		target = el.get(0);

		var off = el.offset();
		var h = el.innerHeight();

		setTimeout(function() {
			self.element.css({ left: off.left + (offset || 0), top: off.top + h + 12 }).removeClass('hidden');
			self.click = callback;
			self.date(value);
		}, 20);

		return self;
	};

	self.make = function() {

		self.element.addClass('ui-calendar hidden');

		self.element.on('click', '.ui-calendar-today', function() {
			var dt = new Date();
			self.hide();
			if (self.click)
				self.click(dt);
		});

		self.element.on('click', '.ui-calendar-day', function() {
			var arr = this.getAttribute('data-date').split('-');
			var dt = new Date(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]));
			skip = true;
			self.element.find('.ui-calendar-selected').removeClass('ui-calendar-selected');
			$(this).addClass('ui-calendar-selected');
			self.hide();
			if (self.click)
				self.click(dt);
		});

		self.element.on('click', 'button', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var arr = this.getAttribute('data-date').split('-');
			var dt = new Date(parseInt(arr[0]), parseInt(arr[1]), 1);
			switch (this.name) {
				case 'prev':
					dt.setMonth(dt.getMonth() - 1);
					break;
				case 'next':
					dt.setMonth(dt.getMonth() + 1);
					break;
			}
			skipDay = true;
			self.date(dt);
		});

		$(document.body).on('scroll click', function() {
			if (window.$calendar)
				window.$calendar.hide();
		});

		window.$calendar = self;
	};

	self.date = function(value) {

		if (typeof(value) === 'string')
			value = value.parseDate();

		var empty = !value;

		if (skipDay) {
			skipDay = false;
			empty = true;
		}

		if (skip) {
			skip = false;
			return;
		}

		if (!value)
			value = new Date();

		old = value;

		var output = calculate(value.getFullYear(), value.getMonth(), value);
		var builder = [];

		for (var i = 0; i < 42; i++) {

			var item = output.days[i];

			if (i % 7 === 0) {
				if (builder.length > 0)
					builder.push('</tr>');
				builder.push('<tr>');
			}

			var cls = [];

			if (item.isEmpty)
				cls.push('ui-calendar-disabled');
			else
				cls.push('ui-calendar-day');

			if (!empty && item.isSelected)
				cls.push('ui-calendar-selected');

			if (item.isToday)
				cls.push('ui-calendar-day-today');

			builder.push('<td class="' + cls.join(' ') + '" data-date="' + output.year + '-' + output.month + '-' + item.number + '">' + item.number + '</td>');
		}

		builder.push('</tr>');

		var header = [];
		for (var i = 0; i < 7; i++)
			header.push('<th>' + output.header[i].name + '</th>');

		self.element.html('<div class="ui-calendar-header"><button class="ui-calendar-header-prev" name="prev" data-date="' + output.year + '-' + output.month + '"><span class="fa fa-chevron-left"></span></button><div class="ui-calendar-header-info">' + self.months[value.getMonth()] + ' ' + value.getFullYear() + '</div><button class="ui-calendar-header-next" name="next" data-date="' + output.year + '-' + output.month + '"><span class="fa fa-chevron-right"></span></button></div><table cellpadding="0" cellspacing="0" border="0"><thead>' + header.join('') + '</thead><tbody>' + builder.join('') + '</tbody></table>' + (self.today ? '<div><a href="javascript:void(0)" class="ui-calendar-today">' + self.today + '</a></div>' : ''));
	};
});