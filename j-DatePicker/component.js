COMPONENT('datepicker', 'today:Set today;firstday:0;close:Close;yearselect:true;monthselect:true;yearfrom:-70 years;yearto:5 years', function(self, config) {

	var skip = false;
	var visible = false;
	var touchdiff;
	var startX;

	self.days = EMPTYARRAY;
	self.months = EMPTYARRAY;
	self.months_short = EMPTYARRAY;
	self.years_from;
	self.years_to;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.configure = function(key, value) {
		switch (key) {
			case 'days':
				if (value instanceof Array)
					self.days = value;
				else
					self.days = value.split(',').trim();

				for (var i = 0; i < DAYS.length; i++) {
					DAYS[i] = self.days[i];
					self.days[i] = DAYS[i].substring(0, 2).toUpperCase();
				}

				break;

			case 'months':
				if (value instanceof Array)
					self.months = value;
				else
					self.months = value.split(',').trim();

				self.months_short = [];

				for (var i = 0, length = self.months.length; i < length; i++) {
					var m = self.months[i];
					MONTHS[i] = m;
					if (m.length > 4)
						m = m.substring(0, 3) + '.';
					self.months_short.push(m);
				}
				break;

			case 'yearfrom':
				if (value.indexOf('current') !== -1)
					self.years_from = +(new Date().format('yyyy'));
				else
					self.years_from = +(new Date().add(value).format('yyyy'));
				break;

			case 'yearto':
				if (value.indexOf('current') !== -1)
					self.years_to = +(new Date().format('yyyy'));
				else
					self.years_to = +(new Date().add(value).format('yyyy'));
				break;
		}
	};

	function getMonthDays(dt) {

		var m = dt.getMonth();
		var y = dt.getFullYear();

		if (m === -1) {
			m = 11;
			y--;
		}

		return (32 - new Date(y, m, 32).getDate());
	}

	self.calculate = function(year, month, selected) {

		var d = new Date(year, month, 1, 12, 0);
		var output = { header: [], days: [], month: month, year: year };
		var firstDay = config.firstday;
		var firstCount = 0;
		var frm = d.getDay() - firstDay;
		var today = new Date();
		var ty = today.getFullYear();
		var tm = today.getMonth();
		var td = today.getDate();
		var sy = selected ? selected.getFullYear() : -1;
		var sm = selected ? selected.getMonth() : -1;
		var sd = selected ? selected.getDate() : -1;
		var days = getMonthDays(d);

		if (frm < 0)
			frm = 7 + frm;

		while (firstCount++ < 7) {
			output.header.push({ index: firstDay, name: self.days[firstDay] });
			firstDay++;
			if (firstDay > 6)
				firstDay = 0;
		}

		var index = 0;
		var indexEmpty = 0;
		var count = 0;
		var prev = getMonthDays(new Date(year, month - 1, 1, 12, 0)) - frm;
		var cur;

		for (var i = 0; i < days + frm; i++) {

			var obj = { isToday: false, isSelected: false, isEmpty: false, isFuture: false, number: 0, index: ++count };

			if (i >= frm) {
				obj.number = ++index;
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
				cur = d.add('-' + indexEmpty + ' days');
			}

			if (!obj.isEmpty)
				cur = d.add(i + ' days');

			obj.month = i >= frm && obj.number <= days ? d.getMonth() : cur.getMonth();
			obj.year = i >= frm && obj.number <= days ? d.getFullYear() : cur.getFullYear();
			obj.date = cur;
			output.days.push(obj);
		}

		indexEmpty = 0;

		for (var i = count; i < 42; i++) {
			var cur = d.add(i + ' days');
			var obj = { isToday: false, isSelected: false, isEmpty: true, isFuture: true, number: ++indexEmpty, index: ++count };
			obj.month = cur.getMonth();
			obj.year = cur.getFullYear();
			obj.date = cur;
			output.days.push(obj);
		}

		return output;
	};

	self.hide = function() {
		if (visible) {
			self.unbindevents();
			self.opt = null;
			self.older = null;
			self.aclass('hidden');
			self.rclass('ui-datepicker-visible');
			visible = false;
		}
		return self;
	};

	self.show = function(opt) {

		setTimeout(function() {
			clearTimeout2('datepickerhide');
		}, 5);

		var el = $(opt.element);
		var off = el.offset();
		var h = el.innerHeight();
		var l = off.left + (opt.offsetX || 0);
		var t = off.top + h + 12 + (opt.offsetY || 0);
		var s = 250;

		if (l + s > WW) {
			var w = el.innerWidth();
			l = (l + w) - s;
		}

		self.opt = opt;
		self.time = (opt.value || NOW).format('HH:mm:ss');
		self.css({ left: l, top: t });
		self.rclass('hidden');
		self.date(opt.value);
		self.aclass('ui-datepicker-visible', 50);
		visible = true;
		self.bindevents();
		return self;
	};

	self.setdate = function(dt) {

		var time = self.time.split(':');

		if (time.length > 1) {
			dt.setHours(+(time[0] || '0'));
			dt.setMinutes(+(time[1] || '0'));
			dt.setSeconds(+(time[2] || '0'));
		}

		if (typeof(self.opt.value) === 'string')
			SET2(self.opt.value, dt);
		else
			self.opt.callback(dt);
	};

	self.make = function() {

		self.aclass('ui-datepicker hidden');

		var conf = {};

		if (!config.days) {
			conf.days = [];
			for (var i = 0; i < DAYS.length; i++)
				conf.days.push(DAYS[i].substring(0, 2).toUpperCase());
		}

		!config.months && (conf.months = MONTHS);
		self.reconfigure(conf);

		self.event('click', '.ui-datepicker-today-a', function() {
			self.setdate(new Date());
			self.hide();
		});

		self.event('click touchend', '.ui-datepicker-day', function() {
			if (Date.now() - touchdiff > 500)
				return;
			var arr = this.getAttribute('data-date').split('-');
			var dt = new Date(+arr[0], +arr[1], +arr[2], 12, 0);
			self.find('.ui-datepicker-selected').rclass('ui-datepicker-selected');
			var el = $(this).aclass('ui-datepicker-selected');
			skip = !el.hclass('ui-datepicker-disabled');
			self.hide();
			self.setdate(dt);
		});

		self.event('click', '.ui-datepicker-header', function(e) {
			e.stopPropagation();
		});

		self.event('change', '.ui-datepicker-year', function(e) {

			clearTimeout2('datepickerhide');
			e.preventDefault();
			e.stopPropagation();

			var arr = $(this).attrd('date').split('-');
			var dt = new Date(+arr[0], +arr[1], 1, 12, 0);
			dt.setFullYear(this.value);
			self.date(dt, true);
		});

		self.event('change', '.ui-datepicker-month', function(e){

			clearTimeout2('datepickerhide');
			e.preventDefault();
			e.stopPropagation();

			var arr = $(this).attrd('date').split('-');
			var dt = new Date(+arr[0], +arr[1], 1, 12, 0);
			dt.setMonth(this.value);
			self.date(dt, true);
		});

		self.event('click', 'button', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var arr = $(this).attrd('date').split('-');
			var dt = new Date(+arr[0], +arr[1], 1, 12, 0);
			switch (this.name) {
				case 'prev':
					dt.setMonth(dt.getMonth() - 1);
					break;
				case 'next':
					dt.setMonth(dt.getMonth() + 1);
					break;
			}

			self.date(dt, true);
		});

		self.event('touchstart touchmove', '.ui-datepicker-table',function(e){

			e.stopPropagation();
			e.preventDefault();

			var x = e.originalEvent.touches[0].pageX;

			if (e.type === 'touchstart') {
				startX = x;
				touchdiff = Date.now();
				return;
			}

			var diffX = startX - x;
			if (diffX > 70 || diffX < -70) {
				var arr = $(this).data('date').split('-');
				var dt = new Date(+arr[0], +arr[1], 1, 12, 0);
				dt.setMonth(dt.getMonth() + (diffX > 50 ? 1 : -1));
				self.date(dt, true);
			}
		});


		window.$datepicker = self;

		var hide = function() {
			visible && window.$datepicker && window.$datepicker.hide();
		};

		var hide2 = function() {
			visible && setTimeout2('datepickerhide', function() {
				window.$datepicker && window.$datepicker.hide();
			}, 20);
		};

		self.bindevents = function() {
			if (!visible)
				$(window).on('scroll click', hide2);
		};

		self.unbindevents = function() {
			if (visible)
				$(window).off('scroll click', hide2);
		};

		self.on('reflow + scroll + resize', hide);
	};

	self.date = function(value, skipday) {

		var clssel = 'ui-datepicker-selected';

		if (typeof(value) === 'string')
			value = value.parseDate();

		var year = value == null ? null : value.getFullYear();
		if (year && (year < self.years_from || year > self.years_to))
			return;

		if (!value || isNaN(value.getTime())) {
			self.find('.' + clssel).rclass(clssel);
			value = NOW;
		}

		var empty = !value;

		if (skipday) {
			skipday = false;
			empty = true;
		}

		if (skip) {
			skip = false;
			return;
		}

		if (!value)
			value = NOW = new Date();

		var output = self.calculate(value.getFullYear(), value.getMonth(), value);
		var builder = [];

		for (var i = 0; i < 42; i++) {

			var item = output.days[i];

			if (i % 7 === 0) {
				builder.length && builder.push('</tr>');
				builder.push('<tr>');
			}

			var cls = [];

			item.isEmpty && cls.push('ui-datepicker-disabled');
			cls.push('ui-datepicker-day');

			!empty && item.isSelected && cls.push(clssel);
			item.isToday && cls.push('ui-datepicker-day-today');
			builder.push('<td class="{0}" data-date="{1}-{2}-{3}"><div>{3}</div></td>'.format(cls.join(' '), item.year, item.month, item.number));
		}

		builder.push('</tr>');

		var header = [];
		for (var i = 0; i < 7; i++)
			header.push('<th>{0}</th>'.format(output.header[i].name));

		var years = value.getFullYear();
		if (config.yearselect) {
			years = '';
			var current_year = value.getFullYear();
			for (var i = self.years_from; i <= self.years_to; i++)
				years += '<option value="{0}" {1}>{0}</option>'.format(i, i === current_year ? 'selected' : '');
			years = '<select data-date="{0}-{1}" class="ui-datepicker-year">{2}</select>'.format(output.year, output.month, years);
		}

		var months = self.months[value.getMonth()];
		if (config.monthselect) {
			months = '';
			var current_month = value.getMonth();
			for (var i = 0, l = self.months.length; i < l; i++)
				months += '<option value="{0}" {2}>{1}</option>'.format(i, self.months[i], i === current_month ? 'selected' : '');
			months = '<select data-date="{0}-{1}" class="ui-datepicker-month">{2}</select>'.format(output.year, output.month, months);
		}

		self.html('<div class="ui-datepicker-header"><button class="ui-datepicker-header-prev" name="prev" data-date="{0}-{1}"><span class="fa fa-arrow-left"></span></button><div class="ui-datepicker-header-info">{2} {3}</div><button class="ui-datepicker-header-next" name="next" data-date="{0}-{1}"><span class="fa fa-arrow-right"></span></button></div><div class="ui-datepicker-table" data-date="{0}-{1}"><table cellpadding="0" cellspacing="0" border="0"><thead>{4}</thead><tbody>{5}</tbody></table></div>'.format(output.year, output.month, months, years, header.join(''), builder.join('')) + (config.today ? '<div class="ui-datepicker-today"><a href="javascript:void(0)">{0}</a><a href="javascript:void(0)" class="ui-datepicker-today-a"><i class="fa fa-datepicker"></i>{1}</a></div>'.format(config.close, config.today) : ''));
	};
});
