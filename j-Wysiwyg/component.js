COMPONENT('wysiwyg', 'required:0;links:true;ul:true;code:true;ul:true', function(self, config, cls) {

	var cls2 = '.' + cls;
	var timers = {};
	var buttons = {};
	var D = document;
	var skip = false;
	var placeholder;
	var editor;

	function selectall(el) {
		var doc = W.document, sel, range;
		if (W.getSelection && doc.createRange) {
			sel = W.getSelection();
			range = doc.createRange();
			range.selectNodeContents(el);
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (doc.body.createTextRange) {
			range = doc.body.createTextRange();
			range.moveToElementText(el);
			range.select();
		}
	}

	var findparent = function(node) {
		while (node) {
			if (node === editor[0])
				return;
			if (node.parentNode === editor[0])
				return node;
			node = node.parentNode;
		}
	};

	var check = function(node, tag) {
		while (node) {
			if (node === editor[0])
				return;
			if (node.tagName === tag)
				return node;
			node = node.parentNode;
		}
	};

	var clean = function(node) {
		var tag = D.createTextNode($(node).text());
		editor[0].replaceChild(tag, node);
		selectall(tag);
	};

	self.validate = function(value) {

		if (!config.required)
			return true;

		var type = typeof(value);

		if (type === 'undefined' || type === 'object')
			value = '';
		else
			value = value.toString();

		EMIT('reflow', self.name);
		return value.length > 0;
	};

	self.make = function() {

		self.aclass(cls);
		self.attr('wysiwyg', 'true');

		var buttons = [];
		buttons.push('<button name="bold"><i class="fa fa-bold"></i></button><button name="italic"><i class="fa fa-italic"></i></button><button name="underline"><i class="fa fa-underline"></i></button></button>');

		if (config.links)
			buttons.push('<button name="link"><i class="fa fa-link"></i></button>');

		if (config.code)
			buttons.push('<button name="code"><i class="fa fa-highlighter"></i></button>');

		if (config.ul)
			buttons.push('<button name="ul"><i class="fa fa-list-ul"></i></button>');

		self.append('<div class="{0}-toolbar">{2}</div><div class="{0}-placeholder">{1}</div><div class="{0}-body" contenteditable="true"></div>'.format(cls, config.placeholder, buttons.join('')));
		editor = self.find(cls2 + '-body');
		placeholder = self.find(cls2 + '-placeholder');

		placeholder.on('click', function() {
			placeholder.aclass('hidden');
			editor.focus();
		});

		self.find('button').on('click', function() {
			editor.focus();
			switch (this.name) {
				case 'bold':
					D.execCommand('Bold', false, null);
					break;

				case 'italic':
					D.execCommand('Italic', false, null);
					break;

				case 'underline':
					D.execCommand('Underline', false, null);
					break;

				case 'ul':
					var node = self.getNode();
					var selection = self.getSelection();
					D.execCommand('insertHtml', false, '<ul><li>{0}</li></ul>'.format((node === editor[0] ? selection : node.innerHTML) || ''));
					break;

				case 'mark':
					var node = self.getNode();
					var tag = check(node, 'SPAN');
					if (tag) {
						clean(tag);
					} else {
						var selection = self.getSelection();
						selection && D.execCommand('insertHtml', false, '<span class="marked">{0}</span>'.format(node === editor[0] ? selection : node.innerHTML));
					}
					break;

				case 'code':
					var node = self.getNode();
					var tag = check(node, 'CODE');
					if (tag) {
						clean(tag);
					} else {
						var selection = self.getSelection();
						selection && D.execCommand('insertHtml', false, '<code>{0}</code>'.format(node === editor[0] ? selection : node.innerHTML));
					}
					break;

				case 'clean':
					var selection = self.getSelection();
					if (selection) {
						node = self.getSelection(true);
					} else {
						node = findparent(self.getNode());
						node && clean(node);
					}
					break;

				case 'link':
					var node = self.getNode();
					var tag = check(node, 'A');
					if (tag) {
						clean(tag);
					} else {
						var id = '#URL' + Date.now();
						var html = self.getSelection();
						if (html) {
							D.execCommand('CreateLink', false, id);
							var a = self.find('a[href="{0}"]'.format(id)).attr('target', '_blank').attr('href', html);
							self.event('link', a);
						}
					}
					break;
			}
		}).each(function() {
			buttons[this.name] = this;
		});

		var el = self.element;

		el.on('selectstart', function() {
			clearTimeout(timers.selection);
			timers.selection = setTimeout(function() {
				self.event('select', self.getSelection());
			}, 500);
		});

		editor.on('focus', function() {
			clearTimeout(timers.focused);
			clearInterval(timers.changes);
			timers.changes = null;
			self.focused = true;
			self.event('focus', self);
			placeholder.aclass('hidden');
		});

		self.save = function() {
			skip = true;
			self.getter(editor.html());
		};

		editor.on('click', function(e) {
			e.target && self.event('click', e.target);
		});

		editor.on('blur', function() {
			var t = editor.text().trim();
			placeholder.tclass('hidden', !!t);
			clearTimeout(timers.focused);
			clearInterval(timers.changes);
			timers.changes = null;
			self.save();
			timers.focused = setTimeout(function() {
				self.event('blur', self);
			}, 200);
		});

		editor.on('paste', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var text = e.originalEvent.clipboardData.getData(self.attrd('clipboard') || 'text/plain');
			self.event('paste', text);
		});

		editor.on('keydown', function(e) {

			if (!timers.changes)
				timers.changes = setInterval(self.save, 1000);

			if (!e.metaKey && !e.ctrlKey)
				return;

			if (e.which === 66) {
				// bold
				D.execCommand('Bold', false, null);
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			if (e.which === 76) {
				// link
				e.preventDefault();
				e.stopPropagation();

				var html = self.getSelection();
				if (html) {
					var id = '#URL' + Date.now();
					D.execCommand('CreateLink', false, id);
					var a = self.find('a[href="{0}"]'.format(id)).attr('target', '_blank').attr('href', html);
					self.event('link', a);
				}
				return;
			}

			if (e.which === 73) {
				// italic
				D.execCommand('Italic', false, null);
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			if (e.which === 85) {
				// underline
				D.execCommand('Underline', false, null);
				e.preventDefault();
				e.stopPropagation();
				return;
			}
		});

		var notify = function(e) {
			timers.notify = null;
			self.event('cursor', e.target);
		};

		el.on('keydown', function(e) {
			timers.notify && clearTimeout(timers.notify);
			timers.notify = setTimeout(notify, 100, e);
		});
	};

	self.exec = function() {
		D.execCommand.apply(D, arguments);
		return self;
	};

	self.insert = function(value, encoded) {
		D.execCommand(encoded ? 'insertText' : 'insertHtml', false, value);
		return self;
	};

	var loadformat = function() {

		var node = self.getNode();
		var toolbar = {};

		while (node) {

			if (node === editor[0])
				return toolbar;

			switch (node.tagName) {
				case 'B':
					toolbar.bold = 1;
					break;
				case 'I':
					toolbar.italic = 1;
					break;
				case 'A':
					toolbar.link = 1;
					break;
				case 'SPAN':
					toolbar.mark = 1;
					break;
				case 'CODE':
					toolbar.code = 1;
					break;
				case 'S':
					toolbar.strike = 1;
					break;
				case 'U':
					toolbar.underline = 1;
					break;
			}

			node = node.parentNode;
		}

		return toolbar;
	};

	self.event = function(type, value) {

		// type = bold          - when a text is bolded (value is boolean)
		// type = italic        - when a text is italic (value is boolean)
		// type = underline     - when a text is underlined (value is boolean)
		// type = link          - when a link is created (value is a temporary URL)
		// type = current       - when a current element is changed in the text (value is NODE)
		// type = paste         - when the clipboard is used (value is a clipboard value)
		// type = select        - when a text is selected (value is selected text)
		// type = focus         - editor is focused (value is undefined)
		// type = blur          - editor is not focused (value is undefined)
		// type = click         - click on the specific element in the text (value is NODE)

		if (type === 'click' || type === 'cursor') {

			var format = loadformat();
			var keys = Object.keys(buttons);

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var btn = buttons[key];
				var is = format[key] === 1;
				if (btn.prevstate !== is) {
					if (is)
						btn.classList.add('selected');
					else
						btn.classList.remove('selected');
					btn.prevstate = is;
				}
			}
		}

		if (type === 'paste')
			self.insert(value, true);
	};

	self.getNode = function() {
		var node = D.getSelection().anchorNode;
		if (node)
			return (node.nodeType === 3 ? node.parentNode : node);
	};

	self.getSelection = function(node) {
		if (D.selection && D.selection.type === 'Text')
			return D.selection.createRange().htmlText;
		else if (!W.getSelection)
			return;
		var sel = W.getSelection();
		if (!sel.rangeCount)
			return '';
		var container = D.createElement('div');
		for (var i = 0, len = sel.rangeCount; i < len; ++i)
			container.appendChild(sel.getRangeAt(i).cloneContents());
		return node ? container : container.innerHTML;
	};

	self.focus = function() {
		editor.focus();
	};

	self.setter = function(value, path, type) {

		if (skip && type === 2) {
			skip = false;
			return;
		}

		var val = value ? (value + '').trim() : '';
		self.reset();
		editor.html(val);
		placeholder.tclass('hidden', !!val);
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = self.isInvalid();
		if (invalid !== self.$oldstate) {
			self.$oldstate = invalid;
			self.tclass(cls + '-invalid', invalid);
		}
	};
});