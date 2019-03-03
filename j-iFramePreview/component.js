COMPONENT('exec', function(self, config) {
	self.readonly();
	self.blind();
	self.make = function() {

		var scope = null;

		var scopepath = function(el, val) {
			if (!scope)
				scope = el.scope();
			return scope ? scope.makepath ? scope.makepath(val) : val.replace(/\?/g, el.scope().path) : val;
		};

		var fn = function(plus) {
			return function(e) {

				var el = $(this);
				var attr = el.attrd('exec' + plus);
				var path = el.attrd('path' + plus);
				var href = el.attrd('href' + plus);
				var def = el.attrd('def' + plus);
				var reset = el.attrd('reset' + plus);

				scope = null;

				if (el.attrd('prevent' + plus) === 'true') {
					e.preventDefault();
					e.stopPropagation();
				}

				if (attr) {
					if (attr.indexOf('?') !== -1)
						attr = scopepath(el, attr);
					EXEC(attr, el, e);
				}

				href && NAV.redirect(href);

				if (def) {
					if (def.indexOf('?') !== -1)
						def = scopepath(el, def);
					DEFAULT(def);
				}

				if (reset) {
					if (reset.indexOf('?') !== -1)
						reset = scopepath(el, reset);
					RESET(reset);
				}

				if (path) {
					var val = el.attrd('value');
					if (val) {
						if (path.indexOf('?') !== -1)
							path = scopepath(el, path);
						var v = GET(path);
						SET(path, new Function('value', 'return ' + val)(v), true);
					}
				}
			};
		};

		self.event('dblclick', config.selector2 || '.exec2', fn('2'));
		self.event('click', config.selector || '.exec', fn(''));
	};
});

