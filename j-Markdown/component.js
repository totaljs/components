COMPONENT('markdown', 'highlight:true;charts:false', function (self, config) {

	self.readonly();
	self.singleton();
	self.blind();
	self.nocompile();

	self.make = function() {

		if (config.highlight) {
			IMPORT('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/highlight.min.js');
			IMPORT('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/styles/github.min.css');
		}

		if (config.charts)
			IMPORT('https://cdn.componentator.com/apexcharts.min@310.js');

		// Remove from DOM because Markdown is used as a String prototype and Tangular helper
		setTimeout(function() {
			self.remove();
		}, 500);

		$(document).on('click', '.markdown-showsecret,.markdown-showblock', function() {
			var el = $(this);
			var next = el.next();
			next.tclass('hidden');
			var is = next.hclass('hidden');
			var icons = el.find('i');
			if (el.hclass('markdown-showsecret')) {
				icons.eq(0).tclass('ti-unlock', !is).tclass('ti-lock', is);
				icons.eq(1).tclass('ti-angle-up', !is).tclass('ti-angle-down', is);
			} else {
				icons.eq(0).tclass('ti-minus', !is).tclass('ti-plus', is);
				el.tclass('markdown-showblock-visible', !is);
			}
			el.find('b').html(el.attrd(is ? 'show' : 'hide'));
		});
	};

	(function Markdown() {

		var keywords = /\{.*?\}\(.*?\)/g;
		var linksexternal = /(https|http):\/\//;
		var format = /__.*?__|_.*?_|\*\*.*?\*\*|\*.*?\*|~~.*?~~|~.*?~/g;
		var ordered = /^[a-z|0-9]{1}\.\s|^-\s/i;
		var orderedsize = /^(\s|\t)+/;
		var code = /`.*?`/g;
		var encodetags = /<|>/g;
		var regdash = /-{2,}/g;
		var regicons = /(^|[^\w]):((fab\s|far\s|fas\s|fal\s|fad|fa\s)fa-)?[a-z-]+:([^\w]|$)/g;
		var regemptychar = /\s|\W/;
		var regtags = /<[^>]*>/g;

		var encode = function(val) {
			return '&' + (val === '<' ? 'lt' : 'gt') + ';';
		};

		function markdown_code(value) {
			return value ? ('<code>' + value.substring(1, value.length - 1) + '</code>') : '';
		}

		function markdown_imagelinks(value) {

			if (!value)
				return '';

			var end = value.lastIndexOf(')') + 1;
			var img = value.substring(0, end);
			var url = value.substring(end + 2, value.length - 1);
			var label = markdown_links(img);
			var footnote = label.substring(0, 13);

			if (footnote === '<sup data-id=' || footnote === '<span data-id' || label.substring(0, 9) === '<a href="')
				return label;

			return '<a href="' + url + '"' + (linksexternal.test(url) ? ' target="_blank"' : '') + '>' + label + '</a>';
		}

		function markdown_table(value, align, ishead) {

			var columns = value.substring(1, value.length - 1).split('|');
			var builder = '';

			for (var i = 0; i < columns.length; i++) {
				var column = columns[i].trim();
				if (column.charAt(0) != '-') {
					var a = align[i];
					builder += '<' + (ishead ? 'th' : 'td') + (a && a !== 'left' ? (' class="' + a + '"') : '') + '>' + column + '</' + (ishead ? 'th' : 'td') + '>';
				}
			}

			return '<tr>' + builder + '</tr>';
		}

		function markdown_links(value) {

			if (!value)
				return '';

			var end = value.lastIndexOf(']');
			var img = value.charAt(0) === '!';
			var text = value.substring(img ? 2 : 1, end);
			var link = value.substring(end + 2, value.length - 1);

			// footnotes
			if ((/^#\d+$/).test(link)) {
				return (/^\d+$/).test(text) ? '<sup data-id="{0}" class="markdown-footnote">{1}</sup>'.format(link.substring(1), text) : '<span data-id="{0}" class="markdown-footnote">{1}</span>'.format(link.substring(1), text);
			}

			if (link.substring(0, 4) === 'www.')
				link = 'https://' + link;

			var nofollow = link.charAt(0) === '@' ? ' rel="nofollow"' : linksexternal.test(link) ? ' target="_blank"' : '';
			return '<a href="' + link + '"' + nofollow + '>' + text + '</a>';
		}

		function markdown_image(value) {

			var end = value.lastIndexOf(']');
			var text = value.substring(2, end);
			var link = value.substring(end + 2, value.length - 1);
			var responsive = 1;
			var f = text.charAt(0);

			if (f === '+') {
				responsive = 2;
				text = text.substring(1);
			} else if (f === '-') {
				// gallery
				responsive = 3;
				text = text.substring(1);
			}

			return '<img src="' + link + '" alt="' + text + '"' + (responsive === 1 ? ' class="img-responsive"' : responsive === 3 ? ' class="markdown-gallery"' : '') + ' border="0" loading="lazy" />';
		}

		function markdown_keywords(value) {
			var keyword = value.substring(1, value.indexOf('}'));
			var type = value.substring(value.lastIndexOf('(') + 1, value.lastIndexOf(')'));
			return '<span class="markdown-keyword" data-type="{0}">{1}</span>'.format(type, keyword);
		}

		function markdown_links2(value) {
			value = value.substring(4, value.length - 4);
			return '<a href="' + (value.isEmail() ? 'mailto:' : linksexternal.test(value) ? '' : 'http://') + value + '" target="_blank">' + value + '</a>';
		}

		function markdown_format(value, index, text) {

			var p = text.charAt(index - 1);
			var n = text.charAt(index + value.length);

			if ((!p || regemptychar.test(p)) && (!n || regemptychar.test(n))) {

				var beg = '';
				var end = '';
				var tag;

				if (value.indexOf('*') !== -1) {
					tag = value.indexOf('**') === -1 ? 'em' : 'strong';
					beg += '<' + tag + '>';
					end = '</' + tag + '>' + end;
				}

				if (value.indexOf('_') !== -1) {
					tag = value.indexOf('__') === -1 ? 'u' : 'b';
					beg += '<' + tag + '>';
					end = '</' + tag + '>' + end;
				}

				if (value.indexOf('~') !== -1) {
					beg += '<strike>';
					end = '</strike>' + end;
				}

				var count = value.charAt(1) === value.charAt(0) ? 2 : 1;
				return beg + value.substring(count, value.length - count) + end;
			}

			return value;
		}

		function markdown_id(value) {
			value = value.replace(regtags, '');
			return value.slug().replace(regdash, '-');
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

			var icon = value.substring(beg, end);
			if (icon.indexOf(' ') === -1)
				icon = 'ti ti-' + icon;
			return value.substring(0, beg - 1) + '<i class="' + icon + '"></i>' + value.substring(end + 1);
		}

		function markdown_urlify(str) {
			return str.replace(/(^|\s)+(((https?:\/\/)|(www\.))[^\s]+)/g, function(url, b, c) {
				var len = url.length;
				var l = url.charAt(len - 1);
				var f = url.charAt(0);
				if (l === '.' || l === ',')
					url = url.substring(0, len - 1);
				else
					l = '';
				url = (c === 'www.' ? 'http://' + url : url).trim();
				return (f.charCodeAt(0) < 40 ? f : '') + '[' + url + '](' + url + ')' + l;
			});
		}

		FUNC.markdownredraw = function(el, opt) {

			if (!opt)
				opt = EMPTYOBJECT;

			if (!el)
				el = opt.element ||  $('body');

			var arr;

			if (!opt.nosecret) {
				arr = el.find('.lang-secret');
				for (var t of arr) {
					if (!t.$mdloaded) {
						t.$mdloaded = 1;
						var el = $(t);
						el.parent().replaceWith('<div class="markdown-secret" data-show="{0}" data-hide="{1}"><span class="markdown-showsecret"><i class="ti ti-lock"></i><i class="ti pull-right ti-angle-down"></i><b>{0}</b></span><div class="hidden">'.format(opt.showsecret || 'Show secret data', opt.hidesecret || 'Hide secret data') + el.html().trim().markdown(opt.secretoptions, true) +'</div></div>');
					}
				}
			}

			if (!opt.novideo) {
				arr = el.find('.lang-video');
				for (var t of arr) {
					if (!t.$mdloaded) {
						t.$mdloaded = 1;
						var el = $(t);
						var html = el.html();
						if (html.indexOf('youtube') !== -1)
							el.parent().replaceWith('<div class="markdown-video"><iframe src="https://www.youtube.com/embed/' + html.split('v=')[1] + '" frameborder="0" allowfullscreen></iframe></div>');
						else if (html.indexOf('vimeo') !== -1)
							el.parent().replaceWith('<div class="markdown-video"><iframe src="//player.vimeo.com/video/' + html.substring(html.lastIndexOf('/') + 1) + '" frameborder="0" allowfullscreen></iframe></div>');
					}
				}
			}

			if (!opt.nochart && W.ApexCharts) {
				arr = el.find('.lang-barchart');
				for (var t of arr) {
					if (!t.$mdloaded) {
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

						var chart = new W.ApexCharts(el.parent().empty()[0], options);
						chart.render();
					}
				}

				arr = el.find('.lang-linechart');
				for (var t of arr) {
					if (!t.$mdloaded) {

						t.$mdloaded = 1;

						if (!W.ApexCharts)
							return;

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

						var chart = new W.ApexCharts(el.parent().empty()[0], options);
						chart.render();
					}
				}
			}

			if (!opt.noiframe) {
				arr = el.find('.lang-iframe');
				for (var t of arr) {
					if (!t.$mdloaded) {
						t.$mdloaded = 1;
						var el = $(t);
						el.parent().replaceWith('<div class="markdown-iframe">' + el.html().replace(/&lt;/g, '<').replace(/&gt;/g, '>') + '</div>');
					}
				}
			}

			if (!opt.nocode && config.highlight) {
				WAIT('hljs', function() {
					arr = el.find('.markdown-code');
					for (var t of arr) {
						if (!t.$mdloaded) {
							t.$mdloaded = 1;
							var sub = $(t).find('pre code');
							for (var block of sub)
								W.hljs.highlightBlock(block);
						}
					}
				});
			}

			arr = el.find('a');

			for (var t of arr) {
				if (!t.$mdloaded) {
					t.$mdloaded = 1;
					var a = $(t);
					var href = a.attr('href');
					var c = href.substring(0, 1);
					if (href === '#') {
						var beg = '';
						var end = '';
						var text = el.html();
						if (text.substring(0, 1) === '<')
							beg = '-';
						if (text.substring(text.length - 1) === '>')
							end = '-';
						a.attr('href', '#' + (beg + markdown_id(a.text()) + end));
					} else if (c !== '/' && c !== '#')
						a.attr('target', '_blank');
				}
			}

			EMIT('markdown', el, opt);
			el.find('.markdown-code').rclass('hidden');
		};

		Thelpers.markdown = function(val, opt) {
			return val ? (val + '').markdown(opt) : val;
		};

		String.prototype.markdown = function(opt, nested) {

			// opt.wrap = true;
			// opt.linetag = 'p';
			// opt.ul = true;
			// opt.code = true;
			// opt.images = true;
			// opt.links = true;
			// opt.formatting = true;
			// opt.icons = true;
			// opt.tables = true;
			// opt.br = true;
			// opt.headlines = true;
			// opt.hr = true;
			// opt.blockquotes = true;
			// opt.sections = true;
			// opt.custom
			// opt.footnotes = true;
			// opt.urlify = true;
			// opt.keywords = true;
			// opt.emptynewline = true;

			var str = this;

			if (!opt)
				opt = {};

			var lines = str.split('\n');
			var builder = [];
			var ul = [];
			var table = false;
			var iscode = false;
			var isblock = false;
			var ishead = 0;
			var isprevblock = false;
			var prev;
			var prevsize = 0;
			var previndex;
			var tmp;

			if (opt.wrap == null)
				opt.wrap = true;

			if (opt.linetag == null)
				opt.linetag = 'p';

			var closeul = function() {
				while (ul.length) {
					var text = ul.pop();
					builder.push('</' + text + '>');
				}
			};

			var formatlinks = function(val) {
				return markdown_links(val, opt.images);
			};

			var linkscope = function(val, index, callback) {

				var beg = -1;
				var beg2 = -1;
				var can = false;
				var skip = false;
				var find = false;
				var n;

				for (var i = index; i < val.length; i++) {
					var c = val.charAt(i);

					if (c === '[') {
						beg = i;
						can = false;
						find = true;
						continue;
					}

					var codescope = val.substring(i, i + 6);

					if (skip && codescope === '</code') {
						skip = false;
						i += 7;
						continue;
					}

					if (skip)
						continue;

					if (!find && codescope === '<code>') {
						skip = true;
						continue;
					}

					var il = val.substring(i, i + 4);

					if (il === '&lt;') {
						beg2 = i;
						continue;
					} else if (beg2 > -1 && il === '&gt;') {
						callback(val.substring(beg2, i + 4), true);
						beg2 = -1;
						continue;
					}

					if (c === ']') {

						can = false;
						find = false;

						if (beg === -1)
							continue;

						n = val.charAt(i + 1);

						// maybe a link mistake
						if (n === ' ')
							n = val.charAt(i + 2);

						// maybe a link
						can = n === '(';
					}

					if (beg > -1 && can && c === ')') {
						n = val.charAt(beg - 1);
						callback(val.substring(beg - (n === '!' ? 1 : 0), i + 1));
						can = false;
						find = false;
						beg = -1;
					}
				}

			};

			var formatline = function(line) {
				var tmp = [];
				return line.replace(code, function(text) {
					tmp.push(text);
					return '\0';
				}).replace(format, markdown_format).replace(/\0/g, function() {
					return markdown_code(tmp.shift());
				});
			};

			var imagescope = function(val) {

				var beg = -1;
				var can = false;
				var n;

				for (var i = 0; i < val.length; i++) {
					var c = val.charAt(i);

					if (c === '[') {
						beg = i;
						can = false;
						continue;
					}

					if (c === ']') {

						can = false;

						if (beg === -1)
							continue;

						n = val.charAt(i + 1);

						// maybe a link mistake
						if (n === ' ')
							n = val.charAt(i + 2);

						// maybe a link
						can = n === '(';
					}

					if (beg > -1 && can && c === ')') {
						n = val.charAt(beg - 1);
						var tmp = val.substring(beg - (n === '!' ? 1 : 0), i + 1);
						if (tmp.charAt(0) === '!')
							val = val.replace(tmp, markdown_image(tmp));
						can = false;
						beg = -1;
					}
				}


				return val;
			};

			for (var i = 0; i < lines.length; i++) {

				lines[i] = lines[i].replace(encodetags, encode);
				var three = lines[i].substring(0, 3);

				if (!iscode && (three === ':::' || (three === '==='))) {

					if (isblock) {
						if (opt.blocks !== false)
							builder[builder.length - 1] += '</div></div>';
						isblock = false;
						isprevblock = true;
						continue;
					}

					closeul();
					isblock = true;
					if (opt.blocks !== false) {
						line = lines[i].substring(3).trim();
						if (opt.formatting !== false)
							line = formatline(line);
						builder.push('<div class="markdown-block"><span class="markdown-showblock"><i class="ti ti-plus"></i>{0}</span><div class="hidden">'.format(line));
					}
					prev = '';
					continue;
				}

				if (!isblock && lines[i] && isprevblock) {
					builder.push('<br />');
					isprevblock = false;
				}

				if (three === '```') {

					if (iscode) {
						if (opt.code !== false)
							builder[builder.length - 1] += '</code></pre></div>';
						iscode = false;
						continue;
					}

					closeul();
					iscode = true;
					if (opt.code !== false)
						tmp = '<div class="markdown-code hidden"><pre class="noscrollbar"><code class="lang-' + lines[i].substring(3) + '">';
					prev = 'code';
					continue;
				}

				if (iscode) {
					if (opt.code !== false)
						builder.push(tmp + lines[i]);
					if (tmp)
						tmp = '';
					continue;
				}

				var line = lines[i];

				if (opt.br !== false)
					line = line.replace(/&lt;br(\s\/)?&gt;/g, '<br />');

				if (line.length > 10 && opt.urlify !== false && opt.links !== false)
					line = markdown_urlify(line);

				if (opt.custom)
					line = opt.custom(line);

				if (line.length > 2 && line !== '***' && line !== '---') {
					if (opt.formatting !== false)
						line = formatline(line);
					if (opt.images !== false)
						line = imagescope(line);
					if (opt.links !== false) {
						linkscope(line, 0, function(text, inline) {
							if (inline)
								line = line.replace(text, markdown_links2);
							else if (opt.images !== false)
								line = line.replace(text, markdown_imagelinks);
							else
								line = line.replace(text, formatlinks);
						});
					}
					if (opt.keywords !== false)
						line = line.replace(keywords, markdown_keywords);

					if (opt.icons !== false)
						line = line.replace(regicons, markdown_icon);
				}

				if (!line) {
					if (table) {
						table = null;
						if (opt.tables !== false)
							builder.push('</tbody></table>');
					}
				}

				if (line === '' && lines[i - 1] === '') {
					closeul();
					if (opt.emptynewline !== false)
						builder.push('<br />');
					prev = 'br';
					continue;
				}

				if (line[0] === '|') {
					closeul();

					if (!table) {
						var next = lines[i + 1];
						if (next[0] === '|') {
							if (next.indexOf('--') === -1) {
								if (opt.tables !== false)
									builder.push('<table class="table table-bordered"><thead>');
								table = [];
								prev = 'table';
								ishead = 2;
							} else {
								table = [];
								var columns = next.substring(1, next.length - 1).split('|');
								for (var j = 0; j < columns.length; j++) {
									var column = columns[j].trim();
									var align = 'left';
									if (column.charAt(column.length - 1) === ':')
										align = column[0] === ':' ? 'center' : 'right';
									table.push(align);
								}
								if (opt.tables !== false)
									builder.push('<table class="table table-bordered"><thead>');
								prev = 'table';
								ishead = 1;
								i++;
							}
						} else
							continue;
					}

					if (opt.tables !== false) {
						if (ishead === 1)
							builder.push(markdown_table(line, table, true) + '</thead><tbody>');
						else if (ishead === 2)
							builder.push('<tbody>' + markdown_table(line, table));
						else
							builder.push(markdown_table(line, table));
					}

					ishead = 0;
					continue;
				}

				if (line.charAt(0) === '#') {

					closeul();

					if (line.substring(0, 2) === '# ') {
						tmp = line.substring(2).trim();
						if (opt.headlines !== false)
							builder.push('<h1 id="' + markdown_id(tmp) + '">' + tmp + '</h1>');
						prev = '#';
						continue;
					}

					if (line.substring(0, 3) === '## ') {
						tmp = line.substring(3).trim();
						if (opt.headlines !== false)
							builder.push('<h2 id="' + markdown_id(tmp) + '">' + tmp + '</h2>');
						prev = '##';
						continue;
					}

					if (line.substring(0, 4) === '### ') {
						tmp = line.substring(4).trim();
						if (opt.headlines !== false)
							builder.push('<h3 id="' + markdown_id(tmp) + '">' + tmp + '</h3>');
						prev = '###';
						continue;
					}

					if (line.substring(0, 5) === '#### ') {
						tmp = line.substring(5).trim();
						if (opt.headlines !== false)
							builder.push('<h4 id="' + markdown_id(tmp) + '">' + tmp + '</h4>');
						prev = '####';
						continue;
					}

					if (line.substring(0, 6) === '##### ') {
						tmp = line.substring(6).trim();
						if (opt.headlines !== false)
							builder.push('<h5 id="' + markdown_id(tmp) + '">' + tmp + '</h5>');
						prev = '#####';
						continue;
					}
				}

				tmp = line.substring(0, 3);

				if (tmp === '---' || tmp === '***') {
					prev = 'hr';
					if (opt.hr !== false)
						builder.push('<hr class="markdown-line' + (tmp.charAt(0) === '-' ? '1' : '2') + '" />');
					continue;
				}

				// footnotes
				if ((/^#\d+:(\s)+/).test(line)) {
					if (opt.footnotes !== false) {
						tmp = line.indexOf(':');
						builder.push('<div class="markdown-footnotebody" data-id="{0}"><span>{0}:</span> {1}</div>'.format(line.substring(1, tmp).trim(), line.substring(tmp + 1).trim()));
					}
					continue;
				}

				if (line.substring(0, 5) === '&gt; ') {
					if (opt.blockquotes !== false)
						builder.push('<blockquote>' + line.substring(5).trim() + '</blockquote>');
					prev = '>';
					continue;
				}

				if (line.substring(0, 5) === '&lt; ') {
					if (opt.sections !== false)
						builder.push('<section>' + line.substring(5).trim() + '</section>');
					prev = '<';
					continue;
				}

				var tmpline = line.trim();

				if (opt.ul !== false && ordered.test(tmpline)) {

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
						previndex = builder.push('<' + type + (subtype ? (' type="' + subtype + '"') : '') + '>') - 1;
						ul.push(type + (append ? '></li' : ''));
						prev = type;
						prevsize = size;
					}

					var tmpstr = (type === 'ol' ? tmpline.substring(tmpline.indexOf('.') + 1) : tmpline.substring(2));
					if (type !== 'ol') {
						var tt = tmpstr.substring(0, 3);
						if (tt === '[ ]' || tt === '[x]') {
							if (previndex != null)
								builder[previndex] = builder[previndex].replace('<ul', '<ul class="markdown-tasks"');
							previndex = null;
						}
					}

					builder.push('<li>' + tmpstr.trim().replace(/\[x\]/g, '<i class="ti ti-check-square green"></i>').replace(/\[\s\]/g, '<i class="ti ti-square"></i>') + '</li>');

				} else {
					closeul();
					line && builder.push((opt.linetag ? ('<' + opt.linetag + '>') : '') + line.trim() + (opt.linetag ? ('</' + opt.linetag + '>') : ''));
					prev = 'p';
				}
			}

			closeul();
			table && opt.tables !== false && builder.push('</tbody></table>');
			iscode && opt.code !== false && builder.push('</code></pre>');
			if (!opt.noredraw && typeof(window) === 'object')
				setTimeout(FUNC.markdownredraw, 1, null, opt);
			return (opt.wrap ? ('<div class="markdown' + (nested ? '' : ' markdown-container') + '">') : '') + builder.join('\n').replace(/\t/g, '    ') + (opt.wrap ? '</div>' : '');
		};

	})();

});