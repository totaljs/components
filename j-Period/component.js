COMPONENT('period', 'firstday:monday;apply:Apply;cancel:Cancel;custom:Custom;month:Current month;thisY:This year;lastY:Last year', function (self, config, cls) {

    self.singleton();

    if (!config.dateformat)
        config.dateformat = DEF.dateformat;

    var firstday = config.firstday;
    var cls2 = '.' + cls;
    var now = new Date();
    var next = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    var selected = {};
    var counter = 0;
    var range = [];

    var filters;
    var custom;
    var gridL;
    var gridR;
    var apply;
    var cancel;
    var menu;
    var overlay;
    var grids;
    var prevbtn;
    var nextbtn;

    var months = MONTHS;
    var days = DAYS.map(d => d.substring(0, 2).toUpperCase());

    if (firstday === 'monday') {
        var sunday = days.shift();
        days.push(sunday);
    }

    var week = $('<div class="{0}-week"></div>'.format(cls));
    for (i = 0; i < days.length; i++)
        week.append('<div>{0}</div>'.format(days[i]));

    self.op = {};
    var op = self.op;

    self.make = function () {

        self.aclass(cls + ' invisible hidden');

        self.append(
                `<div class="{0}-overlay">
                    <div class="{0}-menu">
                        <div class="{0}-content">
                            <div class="{0}-periods">
                                <div class="{0}-period" data-period="lastyear">{7}</div>
                                <div class="{0}-period" data-period="thisyear">{6}</div>
                                <div class="{0}-period" data-period="thismonth">{5}</div>
                                <div class="{0}-period" data-period="custom">{4}</div>
                            </div>
                            <div class="{0}-calendar">
                                <div class="{0}-leftmonth {0}-month">
                                    <div class="{0}-monthheader">
                                        <div class="{0}-btnprev {0}-arrow"><</div>
                                        <div>
                                            <span class="{0}-hmonth"></span>
                                            <span class="{0}-hyear"></span>
                                        </div>
                                    </div>
                                    {1}
                                    <div class="{0}-daysgrid"></div>
                                </div>
                                <div class="{0}-leftmonth {0}-month">
                                    <div class="{0}-monthheader">
                                        <div>
                                            <span class="{0}-hmonth"></span>
                                            <span class="{0}-hyear"></span>
                                        </div>
                                        <div class="{0}-btnnext {0}-arrow">></div>
                                    </div>
                                    {1}
                                    <div class="{0}-daysgrid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="{0}-controls">
                            <span class="{0}-fromdate"></span>
                            <span class="{0}-todate"></span>
                            <div class="{0}-btncontrol {0}-btncancel">{3}</div>
                            <button disabled class="{0}-btncontrol {0}-btnapply">{2}</button>
                        </div>
                    </div>
                </div>
        `.format(cls, week.prop('outerHTML'), config.apply, config.cancel, config.custom, config.month, config.thisY, config.lastY));

        menu = self.find(cls2 + '-menu');
        overlay = self.find(cls2 + '-overlay');
        apply = self.find(cls2 + '-btnapply');
        cancel = self.find(cls2 + '-btncancel');
        grids = self.find(cls2 + '-daysgrid');
        gridL = grids.eq(0);
        gridR = grids.eq(1);
        prevbtn = self.find(cls2 + '-btnprev');
        nextbtn = self.find(cls2 + '-btnnext');
        custom = self.find('[data-period=custom]');
        filters = self.find(cls2 + '-period');

        self.event('click', cls2 + '-overlay', self.hide);
        self.event('click', cls2 + '-menu', e => e.stopPropagation());
        self.event('click', cls2 + '-date', function(e) {

            e.stopPropagation();
            e.preventDefault();

            filters.rclass('selected');
            custom.aclass('selected');

            var el = $(this);

            switch (counter) {
                case 0:
                    op.selectstart(el);
                    break;
                case 1:
                    var end = op.extractdate(el);
                    selected.end = end;

                    if (selected.start.getTime() > selected.end.getTime()) {
                        var start = selected.end;
                        var end = selected.start;
                        selected = { start, end };
                    }

                    range = op.calcrange(selected.start, selected.end);
                    op.fillgrids(now, next);
                    el.aclass('selected');
                    op.showdates(selected);
                    counter++;
                    op.enable();
                    break;
                default:
                    self.find('.datebetween').rclass('datebetween');
                    counter = 0;
                    selected = {};
                    op.selectstart(el);
                    range = [];
                    op.fillgrids(now, next);
                    el.aclass('selected');
                    op.enable();
                    break;
            }
        });

        op.enable();
        op.fillgrids(now, next);
        op.showdates(selected);

        prevbtn.on('click', function () {
            now = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            op.fillgrids(now, next);
        });

        nextbtn.on('click', function () {
            now = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            op.fillgrids(now, next);
        });

        var today = new Date();
        var year = today.getFullYear();

        filters.on('click', function () {

            var el = $(this);

            el.closest(cls2 + '-periods').find('.selected').rclass('selected');
            el.aclass('selected');

            switch (el.attrd('period')) {
                case 'thismonth':
                    now = new Date();
                    next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                    var nextmonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                    var month = today.getMonth();
                    var currentmonthdates = op.monthdates(month, year);
                    var start = currentmonthdates[0];
                    var end = currentmonthdates[currentmonthdates.length - 1];
                    selected = { start, end };
                    range = op.calcrange(start, end);
                    op.fillgrids(today, nextmonth);
                    op.showdates(selected);
                    op.enable();
                    break;
                case 'thisyear':
                    var yearbeg = new Date(year, 0, 1);
                    var nextmonth = new Date(year, yearbeg.getMonth() + 1, 1);
                    var yearend = new Date(year, 11, 31);
                    selected = { start: yearbeg, end: yearend };
                    now = yearbeg;
                    next = nextmonth;
                    range = op.calcrange(yearbeg, yearend);
                    op.fillgrids(yearbeg, nextmonth);
                    op.showdates(selected);
                    op.enable();
                    break;
                case 'lastyear':
                    var prevyear = year - 1;
                    var yearbeg = new Date(prevyear, 0, 1);
                    var nextmonth = new Date(prevyear, yearbeg.getMonth() + 1, 1);
                    var yearend = new Date(prevyear, 11, 31);
                    selected = { start: yearbeg, end: yearend };
                    now = yearbeg;
                    next = nextmonth;
                    range = op.calcrange(yearbeg, yearend);
                    op.fillgrids(yearbeg, nextmonth);
                    op.showdates(selected);
                    op.enable();
                    break;
            }
        });

        cancel.on('click', function () {
            self.hide();
        });

        apply.on('click', function () {
            self.opt.callback(selected.start, selected.end);
            self.hide();
        });
    };

    op.monthdates = function(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    op.getmonthyear = function(date) {
        var month = date.getMonth();
        var year = date.getFullYear();
        return [month, year];
    };

    op.findheader = function(grid) {
        var header = grid.closest(cls2 + '-month');
        var monthHeader = header.find(cls2 + '-hmonth');
        var yearHeader = header.find(cls2 + '-hyear');
        return [monthHeader, yearHeader];
    };

    op.showdates = function(selected) {
        var format = config.dateformat;
        var from = selected?.start?.format(format) || '';
        var to = selected?.end?.format(format) || '';
        self.find(cls2 + '-fromdate').text(from);
        self.find(cls2 + '-todate').text(to);
    };

    op.fillbeg = function(grid, prevmonthdates, weekstartdate, currentmonthdates) {

        if (weekstartdate < 0)
            weekstartdate = 6;

        var rangetimes = range.map((date) => date.getTime());

        var prevmonthtimes = prevmonthdates.map((date) => date.getTime());
        var start = selected?.start?.getTime();
        var end = selected?.end?.getTime();

        for (var i = prevmonthdates.length - weekstartdate; i < prevmonthdates.length; i++) {

            var number = new Date(prevmonthdates[i]).getDate();
            var clss = ['{0}-prevreminder {0}-griditem'];

            if (prevmonthtimes[i] === start)
                clss.push('{0}-selectedstart');
            else if (prevmonthtimes[i] === end)
                clss.push('{0}-selectedend');
            else if (rangetimes.includes(prevmonthdates[i].getTime()))
                clss.push('selected');

            grid.append('<div class="{0}">{1}</div>'.format(clss.join(' ').format(cls), number));
        }
    };

    op.fillmonth = function(grid, dates) {
        var intersection = [];
        var ts;

        for (var i of dates) {
            ts = i.getTime();
            for (var j of range) {
                if (ts === j.getTime())
                    intersection.push(i);
            }
        }

        var timestamps = intersection.map((v) => v.getTime());
        var start = selected?.start?.getTime();
        var end = selected?.end?.getTime();
        var length = Object.keys(selected).length;

        for (var i of dates) {

            var number = new Date(i).getDate();
            ts = i.getTime();

            var clss = ['{0}-date {0}-griditem'];

            if (start === end && ts === timestamps[0])
                clss.push('datebetween singleselected');
            else if (ts === timestamps[0] && ts === start)
                clss.push('datebetween selectedstart');
            else if (ts === timestamps[timestamps.length - 1] && ts === end)
                clss.push('datebetween selectedend');
            else if (length === 1 && ts === start)
                clss.push('datebetween selected');
            else if (timestamps.includes(ts))
                clss.push('datebetween');

            grid.append('<div class="{0}">{1}</div>'.format(clss.join(' ').format(cls), number));
        };
    };

    op.fillend = function(grid, dates, weekstartdate) {

        if (weekstartdate < 0)
            weekstartdate = 6;

        var reminder = 42 - (dates.length + weekstartdate);
        var month = dates[0].getMonth();
        var year = dates[0].getFullYear();
        var rangetimes = range.map((d) => d.getTime());
        var nextmonthstart = new Date(year, month + 1, 1);
        var nextmonth = nextmonthstart.getMonth();
        var nextmonthyear = nextmonthstart.getFullYear();
        var nextmonthdates = op.monthdates(nextmonth, nextmonthyear);
        var nextmonthtimes = nextmonthdates.map((date) => date.getTime());

        for (var i = 0; i < reminder; i++) {

            var has = rangetimes.includes(nextmonthtimes[i]);
            var beg = rangetimes[0];
            var end = rangetimes[rangetimes.length - 1];
            var leftover = nextmonthtimes[i];
            var clss = ['{0}-nextreminder {0}-griditem'];

            if (has && end === leftover)
                clss.push('{0}-selectedend');
            else if (has && beg === leftover)
                clss.push('{0}-selectedstart');
            else if (has)
                clss.push('datebetween');

            grid.append('<div class="{0}">{1}</div>'.format(clss.join(' ').format(cls), i + 1));
        }
    };

    op.calcrange = function(start, end) {

        if (start.getTime() > end.getTime()) {
            var tmp = end;
            start = end;
            end = tmp;
        }

        var date = new Date(start.getTime());
        var dates = [];

        while (date <= end) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };

    op.extractdate = function(el) {
        var monthyear = op.extractmonthyear(el);
        var prevmonthdates = op.monthdates(monthyear[0], monthyear[1]);
        var day = el.text();

        var date = prevmonthdates.find((d) => {
            var num = d.getDate();
            if (num == day)
                return d;
        });

        return date;
    };

    op.extractmonthyear = function(el) {
        var header = el.closest(cls2 + '-month');
        var monthH = header.find(cls2 + '-hmonth').text();
        var yearH = header.find(cls2 + '-hyear').text();
        var month = months.indexOf(monthH);
        var year = +yearH;

        return [month, year];
    };

    op.selectstart = function(el) {
        el.aclass('selected');
        var start = op.extractdate(el);
        selected.start = start;
        op.showdates(selected);
        counter++;
        op.enable();
    };

    op.enable = function() {
        var disabled = Object.values(selected).length !== 2;
        apply.attr('disabled', disabled);
    };

    op.fillgrid = function(grid, date) {

        var monthyear = op.getmonthyear(date);
        var month = monthyear[0];
        var year = monthyear[1];
        var prevmonthstart = new Date(year, month - 1, 1);
        var prevmonth = prevmonthstart.getMonth();
        var prevyear = prevmonthstart.getFullYear();
        var currentmonthdates = op.monthdates(month, year);
        var prevmonthdates = op.monthdates(prevmonth, prevyear);

        var firstweekday = currentmonthdates[0].getDay() - (firstday === 'monday' ? 1 : 0);
        grid.empty();

        op.fillbeg(grid, prevmonthdates, firstweekday, currentmonthdates);
        op.fillmonth(grid, currentmonthdates);
        op.fillend(grid, currentmonthdates, firstweekday);

        var headers = op.findheader(grid);
        headers[0].text(months[month]);
        headers[1].text(year);
    };

    op.fillgrids = function(dates, nextdates) {
        op.fillgrid(gridL, dates);
        op.fillgrid(gridR, nextdates);
    };

    self.show = function(opt) {
        self.aclass('invisible');

        var element = opt.element;
        var offset = opt.element.offset();
        var component = self.find(cls2 + '-menu');
        var top = offset.top + opt.element.height() + 10 + 'px';
        var elementw = element.width();
        var componentw = component.width();
        var css = { top: top };

        if (!opt.align)
            opt.align = 'right';

        switch (opt.align) {
            case 'center':
                css.left = (offset.left + elementw / 2 - componentw / 2 - 18) + 'px';
                break;
            case 'left':
                css.left = offset.left + 'px';
                break;
            case 'right':
                css.left = (offset.left + elementw - componentw - 40) + 'px';
                break;
        }

        component.css(css);

        self.rclass('hidden').aclass(cls + '-visible');
        self.rclass('invisible', 100);

        if (WW <= 768)
            component.css({ top: '', left: '' });

        self.opt = opt;
    };

    self.hide = function (sleep) {
        self.rclass(cls + '-visible').aclass('hidden');
    };

});