COMPONENT('part', 'hide:true', function(self, config) {

	var init = false;
	var clid = null;

	self.readonly();
	self.setter = function(value) {

		if (config.if !== value) {
			config.hidden && !self.hclass('hidden') && EXEC(config.hidden);
			config.hide && self.aclass('hidden');
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		config.hide && self.rclass('hidden');

		if (self.element[0].hasChildNodes()) {

			if (clid) {
				clearTimeout(clid);
				clid = null;
			}

			config.reload && EXEC(config.reload);
			config.default && DEFAULT(config.default, true);

		} else {
			SETTER('loading', 'show');
			setTimeout(function() {
				self.import(config.url, function() {
					if (!init) {
						config.init && EXEC(config.init);
						init = true;
					}
					config.reload && EXEC(config.reload);
					config.default && DEFAULT(config.default, true);
					SETTER('loading', 'hide', 500);
				});
			}, 200);
		}
	};

	self.clean = function() {
		if (self.hclass('hidden')) {
			config.clean && EXEC(config.clean);
			setTimeout(function() {
				self.element.empty();
				init = false;
				clid = null;
				setTimeout(FREE, 1000);
			}, 1000);
		}
	};
});

COMPONENT('importer', function(self, config) {

	var init = false;
	var clid = null;
	var content = '';

	self.readonly();

	self.make = function() {
		var scr = self.find('script');
		content = scr.length ? scr.html() : '';
	};

	self.reload = function(recompile) {
		config.reload && EXEC(config.reload);
		recompile && COMPILE();
	};

	self.setter = function(value) {

		if (config.if !== value) {
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		if (clid) {
			clearTimeout(clid);
			clid = null;
		}

		if (init) {
			self.reload();
			return;
		}

		init = true;

		if (content) {
			self.html(content);
			setTimeout(self.reload, 50, true);
		} else
			self.import(config.url, self.reload);
	};

	self.clean = function() {
		config.clean && EXEC(config.clean);
		setTimeout(function() {
			self.empty();
			init = false;
			clid = null;
		}, 1000);
	};
});

COMPONENT('viewbox', function(self, config) {

	var eld;

	self.readonly();

	self.init = function() {
		OP.on('resize', function() {
			SETTER('viewbox', 'resize');
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disable':
				eld.tclass('hidden', !value);
				break;
		}
	};

	self.make = function() {
		self.element.prepend('<div class="ui-viewbox-disabled hidden"></div>');
		eld = self.find('> .ui-viewbox-disabled').eq(0);
		self.aclass('ui-viewbox ui-viewbox-hidden');
		self.resize();
	};

	self.resize = function() {
		var el = config.selector ? self.element.closest(config.selector) : self.parent();
		var h = (el.height() / 100) * config.height;
		eld.css({ height: h, width: self.element.width() });
		self.css('height', h);
		self.element.SETTER('*', 'resize');
		var cls = 'ui-viewbox-hidden';
		self.hclass(cls) && self.rclass(cls, 1000);
	};

});

COMPONENT('mailnavigation', function(self, config) {

	self.readonly();

	var current = null;

	self.make = function() {

		self.event('click', '.ui-mailnavigation li.show-more', function(e) {

			if(e.target !== e.currentTarget)
				return;

			var el = $(this);
			var sub = el.find('ul.subdirectory');
			sub.tclass('hidden');
			SETTER('scrollbar', 'resize');
		});

		self.datasource(config.datasource, function(path, value) {

			if (!value || !value.length)
				return;

			var builder = [];
			var accounts = Tangular.compile('<h4>Accounts</h4><a href="/mailbox/all/" class="jR"><i class="fa fa-envelope"></i> All</a>{{ foreach m in value }}<a href="/mailbox/{{ m.title }}/" class="jR"><i class="fa fa-envelope"></i> {{ m.title }} {{ if m.info.new }}({{ m.info.new }}){{ fi }}</a>{{ end }}');
			var folders = '<h4>Folders</h4><a href="/folder/sent/" class="jR"><i class="fa fa-paper-plane"></i> Sent</a><a href="/folder/drafts/" class="jR"><i class="fa fa-file"></i> Drafts</a><a href="/folder/archive/" class="jR"><i class="fas fa-archive"></i> Archive</a><a href="/folder/trash/" class="jR"><i class="fa fa-trash-alt"></i> Trash</a>';
			var tags = '<h4>Tags</h4><a href="#"><i class="fa fa-circle green tag"></i> Work</a><a href="#"><i class="fa fa-circle orange tag"></i> Personal</a><a href="#"><i class="fa fa-circle blue tag"></i> Reminder</a><a href="#"><i class="fa fa-circle red tag"></i> Important</a>';
			var more = Tangular.compile('<h4>More</h4>{{ foreach m in value }}<ul><li class="show-more"><i class="fas fa-angle-down"></i> {{ m.title }}<ul class="subdirectory hidden">{{ foreach dir in m.directories }}<li><a href="/directory/{{ m.title }}/?dir={{ dir.name }}" class="jR">{{ dir.name }}</a></li>{{ end }}{{ foreach child in dir.children }}<li><a href="/directory/{{ m.title }}/{{ child }}/" class="jR">{{ child }}</a></li>{{ end }}</ul></ul>{{ end }}</li>');

			builder.push('<div class="ui-mailnavigation">');
			builder.push(accounts({value: value}));
			builder.push(folders);
			builder.push(tags);
			builder.push(more({value: value}));
			builder.push('</div>');

			self.html(builder.join(''));
			self.select(current);
		});
	};

	self.select = function(url) {
		if (!url)
			return;
		current = url;
		self.find('a').rclass('selected');
		self.find('a[href="{0}"]'.format(decodeURIComponent(url))).aclass('selected');
	};

	self.on('location', function(url) {
		self.select(url);
	});
});

COMPONENT('scrollbar', 'reset:true;margin:0;marginxs:0;marginsm:0;marginmd:0;marginlg:0', function(self, config) {

	self.readonly();

	self.configure = function(key, value) {
		if (key === 'track') {
			if (!(value instanceof Array))
				value = value.split(',').trim();

			for (var i = 0; i < value.length; i++)
				value[i] = self.path + '.' + value[i];

			value.push(self.path);
			config.track = value;
		}
	};

	self.init = function() {
		SETTER('scrollbar', 'resize');
	};

	self.make = function() {
		self.scrollbar = SCROLLBAR(self.element, { visibleX: config.visibleX, visibleY: config.visibleY });
		self.scrollleft = self.scrollbar.scrollLeft;
		self.scrolltop = self.scrollbar.scrollTop;
		self.scrollright = self.scrollbar.scrollRight;
		self.scrollbottom = self.scrollbar.scrollBottom;
	};

	self.resize = function() {
		if (config.parent) {
			var parent = config.parent === 'window' ? $(window) : self.element.closest(config.parent);
			self.element.css('height', parent.height() - (config.offset ? self.element.offset().top : 0) - config.margin - config['margin' + WIDTH()]);
		}
		self.scrollbar.resize();
	};

	self.on('resize', self.resize);
	self.done = self.resize;

	self.scroll = function(x, y) {
		self.scrollbar.scroll(x, y);
	};

	self.reset = function() {
		self.scroll(0, 0);
	};

	self.setter = function(value, path, type) {
		if (config.track && config.track.indexOf(path) === -1)
			return;
		type && setTimeout(function() {
			self.resize();
			config.reset && self.reset();
		}, 500);
	};

});

COMPONENT('panel', 'width:350;icon:circle-o;zindex:12;scrollbar:true;scrollbarY:false', function(self, config) {

	var W = window;

	if (!W.$$panel) {

		W.$$panel_level = W.$$panel_level || 1;
		W.$$panel = true;

		$(document).on('click touchend', '.ui-panel-button-close,.ui-panel-container', function(e) {
			var target = $(e.target);
			var curr = $(this);
			var main = target.hclass('ui-panel-container');
			if (curr.hclass('ui-panel-button-close') || main) {
				var parent = target.closest('.ui-panel-container');
				var com = parent.component();
				if (!main || com.config.bgclose) {

					if (config.close)
						EXEC(config.close, com);
					else
						com.hide();

					e.preventDefault();
					e.stopPropagation();
				}
			}
		});

		$(W).on('resize', function() {
			SETTER('panel', 'resize');
		});
	}

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		var el = self.element.find('.ui-panel-body');
		el.height(WH - self.find('.ui-panel-header').height());
		self.scrollbar && self.scrollbar.resize();
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass('fa fa-' + value.icon);
	};

	self.make = function() {

		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';
		$(document.body).append('<div id="{0}" class="hidden ui-panel-container{3}"><div class="ui-panel" style="max-width:{1}px"><div data-bind="@config__change .ui-panel-icon:@icon__html span:value.title" class="ui-panel-title"><button name="cancel" class="ui-panel-button-close{2}"><i class="fa fa-times"></i></button><i class="ui-panel-icon"></i><span></span></div><div class="ui-panel-header"></div><div class="ui-panel-body"></div></div>'.format(self.ID, config.width, config.closebutton == false ? ' hidden' : '', config.bg ? '' : ' ui-panel-inline'));
		var el = $('#' + self.ID);

		var body = el.find('.ui-panel-body');
		body[0].appendChild(self.dom);

		if (config.scrollbar && window.SCROLLBAR) {
			self.scrollbar = SCROLLBAR(body, { visibleY: !!config.scrollbarY });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		} else
			body.aclass('ui-panel-scroll');

		self.rclass('hidden');
		self.replace(el);
		self.event('click', 'button[name]', function() {
			switch (this.name) {
				case 'cancel':
					self.hide();
					break;
			}
		});

		self.resize();
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'bg':
				self.tclass('ui-panel-inline', !value);
				self.element.css('max-width', value ? 'inherit' : (config.width + 1));
				break;
			case 'closebutton':
				!init && self.find('.ui-panel-button-close').tclass(value !== true);
				break;
			case 'width':
				self.element.css('max-width', config.bg ? 'inherit' : value);
				self.find('.ui-panel').css('max-width', value);
				break;
		}
	};

	self.setter = function(value) {

		setTimeout2('ui-panel-noscroll', function() {
			$('html').tclass('ui-panel-noscroll', !!$('.ui-panel-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden)
			return;

		setTimeout2('panelreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.aclass('hidden');
			self.release(true);
			self.rclass('ui-panel-animate');
			W.$$panel_level--;
			return;
		}

		if (self.template) {
			var is = (/(data-bind|data-jc|data--{2,})="/).test(self.template);
			self.find('div[data-jc-replaced]').html(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$panel_level < 1)
			W.$$panel_level = 1;

		W.$$panel_level++;

		var container = self.element.find('.ui-panel-body');
		self.css('z-index', W.$$panel_level * config.zindex);
		container.scrollTop(0);
		self.rclass('hidden');
		self.release(false);
		setTimeout(self.resize, 100);

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus === true ? 'input[type="text"],select,textarea' : config.autofocus);
			el.length && el[0].focus();
		}

		setTimeout(function() {
			if (self.scrollbar)
				self.scrollbar.scroll(0, 0);
			else
				container.scrollTop(0);
			self.aclass('ui-panel-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$panel_level * config.zindex) + 1);
		}, 1000);
	};
});

COMPONENT('iframeeditable', 'bind:body', function(self, config) {

	var iframe, skip = false;

	self.readonly();
	self.nocompile && self.nocompile();

	self.init = function() {
		W.iframeeditableinstances = {};
	};

	self.destroy = function() {
		delete W.iframeeditableinstances[self.ID];
	};

	self.make = function() {
		W.iframeeditableinstances[self.ID] = self;
		self.aclass('ui-iframeeditable');
		self.html('<iframe src="about:blank" frameborder="0" scrolling="no"></iframe>');
		iframe = self.find('iframe');
	};

	self.format = function(type, url) {
		switch (type.toLowerCase()) {
			case 'bold':
				type = 'Bold';
				break;
			case 'italic':
				type = 'Italic';
				break;
			case 'underline':
				type = 'Underline';
				break;
			case 'link':
				type = 'CreateLink';
				break;
		}
		iframe[0].contentWindow.document.execCommand(type, false, url || null);
	};

	self.insert = function(value, encoded) {
		iframe[0].contentWindow.document.execCommand(encoded ? 'insertText' : 'insertHtml', false, value);
	};

	self.getNode = function() {
		var node = iframe[0].contentWindow.document.getSelection().anchorNode;
		if (node)
			return (node.nodeType === 3 ? node.parentNode : node);
	};

	self.getSelection = function() {
		var win = iframe[0].contentWindow;
		var doc = win.document;
		if (doc.selection && doc.selection.type === 'Text')
			return doc.selection.createRange().htmlText;
		else if (!win.getSelection)
			return;
		var sel = win.getSelection();
		if (!sel.rangeCount)
			return '';
		var container = doc.createElement('div');
		for (var i = 0, len = sel.rangeCount; i < len; ++i)
			container.appendChild(sel.getRangeAt(i).cloneContents());
		return container.innerHTML;
	};

	self.write = function(content) {

		var is = false;
		var offset = ('<div id="IFPOFFSET"></div><scr' + 'ipt>window.addEventListener(\'keydown\',function(){window.parent.iframeeditableinstances[\'{0}\'].resize2()});</scr' + 'ipt><style>body{background:white!important;font:normal 14px Arial;}</style>').format(self.ID);

		content = content.replace(/<\/body>/i, function() {
			is = true;
			return offset + '</body>';
		});

		if (!is)
			content += offset;

		setTimeout(function() {
			var win = iframe[0].contentWindow;
			var doc = win.document;
			doc.open();
			doc.write(content);
			doc.close();
			self.resize();
			setTimeout(self.resize, 500);
			setTimeout(self.resize, 1000);
			setTimeout(self.resize, 2000);
			setTimeout(self.resize, 3000);
		}, 500);

	};

	self.resize2 = function() {
		setTimeout2(self.ID, function() {
			self.resize();
			var doc = iframe[0].contentWindow.document;
			var val = null;
			switch (config.bind) {
				case 'body':
					val = doc.body.innerHTML;
					break;
				case 'html':
					val = doc.documentElement.innerHTML;
					break;
				case 'contenteditable':
					var tmp = document.querySelector('[contenteditable]');
					if (tmp)
						val = tmp.innerHTML;
					break;
			}

			if (val != null) {
				skip = true;

				var index = val.lastIndexOf('<div id="IFPOFFSET">');
				if (index != -1)
					val = val.substring(0, index);

				self.set(val.replace(/contenteditable=".*?"|contenteditable/g, ''));
				self.change(true);
			}

		}, 50);
	};

	self.resize = function() {
		var el = $(iframe[0].contentWindow.document.getElementById('IFPOFFSET'));
		var offset = el ? el.offset() : null;
		self.element.css('height', (offset ? offset.top : 0) + 30);
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (value == null)
			iframe.attr('src', 'about:blank');
		else
			self.write(value);
	};
});

COMPONENT('dropdown', function(self, config) {

	var select, condition, content = null;
	var render = '';
	self.nocompile && self.nocompile();

	self.validate = function(value) {

		if (!config.required || config.disabled)
			return true;

		var type = typeof(value);
		if (type === 'undefined' || type === 'object')
			value = '';
		else
			value = value.toString();

		EMIT('reflow', self.name);

		switch (self.type) {
			case 'currency':
			case 'number':
				return value > 0;
		}

		return value.length > 0;
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'type':
				self.type = value;
				break;
			case 'items':

				if (value instanceof Array) {
					self.bind('', value);
					return;
				}

				var items = [];

				value.split(',').forEach(function(item) {
					item = item.trim().split('|');
					var obj = { id: item[1] == null ? item[0] : item[1], name: item[0] };
					items.push(obj);
				});

				self.bind('', items);
				break;
			case 'if':
				condition = value ? FN(value) : null;
				break;
			case 'required':
				self.tclass('ui-dropdown-required', value === true);
				self.state(1, 1);
				break;
			case 'datasource':
				self.datasource(value, self.bind);
				break;
			case 'label':
				content = value;
				redraw = true;
				break;
			case 'icon':
				redraw = true;
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('select').prop('disabled', value);
				self.reset();
				break;
		}

		redraw && setTimeout2(self.id + '.redraw', 100);
	};

	self.bind = function(path, arr) {

		if (!arr)
			arr = EMPTYARRAY;

		var builder = [];
		var value = self.get();
		var propText = config.text || 'name';
		var propValue = config.value || 'id';

		config.empty !== undefined && builder.push('<option value="">{0}</option>'.format(config.empty));

		var type = typeof(arr[0]);
		var notObj = type === 'string' || type === 'number';

		for (var i = 0, length = arr.length; i < length; i++) {
			var item = arr[i];
			if (condition && !condition(item))
				continue;
			if (notObj)
				builder.push(self.template({ value: item, selected: value == item, text: item }));
			else
				builder.push(self.template({ value: item[propValue], selected: value == item[propValue], text: item[propText] }));
		}

		render = builder.join('');
		select.html(render);
	};

	self.redraw = function() {
		var html = '<div class="ui-dropdown"><select data-jc-bind="">{0}</select></div>'.format(render);
		var builder = [];
		var label = content || config.label;
		if (label) {
			builder.push('<div class="ui-dropdown-label">{0}{1}:</div>'.format(config.icon ? '<span class="fa fa-{0}"></span> '.format(config.icon) : '', label));
			builder.push('<div class="ui-dropdown-values">{0}</div>'.format(html));
			self.html(builder.join(''));
		} else
			self.html(html).aclass('ui-dropdown-values');
		select = self.find('select');
		render && self.refresh();
		config.disabled && self.reconfigure('disabled:true');
		self.tclass('ui-dropdown-required', config.required === true);
	};

	self.make = function() {
		self.template = Tangular.compile('<option value="{{value}}"{{if selected}} selected="selected"{{ fi }}>{{text}}</option>');
		self.type = config.type;
		content = self.html();
		self.aclass('ui-dropdown-container');
		self.redraw();
		config.if && (condition = FN(config.if));
		config.items && self.reconfigure({ items: config.items });
		config.datasource && self.reconfigure('datasource:' + config.datasource);
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-dropdown-invalid', invalid);
	};
});

COMPONENT('tabmenu', 'class:selected;selector:li', function(self, config) {
	var old, oldtab;

	self.readonly();

	self.make = function() {
		self.event('click', config.selector, function() {
			var el = $(this);
			!el.hclass(config.class) && self.set(el.attrd('value'));
		});
	};

	self.setter = function(value) {
		if (old === value)
			return;
		oldtab && oldtab.rclass(config.class);
		oldtab = self.find(config.selector + '[data-value="' + value + '"]').aclass(config.class);
		old = value;
	};
});

COMPONENT('initials', function(self, config) {

	var old;
	var TTIC = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#16a085','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#d35400','#c0392b'];

	self.readonly();

	self.make = function() {
		self.aclass('ui-initials');
		var value = self.get() || self.html();
		self.redraw(value);
	};

	self.redraw = function(value) {
		var index = value.indexOf('.');
		var arr = value.substring(index + 1).replace(/\s{2,}/g, ' ').trim().split(' ');
		var initials = (arr[0].substring(0, 1) + (arr[1] || '').substring(0, 1));
		var sum = 0;
		for (var i = 0; i < value.length; i++)
			sum += value.charCodeAt(i);
		self.html('<span class="initials" style="background-color:{1}" title="{2}">{0}</span>'.format(initials, TTIC[sum % value.length], value));
	};

	self.setter = function(value) {
		if (old === value)
			return;
		self.redraw(value);
		old = value;
	};
});

COMPONENT('inputtags', 'dirkey:name;dirvalue:id;after:\\:', function(self, config) {

	var cls = 'ui-inputtags';
	var cls2 = '.' + cls;
	var input, placeholder, dirsource, binded, customvalidator, tags, skip = false;

	self.init = function() {
		Thelpers.ui_inputtags_icon = function(val) {
			return val.charAt(0) === '!' ? ('<span class="ui-inputtags-icon-custom">' + val.substring(1) + '</span>') : ('<i class="fa fa-' + val + '"></i>');
		};
		W.ui_inputtags_template = Tangular.compile(('{{ if label }}<div class="{0}-label">{{ if icon }}<i class="fa fa-{{ icon }}"></i>{{ fi }}{{ label }}{{ after }}</div>{{ fi }}<div class="{0}-control{{ if dirsource }} {0}-dropdown{{ fi }}{{ if licon }} {0}-licon{{ fi }}{{ if ricon }} {0}-ricon{{ fi }}">{{ if ricon }}<div class="{0}-icon-right">{{ ricon | ui_inputtags_icon }}</div>{{ fi }}{{ if licon }}<div class="{0}-icon-left{{ if liconclick }} {0}-click{{ fi }}">{{ licon | ui_inputtags_icon }}</div>{{ fi }}<div class="{0}-input{{ if align === 1 || align === \'center\' }} center{{ else if align === 2 || align === \'right\' }} right{{ fi }}">{{ if placeholder && !innerlabel }}<div class="{0}-placeholder">{{ placeholder }}</div>{{ fi }}<div class="{0}-tags"><span class="{0}-editable" contenteditable="true"></span></div></div></div>{{ if error }}<div class="{0}-error hidden"><i class="fa fa-warning"></i> {{ error }}</div>{{ fi }}').format(cls));
	};

	self.make = function() {

		if (!config.label)
			config.label = self.html();

		if (isMOBILE && config.autofocus)
			config.autofocus = false;

		config.PATH = self.path.replace(/\./g, '_');

		self.aclass(cls + ' invisible');
		self.rclass('invisible', 100);
		self.redraw();

		self.event('input change', function() {
			self.check();
		});

		self.event('focus', cls2 + '-editable', function() {
			self.aclass(cls + '-focused');
			config.autocomplete && EXEC(config.autocomplete, self, input.parent());
			if (config.autosource) {
				var opt = {};
				opt.element = self.element;
				opt.search = GET(config.autosource);
				opt.callback = function(value, el) {
					input.empty();
					self.appendval(typeof(value) === 'string' ? value : value[config.autovalue]);
					self.check();
				};
				SETTER('autocomplete', 'show', opt);
			}
		});

		self.event('blur', cls2 + '-editable', function() {
			self.rclass(cls + '-focused');
		});

		self.event('click', '.fa-times', function(e) {
			var index = $(this).parent().index();
			self.removetag(index);
			e.stopPropagation();
			e.preventDefault();
		});

		self.event('click', cls2 + '-tag', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		self.findvalue = function(arr, val) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] && (arr[i] === val || arr[i][config.value] === val))
					return arr[i];
			}
		};

		self.event('click', cls2 + '-control', function() {

			if (!config.dirsource || config.disabled)
				return;

			var opt = {};
			opt.element = self.find(cls2 + '-control');
			opt.items = dirsource;
			opt.offsetY = -1;
			opt.placeholder = config.dirplaceholder;
			opt.render = config.dirrender ? GET(config.dirrender) : null;
			opt.custom = !!config.dircustom;
			opt.offsetWidth = 2;
			opt.minwidth = config.dirminwidth || 200;
			opt.maxwidth = config.dirmaxwidth;
			opt.key = config.dirkey || config.key;
			opt.empty = config.dirempty;

			if (config.dirvalue) {
				var val = self.get() || EMPTYARRAY;
				opt.exclude = function(item) {
					return item ? typeof(item) === 'string' ? self.findvalue(val, item) : self.findvalue(val, item[config.dirvalue]) : false;
				};
			}

			opt.callback = function(item, el, custom) {

				// empty
				if (item == null)
					return;

				var val = custom || typeof(item) === 'string' ? item : item[config.dirvalue || config.value];
				if (custom && typeof(config.dircustom) === 'string') {
					var fn = GET(config.dircustom);
					fn(val, function(val) {
						self.appendval(val, true);
					});
				} else if (!custom)
					self.appendval(val);
			};

			SETTER('directory', 'show', opt);
		});

		self.event('click', cls2 + '-placeholder,' + cls2 + '-label,' + cls2 + '-input', function(e) {
			if (!config.disabled) {
				if (config.dirsource) {
					e.preventDefault();
					e.stopPropagation();
					self.element.find(cls2 + '-control').trigger('click');
				} else
					input.focus();
			}
		});

		self.event('click', cls2 + '-icon-left,' + cls2 + '-icon-right', function(e) {

			if (config.disabled)
				return;

			var el = $(this);
			var left = el.hclass(cls + '-icon-left');

			if (config.dirsource && left && config.liconclick) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (left && config.liconclick)
				EXEC(config.liconclick, self, el);
			else if (config.riconclick)
				EXEC(config.riconclick, self, el);

		});
	};

	self.curpos = function(pos) {
		var el = input[0];
		if (el.createTextRange) {
			var range = el.createTextRange();
			range.move('character', pos);
			range.select();
		} else if (el.selectionStart) {
			el.focus();
			el.setSelectionRange(pos, pos);
		}
	};

	self.validate = function(value) {

		if (!config.required || config.disabled)
			return true;

		if (config.dirsource)
			return !!value;

		if (customvalidator)
			return customvalidator(value);

		if (value == null)
			value = EMPTYARRAY;

		return value.length > 0;
	};

	self.offset = function() {
		var offset = self.element.offset();
		var control = self.find(cls2 + '-control');
		var width = control.width() + 2;
		return { left: offset.left, top: control.offset().top + control.height(), width: width };
	};

	self.setter = function(value) {
		if (skip)
			skip = false;
		else
			self.bindvalue();
	};

	self.appendval = function(value, custom) {

		var cur = self.get() || EMPTYARRAY;
		var is = false;

		if (cur.indexOf(value) !== -1)
			return;

		if (!self.checkvalue(value))
			return;

		if (config.dirsource) {
			if (custom) {
				is = true;
				self.appendtag(value);
			} else {
				var item = dirsource.findItem(config.dirvalue, value);
				if (item) {
					is = true;
					self.appendtag(item[config.dirkey]);
				}
			}
		} else {
			is = true;
			self.appendtag(value);
		}

		if (is) {
			skip = true;
			self.push(value);
			self.change(true);
		}

		self.check();
	};

	self.appendtag = function(text) {
		input.before('<span class="{0}-tag"><i class="fa fa-times"></i>{1}</span>'.format(cls, Thelpers.encode(text)));
	};

	self.removetag = function(index) {
		skip = true;
		tags.find('span').eq(index).remove();
		self.get().splice(index, 1);
		self.update(true);
		self.change(true);
		self.check();
	};

	self.checkvalue = function(val) {
		return config.check ? GET(config.check)(val) : true;
	};

	self.check = function() {

		var is = !!input[0].innerHTML || (self.get() || EMPTYARRAY).length > 0;

		if (binded === is)
			return;

		binded = is;
		placeholder && placeholder.tclass('hidden', is);
		self.tclass(cls + '-binded', is);

		if (config.type === 'search')
			self.find(cls2 + '-icon-right').find('i').tclass(config.ricon, !is).tclass('fa-times', is);
	};

	self.bindvalue = function() {

		var value = self.get() || EMPTYARRAY;

		tags.find(cls2 + '-tag').remove();

		if (dirsource) {

			var arr = [];
			var item;

			for (var i = 0; i < dirsource.length; i++) {
				item = dirsource[i];
				if (typeof(item) === 'string') {
					if (value.indexOf(item) === -1)
						continue;
					arr.push(item);
				} else if (value.indexOf(item[config.dirvalue || config.value]) != -1)
					arr.push(item[config.dirkey || config.key]);
			}

			if (value && item == null && config.dircustom)
				arr.push(value);

			for (var i = 0; i < arr.length; i++)
				self.appendtag(arr[i]);
		} else {
			for (var i = 0; i < value.length; i++)
				self.appendtag(value[i]);
		}

		input.empty();
		self.check();
	};

	self.redraw = function() {

		if (!config.ricon) {
			if (config.dirsource)
				config.ricon = 'angle-down';
		}

		self.html(W.ui_inputtags_template(config));
		input = self.find(cls2 + '-editable');
		tags = self.find(cls2 + '-tags');
		placeholder = self.find(cls2 + '-placeholder');

		input.on('paste', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var text = e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain');
			text && document.execCommand('insertText', false, text);
		});

		input.on('keydown', function(e) {
			var el;
			if (e.which === 13) {
				e.preventDefault();
				e.stopPropagation();
				el = $(this);
				setTimeout(function() {
					var val = el.text();
					val && self.appendval(val);
					el.html('');
				}, 100);
			} else if (e.which === 8) {
				if (!this.innerHTML) {
					var prev = $(this).prev();
					prev.length && self.removetag(prev.index());
				}
			}
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'dirsource':
				input.prop('contenteditable', !value);
				self.datasource(value, function(path, value) {
					dirsource = value || EMPTYARRAY;
					self.bindvalue();
				});
				break;
			case 'disabled':
				self.tclass('ui-disabled', value == true);
				input.attr('contenteditable', !value);
				self.reset();
				break;
			case 'required':
				self.tclass(cls + '-required', value == true);
				self.reset();
				break;
			case 'validate':
				customvalidator = value ? (/\(|=|>|<|\+|-|\)/).test(value) ? FN('value=>' + value) : (function(path) { return function(value) { return GET(path)(value); }; })(value) : null;
				break;
			case 'innerlabel':
				self.tclass(cls + '-inner', value);
				break;
		}
	};

	self.formatter(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					return value.toString().toLowerCase();
				case 'upper':
					return value.toString().toUpperCase();
			}
		}

		return value;
	});

	self.parser(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					value = value.toLowerCase();
					break;
				case 'upper':
					value = value.toUpperCase();
					break;
			}
		}
		return value ? config.spaces === false ? value.replace(/\s/g, '') : value : value;
	});

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
		config.error && self.find(cls2 + '-error').tclass('hidden', !invalid);
	};
});

