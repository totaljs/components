COMPONENT('markdownpreview', 'showsecret:Show secret data;hidesecret:Hide secret data', function(self, config) {

	var cls = 'ui-markdownpreview';
	var cls2  = '.' + cls;
	var elcache;
	var elbody;

	self.bindvisible();
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.append('<div class="{0}-body"></div><div class="{0}-cache hidden"></div>'.format(cls));
		elcache = self.find(cls2 + '-cache');
		elbody = self.find(cls2 + '-body');
		self.event('click', '.showsecret', function() {
			var el = $(this);
			var next = el.next();
			next.tclass('hidden');

			var is = next.hclass('hidden');
			var icons = el.find('i');
			icons.eq(0).tclass('fa-unlock', !is).tclass('fa-lock', is);
			icons.eq(1).tclass('fa-angle-up', !is).tclass('fa-angle-down', is);
			el.find('b').html(config[(is ? 'show' : 'hide') + 'secret']);
		});
	};

	self.redraw = function(el) {

		var markdown_id = function(value) {
			var end = '';
			var beg = '';
			if (value.charAt(0) === '<')
				beg = '-';
			if (value.charAt(value.length - 1) === '>')
				end = '-';
			return (beg + value.slug() + end).replace(/-{2,}/g, '-');
		};

		el.find('.lang-secret').each(function() {
			var el = $(this);
			el.parent().replaceWith('<div class="secret"><span class="showsecret"><i class="fa fa-lock"></i><i class="fa pull-right fa-angle-down"></i><b>' + config.showsecret + '</b></span><div class="hidden">' + el.html().trim().markdown({ code: false, wrap: false }) +'</div></div>');
		});

		el.find('.lang-video').each(function() {
			var t = this;
			if (t.$mdloaded)
				return;
			t.$mdloaded = 1;
			var el = $(t);
			var html = el.html();
			if (html.indexOf('youtube') !== -1)
				el.parent().replaceWith('<div class="video"><iframe src="https://www.youtube.com/embed/' + html.split('v=')[1] + '" frameborder="0" allowfullscreen></iframe></div>');
			else if (html.indexOf('vimeo') !== -1)
				el.parent().replaceWith('<div class="video"><iframe src="//player.vimeo.com/video/' + html.substring(html.lastIndexOf('/') + 1) + '" frameborder="0" allowfullscreen></iframe></div>');
		});

		el.find('.lang-barchart').each(function() {

			var t = this;
			if (t.$mdloaded)
				return;

			t.$mdloaded = 1;
			var el = $(t);
			var arr = el.html().split('\n').trim();
			var series = [];
			var categories = [];
			var y = '';

			for (var i = 0; i < arr.length; i++) {
				var line = arr[i].split('|').trim();
				for (var j = 1; j < line.length; j++) {
					if (i === 0)
						series.push({ name: line[j], data: [] });
					else
						series[j - 1].data.push(+line[j]);
				}
				if (i)
					categories.push(line[0]);
				else
					y = line[0];
			}

			var options = {
				chart: {
					height: 300,
					type: 'bar',
				},
				yaxis: { title: { text: y }},
				series: series,
				xaxis: { categories: categories, },
				fill: { opacity: 1 },
			};

			var chart = new ApexCharts($(this).parent().empty()[0], options);
			chart.render();
		});

		el.find('.lang-linerchar').each(function() {

			var t = this;
			if (t.$mdloaded)
				return;
			t.$mdloaded = 1;

			var el = $(t);
			var arr = el.html().split('\n').trim();
			var series = [];
			var categories = [];
			var y = '';

			for (var i = 0; i < arr.length; i++) {
				var line = arr[i].split('|').trim();
				for (var j = 1; j < line.length; j++) {
					if (i === 0)
						series.push({ name: line[j], data: [] });
					else
						series[j - 1].data.push(+line[j]);
				}
				if (i)
					categories.push(line[0]);
				else
					y = line[0];
			}

			var options = {
				chart: {
					height: 300,
					type: 'line',
				},
				yaxis: { title: { text: y }},
				series: series,
				xaxis: { categories: categories, },
				fill: { opacity: 1 },
			};

			var chart = new ApexCharts($(this).parent().empty()[0], options);
			chart.render();
		});

		el.find('.lang-iframe').each(function() {

			var t = this;
			if (t.$mdloaded)
				return;
			t.$mdloaded = 1;

			var el = $(t);
			el.parent().replaceWith('<div class="iframe">' + el.html().replace(/&lt;/g, '<').replace(/&gt;/g, '>') + '</div>');
		});

		el.find('pre code').each(function(i, block) {
			var t = this;
			if (t.$mdloaded)
				return;
			t.$mdloaded = 1;
			hljs.highlightBlock(block);
		});

		el.find('a').each(function() {

			var t = this;
			if (t.$mdloaded)
				return;
			t.$mdloaded = 1;
			var el = $(t);
			var href = el.attr('href');
			href.substring(0, 1) !== '/' && el.attr('target', '_blank');
			if (href === '#') {
				var beg = '';
				var end = '';
				var text = el.html();
				if (text.substring(0, 1) === '<')
					beg = '-';
				if (text.substring(text.length - 1) === '>')
					end = '-';
				el.attr('href', '#' + (beg + markdown_id(el.text()) + end));
			}
		});

		el.find('.code').rclass('hidden');
	};

	self.setter = function(value) {

		// Waits for markdown component
		if (!String.prototype.markdown) {
			setTimeout(self.setter, 500, value);
			return;
		}

		var cache = {};
		var html = (value || '').markdown();
		var vdom = $(html);

		elcache.empty();

		elbody.find('.code').each(function() {
			var t = this;
			cache[t.getAttribute('data-checksum')] = t;
			elcache[0].appendChild(t);
		});

		elbody.find('img').each(function() {
			var t = this;
			cache[t.getAttribute('data-checksum')] = t;
			elcache[0].appendChild(t);
		});

		vdom.find('.code').each(function() {
			var t = this;
			var h = 'code' + HASH(t.outerHTML, true) + '';
			if (cache[h])
				$(t).replaceWith(cache[h]);
			else
				t.setAttribute('data-checksum', h);
		}).rclass('hidden');

		vdom.find('img').each(function() {
			var t = this;
			var h = 'img' + HASH(t.outerHTML, true) + '';
			if (cache[h])
				$(t).replaceWith(cache[h]);
			else
				t.setAttribute('data-checksum', h);
		});

		elbody.html(vdom);
		self.redraw(elbody);
		config.render && EXEC(self.makepath(config.render), elbody);
	};

	self.readingtime = function() {
		var arr = self.find('h1,h2,h3,h4,h5,p,li');
		var sum = 0;
		for (var i = 0; i < arr.length; i++) {
			var text = $(arr[i]).text();
			var words = text.split(' ');
			for (var j = 0; j < words.length; j++) {
				var word = words[j];
				sum += (word.length * 0.450) / 10; // Reading time for 10 characters word is 450 ms
			}
		}
		return (sum / 60) >> 0;
	};

}, ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.8.5/apexcharts.min.js']);