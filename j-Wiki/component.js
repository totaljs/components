COMPONENT('wiki', 'title:Wiki', function(self, config) {

	var cls = 'ui-wiki';
	var cls2 = '.ui-wiki';
	var etopics, container;

	self.singleton();
	self.readonly();

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.append('<div class="{0}-title"><button><i class="fa fa-times"></i></button><span></span></div><div class="{0}-topics"><div class="{0}-topics-body markdown"></div></div>'.format(cls));
		etopics = self.find(cls2 + '-topics-body');
		container = self.find(cls2 + '-topics');

		self.scrollbar = SCROLLBAR(self.find(cls2 + '-topics'), { visibleY: !!config.scrollbarY });
		self.scrollleft = self.scrollbar.scrollLeft;
		self.scrolltop = self.scrollbar.scrollTop;
		self.scrollright = self.scrollbar.scrollRight;
		self.scrollbottom = self.scrollbar.scrollBottom;

		$(W).on('resize', self.resize);
		self.resize();

		self.event('click', 'label', function(e) {

			var el = $(this);
			var index = +el.attrd('index');
			var parent = el.parent();
			parent.tclass(cls + '-visible');

			if (parent.hclass(cls + '-visible')) {
				el = parent.find(cls2 + '-topic-body');
				if (!el.html().length) {
					var item = GET(config.datasource)[index];
					el.html(item ? (item.body || '').markdown() : '');
					self.refresh_markdown(el);
				}
			}

			self.scrollbar.resize();
		});

		self.event('click', 'button', function() {
			self.set(false);
		});
	};

	self.resize = function() {
		container.css('height', WH - 50 - self.element.offset().top);
		self.scrollbar.resize();
	};

	self.rebind = function(path, value) {
		var builder = [];
		var template = '<div class="{0}-topic"><label data-index="{1}"><i class="fa"></i>{2}</label><div class="{0}-topic-body"></div></div>';
		for (var i = 0; i < (value || EMPTYARRAY).length; i++)
			builder.push(template.format(cls, i, value[i].name));
		etopics.html(builder.join(''));
		self.resize();
	};

	self.configure = function(key, value) {
		if (key === 'datasource')
			self.datasource(value, self.rebind);
		else if (key === 'title')
			self.find(cls2 + '-title span').html(value);
	};

	self.setter = function(value) {
		self.tclass('hidden', !value);
		if (value) {
			self.resize();
			setTimeout(self.resize, 1000);
		}
	};

	self.refresh_markdown = function(el) {
		self.markdown_linechart(el.find('.lang-linechart'));
		self.markdown_barchart(el.find('.lang-barchart'));
		self.markdown_video(el.find('.lang-video'));
		self.markdown_iframe(el.find('.lang-iframe'));
		el.find('pre code').each(FN('(i,b) => W.hljs && W.hljs.highlightBlock(b)'));
		el.find('a').each(function() {
			var el = $(this);
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
				el.attr('href', '#' + (beg + el.text().toLowerCase().replace(/[^\w]+/g, '-') + end).replace(/-{2,}/g, '-'));
			}
		});
	};

	self.markdown_barchart = function(selector) {
		selector.each(function() {

			var el = $(this);
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
	};

	self.markdown_linechart = function(selector) {
		selector.each(function() {

			var el = $(this);
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
	};

	self.markdown_video = function(selector) {
		selector.each(function() {
			var el = $(this);
			var html = el.html();
			if (html.indexOf('youtube') !== -1) {
				el.parent().replaceWith('<div class="video"><iframe src="https://www.youtube.com/embed/' + html.split('v=')[1] + '" frameborder="0" allowfullscreen></iframe></div>');
			} else if (html.indexOf('vimeo') !== -1) {
				el.parent().replaceWith('<div class="video"><iframe src="//player.vimeo.com/video/' + html.substring(html.lastIndexOf('/') + 1) + '" frameborder="0" allowfullscreen></iframe></div>');
			}
		});
	};

	self.markdown_iframe = function(selector) {
		selector.each(function() {
			var el = $(this);
			el.parent().replaceWith('<div class="iframe">' + el.html().replace(/&lt;/g, '<').replace(/&gt;/g, '>') + '</div>');
		});
	};

}, ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/highlight.min.js', '//cdnjs.cloudflare.com/ajax/libs/apexcharts/2.2.4/apexcharts.min.js']);

if (String.prototype.markdown == null) {
	(function Markdown() {

		var links = /(!)?\[.*?\]\(.*?\)/g;
		var links2 = /&lt;(https|http)+:\/\/.*?&gt;/g;
		var imagelinks = /\[!\[.*?\]\(.*?\)\]\(.*?\)/g;
		var format = /__.*?__|_.*?_|\*\*.*?\*\*|\*.*?\*|~~.*?~~|~.*?~/g;
		var ordered = /^([a-z|0-9]{1,2}\.\s)|-\s/i;
		var orderedsize = /^(\s|\t)+/;
		var code = /`.*?`/g;
		var encodetags = /<|>/g;
		var formatclean = /_|\*|~/g;
		var regid = /[^\w]+/g;
		var regdash = /-{2,}/g;
		var regtags = /<\/?[^>]+(>|$)/g;
		var regicons = /(^|[^\w]):[a-z-]+:([^\w]|$)/g;

		var encode = function(val) {
			return '&' + (val === '<' ? 'lt' : 'gt') + ';';
		};

		function markdown_code(value) {
			return '<code>' + value.substring(1, value.length - 1) + '</code>';
		}

		function markdown_imagelinks(value) {
			var end = value.indexOf(')') + 1;
			var img = value.substring(1, end);
			return '<a href="' + value.substring(end + 2, value.length - 1) + '">' + markdown_links(img) + '</a>';
		}

		function markdown_table(value, align, ishead) {

			var columns = value.substring(1, value.length - 1).split('|');
			var builder = '';

			for (var i = 0; i < columns.length; i++) {
				var column = columns[i].trim();
				if (column.charAt(0) == '-')
					continue;
				var a = align[i];
				builder += '<' + (ishead ? 'th' : 'td') + (a && a !== 'left' ? (' class="' + a + '"') : '') + '>' + column + '</' + (ishead ? 'th' : 'td') + '>';
			}

			return '<tr>' + builder + '</tr>';
		}

		function markdown_links(value) {
			var end = value.lastIndexOf(']');
			var img = value.charAt(0) === '!';
			var text = value.substring(img ? 2 : 1, end);
			var link = value.substring(end + 2, value.length - 1);
			var responsive = true;

			if (img) {
				if (text.charAt(0) === '+') {
					responsive = false;
					text = text.substring(1);
				}
			}

			return img ? ('<img src="' + link + '" alt="' + text + '"' + (responsive ? ' class="img-responsive"' : '') + ' border="0" />') : ('<a href="' + link + '">' + text + '</a>');
		}

		function markdown_links2(value)	{
			value = value.substring(4, value.length - 4);
			return '<a href="' + value + '">' + value + '</a>';
		}

		function markdown_format(value) {
			switch (value.charAt(0)) {
				case '_':
					return '<strong>' + value.replace(formatclean, '') + '</strong>';
				case '*':
					return '<em>' + value.replace(formatclean, '') + '</em>';
				case '~':
					return '<strike>' + value.replace(formatclean, '') + '</strike>';
			}
			return value;
		}

		function markdown_id(value) {

			var end = '';
			var beg = '';

			if (value.charAt(0) === '<')
				beg = '-';

			if (value.charAt(value.length - 1) === '>')
				end = '-';

			return (beg + value.replace(regtags, '').toLowerCase().replace(regid, '-') + end).replace(regdash, '-');
		}

		function markdown_icon(value) {

			var beg = -1;
			var end = -1;

			for (var i = 0; i < value.length; i++) {
				var code = value.charCodeAt(i);
				if (code === 58) {
					if (beg === -1)
						beg = i + 1;
					else
						end = i;
				}
			}

			return value.substring(0, beg - 1) + '<i class="fa fa-' + value.substring(beg, end) + '"></i>' + value.substring(end + 1);
		}

		String.prototype.markdown = function() {
			var lines = this.split('\n');
			var builder = [];
			var ul = [];
			var table = false;
			var iscode = false;
			var ishead = false;
			var prev;
			var prevsize = 0;
			var tmp;

			var closeul = function() {
				while (ul.length)
					builder.push('</' + ul.pop() + '>');
			};

			for (var i = 0, length = lines.length; i < length; i++) {

				lines[i] = lines[i].replace(encodetags, encode);

				if (lines[i].substring(0, 3) === '```') {

					if (iscode) {
						builder.push('</code></pre>');
						iscode = false;
						continue;
					}

					closeul();
					iscode = true;
					tmp = '<pre><code class="lang-' + lines[i].substring(3) + '">';
					prev = 'code';
					continue;
				}

				if (iscode) {
					builder.push(tmp + lines[i]);
					if (tmp)
						tmp = '';
					continue;
				}

				var line = lines[i].replace(imagelinks, markdown_imagelinks).replace(links, markdown_links).replace(links2, markdown_links2).replace(format, markdown_format).replace(code, markdown_code).replace(regicons, markdown_icon);
				if (!line) {
					if (table) {
						table = null;
						builder.push('</tbody></table>');
					}
				}

				if (line === '' && lines[i - 1] === '') {
					closeul();
					builder.push('<br />');
					prev = 'br';
					continue;
				}

				if (line[0] === '|') {
					closeul();
					if (!table) {
						var next = lines[i + 1];
						if (next[0] === '|') {
							table = [];
							var columns = next.substring(1, next.length - 1).split('|');
							for (var j = 0; j < columns.length; j++) {
								var column = columns[j].trim();
								var align = 'left';
								if (column.charAt(column.length - 1) === ':')
									align = column[0] === ':' ? 'center' : 'right';
								table.push(align);
							}
							builder.push('<table class="table table-bordered"><thead>');
							prev = 'table';
							ishead = true;
							i++;
						} else
							continue;
					}

					if (ishead)
						builder.push(markdown_table(line, table, true) + '</thead><tbody>');
					else
						builder.push(markdown_table(line, table));
					ishead = false;
					continue;
				}

				if (line.charAt(0) === '#') {

					closeul();

					if (line.substring(0, 2) === '# ') {
						tmp = line.substring(2).trim();
						builder.push('<h1 id="' + markdown_id(tmp) + '">' + tmp + '</h1>');
						prev = '#';
						continue;
					}

					if (line.substring(0, 3) === '## ') {
						tmp = line.substring(3).trim();
						builder.push('<h2 id="' + markdown_id(tmp) + '">' + tmp + '</h2>');
						prev = '##';
						continue;
					}

					if (line.substring(0, 4) === '### ') {
						tmp = line.substring(4).trim();
						builder.push('<h3 id="' + markdown_id(tmp) + '">' + tmp + '</h3>');
						prev = '###';
						continue;
					}

					if (line.substring(0, 5) === '#### ') {
						tmp = line.substring(5).trim();
						builder.push('<h4 id="' + markdown_id(tmp) + '">' + tmp + '</h4>');
						prev = '####';
						continue;
					}

					if (line.substring(0, 6) === '##### ') {
						tmp = line.substring(6).trim();
						builder.push('<h5 id="' + markdown_id(tmp) + '">' + tmp + '</h5>');
						prev = '#####';
						continue;
					}
				}

				tmp = line.substring(0, 3);

				if (tmp === '---' || tmp === '***') {
					prev = 'hr';
					builder.push('<hr class="line' + (tmp.charAt(0) === '-' ? '1' : '2') + '" />');
					continue;
				}

				if (line.substring(0, 5) === '&gt; ') {
					builder.push('<blockquote>' + line.substring(5).trim() + '</blockquote>');
					prev = '>';
					continue;
				}

				var tmpline = line.trim();

				if (ordered.test(tmpline)) {

					var size = line.match(orderedsize);
					if (size)
						size = size[0].length;
					else
						size = 0;

					var append = false;

					if (prevsize !== size) {
						// NESTED
						if (size > prevsize) {
							prevsize = size;
							append = true;
							var index = builder.length - 1;
							builder[index] = builder[index].substring(0, builder[index].length - 5);
							prev = '';
						} else {
							// back to normal
							prevsize = size;
							builder.push('</' + ul.pop() + '>');
						}
					}

					var type = tmpline.charAt(0) === '-' ? 'ul' : 'ol';
					if (prev !== type) {
						var subtype;
						if (type === 'ol')
							subtype = tmpline.charAt(0);
						builder.push('<' + type + (subtype ? (' type="' + subtype + '"') : '') + '>');
						ul.push(type + (append ? '></li' : ''));
						prev = type;
						prevsize = size;
					}

					builder.push('<li>' + (type === 'ol' ? tmpline.substring(tmpline.indexOf('.') + 1) : tmpline.substring(2)).trim().replace(/\[x\]/g, '<i class="fa fa-check-square green"></i>').replace(/\[\s\]/g, '<i class="far fa-square"></i>') + '</li>');

				} else {
					closeul();
					line && builder.push('<p>' + line.trim() + '</p>');
					prev = 'p';
				}
			}

			closeul();
			table && builder.push('</tbody></table>');
			iscode && builder.push('</code></pre>');

			return '<div class="markdown">' + builder.join('\n') + '</div>';
		};

	})();
}