COMPONENT('textbox', function(self, config) {

	var input, content = null, isfilled = false;
	var innerlabel = function() {
		var is = !!input[0].value;
		if (isfilled !== is) {
			isfilled = is;
			self.tclass('ui-textbox-filled', isfilled);
		}
	};

	self.nocompile && self.nocompile();

	self.validate = function(value) {

		if (!config.required || config.disabled)
			return true;

		if (self.type === 'date')
			return value instanceof Date && !isNaN(value.getTime());

		if (value == null)
			value = '';
		else
			value = value.toString();

		EMIT('reflow', self.name);

		if (config.minlength && value.length < config.minlength)
			return false;

		switch (self.type) {
			case 'email':
				return value.isEmail();
			case 'phone':
				return value.isPhone();
			case 'url':
				return value.isURL();
			case 'currency':
			case 'number':
				return value > 0;
		}

		return config.validation ? !!self.evaluate(value, config.validation, true) : value.length > 0;
	};

	self.make = function() {

		content = self.html();

		self.type = config.type;
		self.format = config.format;

		self.event('click', '.fa-calendar', function(e) {
			if (!config.disabled && !config.readonly && config.type === 'date') {
				e.preventDefault();
				SETTER('calendar', 'toggle', self.element, self.get(), function(date) {
					self.change(true);
					self.set(date);
				});
			}
		});

		self.event('click', '.fa-caret-up,.fa-caret-down', function() {
			if (!config.disabled && !config.readonly && config.increment) {
				var el = $(this);
				var inc = el.hclass('fa-caret-up') ? 1 : -1;
				self.change(true);
				self.inc(inc);
			}
		});

		self.event('click', '.ui-textbox-label', function() {
			input.focus();
		});

		self.event('click', '.ui-textbox-control-icon', function() {
			if (config.disabled || config.readonly)
				return;
			if (self.type === 'search') {
				self.$stateremoved = false;
				$(this).rclass('fa-times').aclass('fa-search');
				self.set('');
			} else if (self.type === 'password') {
				var el = $(this);
				var type = input.attr('type');

				input.attr('type', type === 'text' ? 'password' : 'text');
				el.rclass2('fa-').aclass(type === 'text' ? 'fa-eye' : 'fa-eye-slash');
			} else if (config.iconclick)
				EXEC(config.iconclick, self);
		});

		self.event('focus', 'input', function() {
			if (!config.disabled && !config.readonly && config.autocomplete)
				EXEC(config.autocomplete, self);
		});

		self.event('input', 'input', innerlabel);
		self.redraw();
		config.iconclick && self.configure('iconclick', config.iconclick);
	};

	self.setter2 = function(value) {
		if (self.type === 'search') {
			if (self.$stateremoved && !value)
				return;
			self.$stateremoved = !value;
			self.find('.ui-textbox-control-icon').tclass('fa-times', !!value).tclass('fa-search', !value);
		}
		innerlabel();
	};

	self.redraw = function() {

		var attrs = [];
		var builder = [];
		var tmp = 'text';

		switch (config.type) {
			case 'password':
				tmp = config.type;
				break;
			case 'number':
			case 'phone':
				isMOBILE && (tmp = 'tel');
				break;
		}

		self.tclass('ui-disabled', config.disabled === true);
		self.tclass('ui-textbox-required', config.required === true);
		self.type = config.type;
		attrs.attr('type', tmp);
		config.placeholder && !config.innerlabel && attrs.attr('placeholder', config.placeholder);
		config.maxlength && attrs.attr('maxlength', config.maxlength);
		config.keypress != null && attrs.attr('data-jc-keypress', config.keypress);
		config.delay && attrs.attr('data-jc-keypress-delay', config.delay);
		config.disabled && attrs.attr('disabled');
		config.readonly && attrs.attr('readonly');
		config.error && attrs.attr('error');
		attrs.attr('data-jc-bind', '');

		if (config.autofill) {
			attrs.attr('name', self.path.replace(/\./g, '_'));
			self.autofill && self.autofill();
		}

		config.align && attrs.attr('class', 'ui-' + config.align);
		!isMOBILE && config.autofocus && attrs.attr('autofocus');

		var icon = config.icon;
		var icon2 = config.icon2;

		if (!icon2 && self.type === 'date')
			icon2 = 'calendar';
		else if (!icon2 && self.type === 'password')
			icon2 = 'eye';
		else if (self.type === 'search')
			icon2 = 'search';

		icon2 && builder.push('<div class="ui-textbox-control"><span class="fa fa-{0} ui-textbox-control-icon"></span></div>'.format(icon2));
		builder.push('<div class="ui-textbox-input"><input {0} /></div>'.format(attrs.join(' ')));
		config.increment && !icon2 && builder.push('<div class="ui-textbox-control"><span class="fa fa-caret-up"></span><span class="fa fa-caret-down"></span></div>');

		if (config.label)
			content = config.label;

		self.tclass('ui-textbox-innerlabel', !!config.innerlabel);

		if (content.length) {
			var html = builder.join('');
			builder = [];
			builder.push('<div class="ui-textbox-label">');
			icon && builder.push('<i class="fa fa-{0}"></i> '.format(icon));
			builder.push('<span>' + content + (content.substring(content.length - 1) === '?' ? '' : ':') + '</span>');
			builder.push('</div><div class="ui-textbox">{0}</div>'.format(html));
			config.error && builder.push('<div class="ui-textbox-helper"><i class="fa fa-warning" aria-hidden="true"></i> {0}</div>'.format(config.error));
			self.html(builder.join(''));
			self.aclass('ui-textbox-container');
			input = self.find('input');
		} else {
			config.error && builder.push('<div class="ui-textbox-helper"><i class="fa fa-warning" aria-hidden="true"></i> {0}</div>'.format(config.error));
			self.aclass('ui-textbox ui-textbox-container');
			self.html(builder.join(''));
			input = self.find('input');
		}
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'readonly':
				self.find('input').prop('readonly', value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('input').prop('disabled', value);
				self.reset();
				break;
			case 'format':
				self.format = value;
				self.refresh();
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				self.tclass('ui-textbox-required', value === true);
				break;
			case 'placeholder':
				input.prop('placeholder', value || '');
				break;
			case 'maxlength':
				input.prop('maxlength', value || 1000);
				break;
			case 'autofill':
				input.prop('name', value ? self.path.replace(/\./g, '_') : '');
				break;
			case 'label':
				if (content && value)
					self.find('.ui-textbox-label span').html(value);
				else
					redraw = true;
				content = value;
				break;
			case 'type':
				self.type = value;
				if (value === 'password')
					value = 'password';
				else
					self.type = 'text';
				self.find('input').prop('type', self.type);
				break;
			case 'align':
				input.rclass(input.attr('class')).aclass('ui-' + value || 'left');
				break;
			case 'autofocus':
				input.focus();
				break;
			case 'icon2click': // backward compatibility
			case 'iconclick':
				config.iconclick = value;
				self.find('.ui-textbox-control').css('cursor', value ? 'pointer' : 'default');
				break;
			case 'icon':
				var tmp = self.find('.ui-textbox-label .fa');
				if (tmp.length)
					tmp.rclass2('fa-').aclass('fa-' + value);
				else
					redraw = true;
				break;
			case 'icon2':
			case 'increment':
				redraw = true;
				break;
			case 'labeltype':
				redraw = true;
				break;
		}

		redraw && setTimeout2('redraw.' + self.id, function() {
			self.redraw();
			self.refresh();
		}, 100);
	};

	self.formatter(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					value = value.toString().toLowerCase();
					break;
				case 'upper':
					value = value.toString().toUpperCase();
					break;
			}
		}
		return config.type === 'date' ? (value ? value.format(config.format || 'yyyy-MM-dd') : value) : value;
	});

	self.parser(function(path, value) {
		if (value) {
			switch (config.type) {
				case 'lower':
					value = value.toLowerCase();
					break;
				case 'upper':
					value = value.toUpperCase();
					break;
			}
		}
		return value ? config.spaces === false ? value.replace(/\s/g, '') : value : value;
	});

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-textbox-invalid', invalid);
		config.error && self.find('.ui-textbox-helper').tclass('ui-textbox-helper-show', invalid);
	};
});

COMPONENT('iframepreview', function(self) {

	var iframe;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-iframepreview');
		self.html('<iframe src="about:blank" frameborder="0" scrolling="no"></iframe>');
		iframe = self.find('iframe');
	};

	self.write = function(content) {

		var is = false;
		var offset = '<div id="IFPOFFSET"></div>';

		content = content.replace(/<\/body>/i, function() {
			is = true;
			return offset + '</body>';
		});

		if (!is)
			content += offset;

		var doc = iframe[0].contentWindow.document;
		doc.open();
		doc.write(content);
		doc.close();
		self.resize();
		setTimeout(self.resize, 500);
		setTimeout(self.resize, 1000);
		setTimeout(self.resize, 2000);
		setTimeout(self.resize, 3000);
	};

	self.resize = function() {
		var el = $(iframe[0].contentWindow.document.getElementById('IFPOFFSET'));
		if (el) {
			var offset = el.offset();
			if (offset) {
				self.element.css('height', offset.top);
				if (offset.top == 0)
					setTimeout(self.resize, 1000);
			}
		}
	};

	self.setter = function(value) {
		if (value == null)
			iframe.attr('src', 'about:blank');
		else
			self.write(value);
	};
});