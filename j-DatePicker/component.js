COMPONENT('datepicker', 'today:Set today;clear:Clear;firstday:-1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var skip = false;
	var visible = false;
	var current;
	var elyears, elmonths, elbody;
	var main;

	self.days = EMPTYARRAY;
	self.days_short = EMPTYARRAY;
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

				self.days_short = [];

				for (var i = 0; i < DAYS.length; i++) {
					DAYS[i] = self.days[i];
					self.days_short[i] = DAYS[i].substring(0, 2).toUpperCase();
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
					self.years_from = +(NOW.format('yyyy'));
				else
					self.years_from = +(NOW.add(value).format('yyyy'));
				break;

			case 'yearto':
				if (value.indexOf('current') !== -1)
					self.years_to = +(NOW.format('yyyy'));
				else
					self.years_to = +(NOW.add(value).format('yyyy'));
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
		var firstday = config.firstday === -1 ? DEF.firstdayofweek : config.firstday;
		var firstcount = 0;
		var frm = d.getDay() - firstday;
		var today = NOW;
		var ty = today.getFullYear();
		var tm = today.getMonth();
		var td = today.getDate();
		var sy = selected ? selected.getFullYear() : -1;
		var sm = selected ? selected.getMonth() : -1;
		var sd = selected ? selected.getDate() : -1;
		var days = getMonthDays(d);

		if (frm < 0)
			frm = 7 + frm;

		while (firstcount++ < 7) {
			output.header.push({ index: firstday, name: self.days_short[firstday] });
			firstday++;
			if (firstday > 6)
				firstday = 0;
		}

		var index = 0;
		var indexEmpty = 0;
		var count = 0;
		var prev = getMonthDays(new Date(year, month - 1, 1, 12, 0)) - frm;
		var cur;

		for (var i = 0; i < days + frm; i++) {

			var obj = { today: false, selected: false, empty: false, future: false, number: 0, index: ++count };

			if (i >= frm) {
				obj.number = ++index;
				obj.selected = sy === year && sm === month && sd === index;
				obj.today = ty === year && tm === month && td === index;
				obj.future = ty < year;
				if (!obj.future && year === ty) {
					if (tm < month)
						obj.future = true;
					else if (tm === month)
						obj.future = td < index;
				}

			} else {
				indexEmpty++;
				obj.number = prev + indexEmpty;
				obj.empty = true;
				cur = d.add('-' + indexEmpty + ' days');
			}

			if (!obj.empty)
				cur = d.add(i + ' days');

			obj.month = i >= frm && obj.number <= days ? d.getMonth() : cur.getMonth();
			obj.year = i >= frm && obj.number <= days ? d.getFullYear() : cur.getFullYear();
			obj.date = cur;
			output.days.push(obj);
		}

		indexEmpty = 0;

		for (var i = count; i < 42; i++) {
			var cur = d.add(i + ' days');
			var obj = { today: false, selected: false, empty: true, future: true, number: ++indexEmpty, index: ++count };
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
			self.opt.close && self.opt.close();
			self.opt = null;
			self.older = null;
			self.target = null;
			self.aclass('hidden');
			self.rclass(cls + '-visible');
			visible = false;
		}
		return self;
	};

	self.show = function(opt) {

		setTimeout(function() {
			clearTimeout2('datepickerhide');
		}, 5);

		var el = $(opt.element);
		var dom = el[0];

		if (self.target === dom) {
			self.hide();
			return;
		}

		if (self.opt && self.opt.close)
			self.opt.close();

		var off = el.offset();
		var w = el.innerWidth();
		var h = el.innerHeight();
		var l = 0;
		var t = 0;
		var height = 305 + (opt.cancel ? 25 : 0);
		var s = 250;

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					l = Math.ceil((off.left - s / 2) + (w / 2));
					break;
				case 'right':
					l = (off.left + w) - s;
					break;
				default:
					l = off.left;
					break;
			}

			t = opt.position === 'bottom' ? (off.top - height) : (off.top + h + 12);
		}

		if (opt.offsetX)
			l += opt.offsetX;

		if (opt.offsetY)
			t += opt.offsetY;

		if ((l + s) > WW)
			l = (l + w) - s;

		if ((t + height) > WH)
			t = WH - height - 10;

		var restrict = true;
		var parent = dom.parentNode;

		while (parent) {
			if (parent.tagName === 'BODY') {
				restrict = false;
				break;
			}
			if (parent.classList.contains('ui-scrollbar-area'))
				break;
			parent = parent.parentNode;
		}

		if (restrict && (t + height) > WH)
			t = (t + h) - height;

		var dt = typeof(opt.value) === 'string' ? GET(opt.value) : opt.value;
		if ((!(dt instanceof Date)) || isNaN(dt.getTime()))
			dt = NOW;

		opt.scope = M.scope ? M.scope() : '';
		self.opt = opt;
		self.time = dt.format('HH:mm:ss');
		self.rclass('hidden');
		self.date(dt);
		main.css({ left: l, top: t });
		main.aclass(cls + '-visible', 50);
		self.bindevents();
		self.target = dom;
		visible = true;
	};

	self.setdate = function(dt) {

		if (!dt) {
			if (typeof(self.opt.value) === 'string')
				SET(self.opt.value + ' @change', dt);
			else
				self.opt.callback(dt);
			return;
		}

		var time = self.time.split(':');

		if (time.length > 1) {
			dt.setHours(+(time[0] || '0'));
			dt.setMinutes(+(time[1] || '0'));
			dt.setSeconds(+(time[2] || '0'));
		}

		self.opt.scope && M.scope(self.opt.scope);

		if (typeof(self.opt.value) === 'string')
			SET(self.opt.value + ' @change', dt);
		else
			self.opt.callback(dt);
	};

	self.make = function() {

		self.aclass(cls + '-container hidden');

		var conf = {};
		var reconfigure = false;

		if (!config.days) {
			conf.days = [];
			for (var i = 0; i < DAYS.length; i++)
				conf.days.push(DAYS[i]);
			reconfigure = true;
		}

		if (!config.months) {
			conf.months = MONTHS;
			reconfigure = true;
		}

		reconfigure && self.reconfigure(conf);
		W.$datepicker = self;

		self.event('click', function(e) {
			e.stopPropagation();
		});

		var hide = function() {
			visible && W.$datepicker && W.$datepicker.hide();
		};

		var hide2 = function() {
			visible && setTimeout2('datepickerhide', function() {
				W.$datepicker && W.$datepicker.hide();
			}, 20);
		};

		self.bindevents = function() {
			if (!visible)
				$(W).on('scroll', hide2);
		};

		self.unbindevents = function() {
			if (visible)
				$(W).off('scroll', hide2);
		};

		self.element.on('click', function(e) {
			if (e.target === self.dom)
				hide();
		});

		self.on('reflow + scroll + resize + resize2', hide);
	};

	self.makehtml = function() {
		var builder = [];
		builder.push('<div class="{0}-header"><span class="{0}-next"><i class="ti ti-angle-right"></i></span><span class="{0}-prev"><i class="ti ti-angle-left"></i></span><div class="{0}-info"><span class="{0}-month">---</span><span class="{0}-year">---</span></div></div><div class="{0}-years hidden"></div><div class="{0}-months"></div><div class="{0}-body hidden"><div class="{0}-week">'.format(cls));
		for (var i = 0; i < 7; i++)
			builder.push('<div></div>');
		builder.push('</div><div class="{0}-days">'.format(cls));

		var clearbtn = self.opt.clear === false ? null : '<span>{1}</span>'.format(cls, config.clear);

		for (var i = 0; i < 42; i++)
			builder.push('<div class="{0}-date"><div></div></div>'.format(cls, i));
		builder.push('</div></div><div class="{0}-footer"><span class="{0}-now">{2}</span><span class="{0}-clear">{3}</span></div>'.format(cls, config.close, config.today, clearbtn));

		self.html('<div class="{0}">{1}</div>'.format(cls, builder.join('')));
		main = $(self.find(cls2)[0]);

		builder = [];
		elbody = self.find(cls2 + '-body');
		elmonths = self.find(cls2 + '-months');
		for (var i = 0; i < 12; i++)
			builder.push('<div class="{0}-month" data-index="{1}"><div></div></div>'.format(cls, i));
		elmonths.html(builder.join(''));

		builder = [];
		elyears = self.find(cls2 + '-years');
		for (var i = 0; i < 25; i++)
			builder.push('<div class="{0}-year"><div></div></div>'.format(cls));
		elyears.html(builder.join(''));

		self.makehtml = null;

		self.find(cls2 + '-month').on('click', function(e) {

			var el = $(this);
			var index = el.attrd('index');
			var h = 'hidden';

			if (index) {
				current.setMonth(+index);
				self.date(current, true);
			} else if (!elmonths.hclass(h))
				index = 1;

			elyears.aclass(h);

			if (index)
				elmonths.aclass(h);
			else {
				elmonths.find(cls2 + '-today').rclass(cls + '-today');
				elmonths.find(cls2 + '-month').eq(current.getMonth()).aclass(cls + '-today');
				elmonths.rclass(h);
			}

			elbody.tclass(h, !elmonths.hclass(h));
			e.preventDefault();
			e.stopPropagation();

		});

		self.find(cls2 + '-year').on('click', function(e) {
			var el = $(this);
			var year = el.attrd('year');
			var h = 'hidden';

			if (year) {
				current.setFullYear(+year);
				self.date(current, true);
			} else if (!elyears.hclass(h))
				year = 1;

			elmonths.aclass(h);

			if (year)
				elyears.aclass(h);
			else {
				self.years();
				elyears.rclass(h);
			}

			elbody.tclass(h, !elyears.hclass(h));
			e.preventDefault();
			e.stopPropagation();
		});

		self.years = function() {
			var dom = self.find(cls2 + '-years').find(cls2 + '-year');
			var year = current.getFullYear();
			var index = 12;
			for (var i = 0; i < 25; i++) {
				var val = year - (index--);
				$(dom[i]).tclass(cls + '-today', val === year).attrd('year', val).find('div')[0].innerHTML = val;
			}
		};

		self.find(cls2 + '-date').on('click', function() {
			var dt = $(this).attrd('date').split('-');
			self.setdate(new Date(+dt[0], +dt[1], +dt[2], 12, 0, 0));
			self.hide();
		});

		self.find(cls2 + '-now').on('click', function() {
			self.setdate(new Date());
			self.hide();
		});

		self.find(cls2 + '-clear').on('click', function() {
			self.setdate(null);
			self.hide();
		});

		self.find(cls2 + '-next').on('click', function(e) {

			if (elyears.hclass('hidden')) {
				current.setMonth(current.getMonth() + 1);
				self.date(current, true);
			} else {
				current.setFullYear(current.getFullYear() + 25);
				self.years();
			}

			e.preventDefault();
			e.stopPropagation();
		});

		self.find(cls2 + '-prev').on('click', function(e) {

			if (elyears.hclass('hidden')) {
				current.setMonth(current.getMonth() - 1);
				self.date(current, true);
			} else {
				current.setFullYear(current.getFullYear() - 25);
				self.years();
			}

			e.preventDefault();
			e.stopPropagation();
		});
	};

	self.date = function(value, skipday) {

		var clssel = cls + '-selected';

		self.makehtml && self.makehtml();

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

		value = new Date((value || NOW).getTime());

		var output = self.calculate(value.getFullYear(), value.getMonth(), value);
		var dom = self.find(cls2 + '-date');

		self.find(cls2 + '-body').rclass('hidden');
		self.find(cls2 + '-months,' + cls2 + '-years').aclass('hidden');

		current = value;

		for (var i = 0; i < 42; i++) {

			var item = output.days[i];
			var classes = [cls + '-date'];

			if (item.empty)
				classes.push(cls + '-disabled');

			if (!empty && item.selected)
				classes.push(cls + '-selected');

			if (item.today)
				classes.push(cls + '-day-today');

			var el = $(dom[i]);
			el.attrd('date', item.year + '-' + item.month + '-' + item.number);
			el.find('div').html(item.number);
			el.find('i').remove();
			el.rclass().aclass(classes.join(' '));
		}

		if (!skipday) {

			dom = self.find(cls2 + '-week').find('div');
			for (var i = 0; i < 7; i++)
				dom[i].innerHTML = output.header[i].name;

			dom = self.find(cls2 + '-months').find(cls2 + '-month');
			for (var i = 0; i < 12; i++)
				$(dom[i]).find('div').attrd('index', i)[0].innerHTML = self.months_short[i];
		}

		self.opt.badges && self.opt.badges(current, function(date) {

			if (!(date instanceof Array))
				date = [date];

			for (var i = 0; i < date.length; i++) {
				var dt = date[i].getFullYear() + '-' + date[i].getMonth() + '-' + date[i].getDate();
				var el = self.find(cls2 + '-date[data-date="{0}"]'.format(dt));
				if (el.length && !el.find('i').length)
					el.append('<i class="ti ti-circle-alt"></i>');
			}

		});

		var info = self.find(cls2 + '-info');
		info.find(cls2 + '-month').html(self.months[current.getMonth()]);
		info.find(cls2 + '-year').html(current.getFullYear());

	};
});