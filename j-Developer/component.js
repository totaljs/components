COMPONENT('developer', 'interval:1000;position:topleft', function(self, config, cls) {

	DEF.monitor = true;

	var paths, labels;
	var peak = {};
	var cls2 = '.' + cls;
	var events = {};
	var drag = {};
	var interval = 0;
	var SW = 420;
	var SH = 70;

	self.singleton();
	self.readonly();
	self.blind();

	function diagonal(x1, y1, x2, y2) {
		return 'M' + x1 + ',' + y1 + 'C' + (x1 && x2 ? ((x1 + x2 ) / 2) : 0) + ',' + y1 + ' ' + (x1 && x2 ? ((x1 + x2) / 2) : 0) + ',' + y2 + ' ' + x2 + ',' + y2;
	}

	self.make = function() {
		self.aclass(cls + ' ' + cls + '-' + config.position);
		self.append('<div class="{0}-live"><svg viewbox="0 0 {1} {2}"><g class="{0}-axis"></g><g><path class="{0}-components" /><path class="{0}-binders" /><path class="{0}-set" /><path class="{0}-get" /><path class="{0}-setter" /><path class="{0}-exec" /><path class="{0}-requests" /><path class="{0}-events" /></g></svg></div><div class="{0}-meta"><div class="{0}-label {0}-iset"><span>0</span><i class="fa fa-square"></i>SET <em></em></div><div class="{0}-label {0}-iget"><span>0</span><i class="fa fa-square"></i>GET <em></em></div><div class="{0}-label {0}-icomponents"><span>0</span><i class="fa fa-square"></i>Components <em></em></div><div class="{0}-label {0}-ibinders"><span>0</span><i class="fa fa-square"></i>Binders <em></em></div><div class="{0}-label {0}-isetters"><span>0</span><i class="fa fa-square"></i>SETTER <em></em></div><div class="{0}-label {0}-iexec"><span>0</span><i class="fa fa-square"></i>EXEC <em></em></div><div class="{0}-label {0}-irequests"><span>0</span><i class="fa fa-square"></i>AJAX <em></em></div><div class="{0}-label {0}-ievents"><span>0</span><i class="fa fa-square"></i>Events <em></em></div><div class="clearfix"></div></div><div class="{0}-info"><div class="{0}-label" data-name="components"><span class="{0}-plus">0</span><span class="{0}-minus">0</span><span>0</span><i class="fa fa-info-circle"></i>Components <em></em></div><div class="{0}-label" data-name="binders"><span class="{0}-plus">0</span><span class="{0}-minus">0</span><span>0</span><i class="fa fa-info-circle"></i>Binders <em></em></div><div class="{0}-label" data-name="scopes"><span class="{0}-plus">0</span><i class="fa fa-info-circle"></i>Scopes <em></em></div><div class="{0}-label" data-name="plugins"><span class="{0}-plus">0</span><span class="{0}-minus">0</span><span>0</span><i class="fa fa-info-circle"></i>Plugins <em></em></div><div class="{0}-label" data-name="compilation"><span class="{0}-plus">0</span><span class="{0}-minus">0</span><i class="fa fa-info-circle"></i>Compilation <em></em></div><div class="{0}-label" data-name="events"><span class="{0}-plus">0</span><span class="{0}-minus">0</span><i class="fa fa-info-circle"></i>Events <em></em></div><div class="{0}-label" data-name="watchers"><span class="{0}-plus">0</span><span class="{0}-minus">0</span><i class="fa fa-info-circle"></i>Watchers <em></em></div><div class="{0}-label" data-name="requests"><span>0</span><i class="fa fa-info-circle"></i>Requests <em></em></div><div class="{0}-label" data-name="reset"><span>0</span><i class="fa fa-info-circle"></i>Reset <em></em></div><div class="{0}-label" data-name="validation"><span>0</span><i class="fa fa-info-circle"></i>Validation <em></em></div><div class="{0}-label" data-name="memoryheap"><span>0</span><i class="fa fa-info-circle"></i>Memory heap</div><div class="{0}-label" data-name="memoryused"><span>0</span><i class="fa fa-info-circle"></i>Memory used</div><div class="clearfix"></div></div>'.format(cls, SW, SH - 1));
		self.find('svg');
		paths = self.find('path');
		labels = self.find(cls2 + '-label');
		setInterval(self.process, config.interval);
		self.process();
		var pos = (CACHE('developer') || '').split('x');
		self.css({ left: (pos[0] || '30') + 'px', top: (pos[1] || '30') + 'px' });

		var axis = self.find(cls2 + '-axis');
		var axisw = (SW / 10) >> 0;

		for (var i = 1; i < 10; i++)
			axis.asvg('<line x1="{0}" y1="0" x2="{0}" y2="70" />'.format(axisw * i));

		self.event('mousedown touchstart', events.mdown);
	};

	events.mdown = function(e) {

		if (e.type === 'touchstart')
			e = e.touches[0];

		var $w = $(W);
		$w.on('mousemove touchmove', events.mmove);
		$w.on('mouseup touchend', events.mup);
		var off = self.element.offset();
		drag.is = true;
		drag.x = e.pageX - off.left;
		drag.y = e.pageY - off.top;
	};

	events.mmove = function(e) {
		if (drag.is) {

			if (e.type === 'touchmove')
				e = e.touches[0];

			var x = e.pageX - drag.x;
			var y = e.pageY - drag.y;
			self.css({ left: x, top: y });
		}
	};

	events.mup = function() {
		drag.is = false;
		var $w = $(W);
		$w.off('mousemove', events.mmove);
		$w.off('mouseup', events.mup);
		CACHE('developer', (self.css('left') + 'x' + self.css('top')).replace(/px/g, ''), '1 month');
	};

	self.render = function(path, points, max, index) {

		var h = SH - 10;
		var builder = [];
		var bar = SW / 10 >> 0;
		var pp = [];

		pp.push({ x: -20, y: h });

		for (var i = 0; i < 11; i++) {
			var val = points[i] || 0;
			var p = val && max ? Math.round((val / max) * 100) : 0;
			var y = (p ? (h - ((h / 100) * p)) : h) + index;
			pp.push({ x: i * bar, y: y + 10 });
		}

		pp.push({ x: SW + 20, y: h });

		for (var i = 0; i < (pp.length - 1); i++) {
			var d = diagonal(pp[i].x, pp[i].y, pp[i + 1].x, pp[i + 1].y);
			builder.push(d);
		}

		path.attr('d', builder.join(' '));
	};

	self.max = function() {

		var max = 0;
		var arg = arguments;

		for (var i = 0; i < arg.length; i++) {

			var type = arg[i];
			var obj = M.performance[type];

			if (!peak[type]) {
				peak[type] = [];
				for (var j = 0; j < 10; j++)
					peak[type].push(0);
			}

			peak[type].shift();
			peak[type].push(obj.peak || 0);

			var label = labels.filter(cls2 + '-i' + type );
			label.find('> span').html(obj.peak);

			label.find('em').html(obj.diff && obj.peak ? self.time(obj.diff) : '');

			var arr = peak[type];
			for (var j = 0; j < arr.length; j++) {
				if (max < arr[j])
					max = arr[j];
			}
		}

		return max;
	};

	self.time = function(val) {

		var type = 'ms';

		if (val > 60000) {
			val = val / 60000 >> 0;
			type = 'm';
		} else if (val > 1000) {
			val = val / 1000 >> 0;
			type = 's';
		}

		return '(' + val + type + ')';
	};

	self.renderpeak = function(type, max, index, changed) {
		var path = paths.filter(cls2 + '-' + type);
		if (path.length)
			self.render(path, peak[type], max, index);
		labels.filter(cls2 + '-i' + type).tclass(cls + '-changed', changed === 1);
	};

	self.size = function(value) {
		var type = 'bytes';

		if (value > 1023) {
			value = value / 1024;
			type = 'KB';
		}

		if (value > 1023) {
			value = value / 1024;
			type = 'MB';
		}

		if (value > 1023) {
			value = value / 1024;
			type = 'GB';
		}

		if (value > 1023) {
			value = value / 1024;
			type = 'TB';
		}

		return value.format(2) + ' ' + type;
	};

	self.bindinfo = function(name) {
		var el = labels.filter(cls2 + '-label[data-name="' + name + '"]');
		var span = el.find('span');
		var perf = M.performance[name];
		var time = true;

		switch (name) {
			case 'components':
			case 'plugins':
			case 'binders':
				span.eq(0).html('+' + (perf.add || 0));
				span.eq(1).html('-' + (perf.rem || 0));
				span.eq(2).html((name === 'plugins' ? Object.keys(PLUGINS).length : name === 'binders' ? M.binders.length : M.components.length) + 'x');
				break;
			case 'compilation':
			case 'events':
			case 'watchers':
				span.eq(0).html('+' + (perf.add || 0));
				span.eq(1).html('-' + (perf.rem || 0));
				break;
			case 'scopes':
				span.eq(0).html('+' + (perf.add || 0));
				break;
			case 'validation':
			case 'reset':
			case 'requests':
				span.eq(0).html((perf.count || 0) + 'x');
				break;
			case 'memoryused':
				span.eq(0).html(W.performance && W.performance.memory ? self.size(performance.memory.usedJSHeapSize) : DEF.empty);
				time = 0;
				break;
			case 'memoryheap':
				span.eq(0).html(W.performance && W.performance.memory ? self.size(performance.memory.totalJSHeapSize) : DEF.empty);
				time = 0;
				break;
		}

		if (time)
			el.find('em').html(perf.diff && perf.peak ? self.time(perf.diff) : '');
	};

	self.process = function() {

		interval++;

		var perf = M.performance;
		var keys = Object.keys(perf.changes);
		var live = ['set', 'get', 'components', 'binders', 'setters', 'exec', 'requests', 'events'];

		var max = self.max.apply(self, live);
		for (var i = 0; i < live.length; i++)
			self.renderpeak(live[i], max, i, perf.changes[live[i]]);

		self.bindinfo('components');
		self.bindinfo('binders');
		self.bindinfo('plugins');
		self.bindinfo('compilation');
		self.bindinfo('validation');
		self.bindinfo('reset');
		self.bindinfo('scopes');
		self.bindinfo('events');
		self.bindinfo('watchers');
		self.bindinfo('requests');
		self.bindinfo('memoryheap');
		self.bindinfo('memoryused');

		if (interval % 2 === 0) {
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				perf[key].peak = 0;
			}
			perf.changes = {};
		}
	};
});