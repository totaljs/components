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
	var idle = 0;
	var limits = {};
	var cache = {};

	self.singleton();
	self.readonly();
	self.blind();

	function diagonal(x1, y1, x2, y2) {
		return 'M' + x1 + ',' + y1 + 'C' + (x1 && x2 ? ((x1 + x2 ) / 2) : 0) + ',' + y1 + ' ' + (x1 && x2 ? ((x1 + x2) / 2) : 0) + ',' + y2 + ' ' + x2 + ',' + y2;
	}

	self.make = function() {
		self.aclass(cls + ' ' + cls + '-' + config.position);
		self.append('<div class="{0}-live"><svg viewbox="0 0 {1} {2}"><g class="{0}-axis"></g><g><path class="{0}-components" /><path class="{0}-binders" /><path class="{0}-set" /><path class="{0}-get" /><path class="{0}-setter" /><path class="{0}-exec" /><path class="{0}-requests" /><path class="{0}-events" /><path class="{0}-cmd" /><path class="{0}-returns" /></g></svg></div><div class="{0}-meta"><div class="{0}-label {0}-iset"><span>0</span><i class="{4}"></i>SET <em></em></div><div class="{0}-label {0}-iget"><span>0</span><i class="{4}"></i>GET <em></em></div><div class="{0}-label {0}-icomponents"><span>0</span><i class="{4}"></i>&lt;ui-component&gt; <em></em></div><div class="{0}-label {0}-ibinders"><span>0</span><i class="{4}"></i>&lt;ui-bind&gt; <em></em></div><div class="{0}-label {0}-isetters"><span>0</span><i class="{4}"></i>SETTER <em></em></div><div class="{0}-label {0}-iexec"><span>0</span><i class="{4}"></i>EXEC <em></em></div><div class="{0}-label {0}-irequests"><span>0</span><i class="{4}"></i>AJAX <em></em></div><div class="{0}-label {0}-ievents"><span>0</span><i class="{4}"></i>Events <em></em></div><div class="clearfix"></div><div class="{0}-hr"></div><div class="{0}-pluginspeak {0}-label" data-name="pluginspeak"><span>---</span><i class="ti ti-rocket"></i>Plugins <em></em></div><div class="{0}-idle"><i class="ti ti-clock"></i> Idle time: <span></span></div></div><div class="{0}-info"><div class="{0}-label" data-name="components"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><span>+0</span><i class="ti ti-info-circle"></i>&lt;ui-component&gt; <em></em></div><div class="{0}-label" data-name="binders"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><span>0</span><i class="ti ti-info-circle"></i>&lt;ui-bind&gt; <em></em></div><div class="{0}-label" data-name="scopes"><span class="{0}-plus">+0</span><i class="ti ti-info-circle"></i>&lt;ui-plugin&gt; <em></em></div><div class="{0}-label" data-name="plugins"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><span>0</span><i class="ti ti-info-circle"></i>Plugins <em></em></div><div class="{0}-label" data-name="compilation"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><i class="ti ti-info-circle"></i>Compilation <em></em></div><div class="{0}-label" data-name="lazy"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><i class="ti ti-info-circle"></i>Lazy components <em></em></div><div class="{0}-label" data-name="events"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><i class="ti ti-info-circle"></i>Events <em></em></div><div class="{0}-label" data-name="watchers"><span class="{0}-plus">+0</span><span class="{0}-minus">-0</span><i class="ti ti-info-circle"></i>Watchers <em></em></div><div class="{0}-label" data-name="scrollbars"><span>0x</span><i class="ti ti-info-circle"></i>Custom scrollbars</div><div class="{0}-label" data-name="requests"><span>0x</span><i class="ti ti-info-circle"></i>Requests <em></em></div><div class="{0}-label" data-name="reset"><span>0x</span><i class="ti ti-info-circle"></i>Reset <em></em></div><div class="{0}-label" data-name="validation"><span>0x</span><i class="ti ti-info-circle"></i>Validation <em></em></div><div class="{0}-label" data-name="memoryheap"><span>0</span><i class="ti ti-info-circle"></i>Memory heap</div><div class="{0}-label" data-name="memoryused"><span>0</span><i class="ti ti-info-circle"></i>Memory used</div><div class="clearfix"></div></div><div class="{0}-version">Total.js UI Library <b>v{3}</b></div><div class="{0}-clear"><i class="ti ti-trash"></i> Reset stats</div>'.format(cls, SW, SH - 1, M.version, 'ti ti-square-alt'));
		self.find('svg');
		paths = self.find('path');
		labels = self.find(cls2 + '-label');
		setInterval(self.process, config.interval);
		self.process();
		var pos = (CACHE('developer') || '').split('x');
		self.css({ left: (pos[0] || '30') + 'px', top: (pos[1] || '30') + 'px' });

		var axis = self.find(cls2 + '-axis');
		var axisw = (SW / 20) >> 0;

		for (var i = 1; i < 20; i++)
			axis.asvg('<line x1="{0}" y1="0" x2="{0}" y2="70" />'.format(axisw * i));

		self.event('mousedown touchstart', events.mdown);
		self.event('click', cls2 + '-clear', function() {
			var keys = Object.keys(M.performance);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var perf = M.performance[key];
				if (perf.add)
					perf.add = 0;
				if (perf.rem)
					perf.rem = 0;
				if (perf.count)
					perf.count = 0;
			}
			limits = {};
			cache = {};
		});
	};

	events.mdown = function(e) {

		if (e.type === 'touchstart')
			e = e.touches[0];

		var $w = $(W);
		$w.on('mousemove touchmove', events.mmove);
		$w.on('mouseup touchend', events.mup);
		var off = self.element.offset();
		var $w = $(W);
		drag.is = true;
		drag.scrollX = $w.scrollLeft();
		drag.scrollY = $w.scrollTop();
		drag.x = e.pageX - off.left;
		drag.y = e.pageY - off.top;
	};

	events.mmove = function(e) {
		if (drag.is) {

			if (e.type === 'touchmove')
				e = e.touches[0];
			var x = e.pageX - drag.x - drag.scrollX;
			var y = e.pageY - drag.y - drag.scrollY;
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

		var h = SH - 12;
		var builder = [];
		var bar = SW / 10 >> 0;
		var pp = [];

		pp.push({ x: -20, y: h });

		for (var i = 0; i < 11; i++) {
			var val = points[i] || 0;
			var p = val && max ? Math.round((val / max) * 100) : 0;
			var y = (p ? (h - ((h / 100) * p)) : h) + (index * 2);
			pp.push({ x: (i * bar) + 2, y: y + 12 });
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

			if (!cache[type])
				cache[type] = {};

			if (limits[type] == null || limits[type] < obj.peak) {
				cache[type].peak = -1;
				limits[type] = obj.peak || 0;
			}

			if (cache[type].peak !== obj.peak)
				label.find('> span').html((obj.peak || 0) + '/<i class="ti ti-long-arrow-up"></i>' + limits[type]);

			if (cache[type].diff !== obj.diff)
				label.find('em').html(obj.diff && obj.peak ? self.time(obj.diff) : '');

			cache[type].peak = obj.peak;
			cache[type].diff = obj.diff;

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
		} else if (val > 999) {
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

		var k = 'info_' + name;
		var el = labels.filter(cls2 + '-label[data-name="' + name + '"]');
		var span = el.find('span');
		var perf = M.performance[name];
		var time = 1;
		var tmp;

		if (!cache[k])
			cache[k] = {};

		switch (name) {
			case 'lazy':

				if (cache[k].add !== perf.add) {
					cache[k].add = perf.add;
					span.eq(0).html('+' + (perf.add || 0));
				}

				if (cache[k].rem !== perf.rem) {
					cache[k].rem = perf.rem;
					span.eq(1).html('-' + (perf.rem || 0));
				}

				break;
			case 'components':
			case 'plugins':
			case 'binders':

				if (cache[k].add !== perf.add) {
					cache[k].add = perf.add;
					span.eq(0).html('+' + (perf.add || 0));
				}

				if (cache[k].rem !== perf.rem) {
					cache[k].rem = perf.rem;
					span.eq(1).html('-' + (perf.rem || 0));
				}

				tmp = (name === 'plugins' ? Object.keys(PLUGINS).length : name === 'binders' ? M.binders.length : M.components.length);
				if (cache[k].length !== tmp) {
					cache[k].length = tmp;
					span.eq(2).html(tmp + 'x');
				}

				break;
			case 'compilation':
			case 'events':
			case 'watchers':

				if (cache[k].add !== perf.add) {
					cache[k].add = perf.add;
					span.eq(0).html('+' + (perf.add || 0));
				}

				if (cache[k].rem !== perf.rem) {
					cache[k].rem = perf.rem;
					span.eq(1).html('-' + (perf.rem || 0));
				}

				break;
			case 'scopes':
				if (cache[k].add !== perf.add) {
					cache[k].add = perf.add;
					span.eq(0).html('+' + (perf.add || 0));
				}
				break;
			case 'pluginspeak':
				perf = M.performance.plugins;
				if (cache[k].peak == null || cache[k].peak !== perf.peak) {
					cache[k].peak = perf.peak;
					if (limits[name] == null || limits[name] < perf.peak)
						limits[name] = perf.peak || 0;
					span.eq(0).html((perf.peak || 0) + '/<i class="ti ti-long-arrow-up"></i>' + limits[name]);
					el.tclass(cls + '-changed', perf.peak > 0);
				}
				break;
			case 'validation':
			case 'reset':
			case 'requests':
				if (cache[k].count !== perf.count) {
					cache[k].count = perf.count;
					span.eq(0).html((perf.count || 0) + 'x');
				}
				break;
			case 'memoryused':
				tmp = W.performance && W.performance.memory ? self.size(performance.memory.usedJSHeapSize) : DEF.empty;
				if (cache[k]) {
					cache[k] = tmp;
					span.eq(0).html(tmp);
				}
				time = 0;
				break;
			case 'memoryheap':
				tmp = W.performance && W.performance.memory ? self.size(performance.memory.totalJSHeapSize) : DEF.empty;
				if (cache[k]) {
					cache[k] = tmp;
					span.eq(0).html(tmp);
				}
				time = 0;
				break;
		}

		if (time && cache[k].time !== time) {
			cache[k].time = time;
			el.find('em').html(perf.diff && perf.peak ? self.time(perf.diff) : '');
		}
	};

	self.process = function() {

		interval++;

		var perf = M.performance;
		if (!perf)
			return;

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
		self.bindinfo('lazy');
		self.bindinfo('pluginspeak');
		self.bindinfo('memoryheap');
		self.bindinfo('memoryused');

		labels.filter(cls2 + '-label[data-name="scrollbars"] span').html(M.scrollbars.length + 'x');

		if (interval % 2 === 0) {
			idle++;
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (perf[key].peak) {
					perf[key].peak = 0;
					idle = 0;
				}
			}
			perf.changes = {};
		}

		self.find(cls2 + '-idle span').html(self.time(idle * 1000));
	};
});