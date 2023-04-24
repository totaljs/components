COMPONENT('codemirror', 'linenumbers:true;required:false;trim:false;tabs:true;height:200;minheight:200', function(self, config, cls) {

	var editor, container;
	var skipbind = false;
	var cls2 = '.' + cls;

	self.getter = null;
	// self.bindvisible();
	self.nocompile();

	self.reload = function() {
		editor.refresh();
		editor.display.scrollbars.update(true);
	};

	self.validate = function(value) {
		return (config.disabled || !config.required ? true : value && value.length > 0) === true;
	};

	self.insert = function(value) {
		editor.replaceSelection(value);
		self.change(true);
	};

	self.configure = function(key, value, init) {
		if (init)
			return;

		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				editor.readOnly = value;
				editor.refresh();
				break;
			case 'required':
				self.find(cls2 + '-label').tclass(cls + '-label-required', value);
				self.state(1, 1);
				break;
			case 'icon':
				self.find('i').rclass().aclass(value.indexOf(' ') === -1 ? ('ti ti-' + value) : value);
				break;
		}

	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {
		if (config.parent) {
			var parent = self.parent(config.parent);
			var h = parent.height();

			if (h < config.minheight)
				h = config.minheight;

			editor.setSize('100%', (h - config.margin) + 'px');
			self.css('height', h - config.margin);
		} else
			editor.setSize('100%', config.height + 'px');
	};

	self.make = function() {

		var findmatch = function() {

			if (config.mode === 'todo') {
				self.todo_done();
				return;
			}

			var sel = editor.getSelections()[0];
			var cur = editor.getCursor();
			var count = editor.lineCount();
			var before = editor.getLine(cur.line).substring(cur.ch, cur.ch + sel.length) === sel;
			var beg = cur.ch + (before ? sel.length : 0);
			for (var i = cur.line; i < count; i++) {
				var ch = editor.getLine(i).indexOf(sel, beg);
				if (ch !== -1) {
					editor.doc.addSelection({ line: i, ch: ch }, { line: i, ch: ch + sel.length });
					break;
				}
				beg = 0;
			}
		};

		var content = config.label || self.html();
		self.html(((content ? '<div class="{0}-label' + (config.required ? ' {0}-label-required' : '') + '">' + (config.icon ? '<i class="ti ti-' + config.icon + '"></i> ' : '') + content + ':</div>' : '') + '<div class="{0}"></div>').format(cls));
		container = self.find(cls2);

		var options = {};
		options.lineNumbers = config.linenumbers;
		options.mode = config.type || 'htmlmixed';
		options.indentUnit = 4;
		options.scrollbarStyle = 'simple';
		options.scrollPastEnd = true;
		options.extraKeys = { 'Cmd-D': findmatch, 'Ctrl-D': findmatch };

		if (config.tabs)
			options.indentWithTabs = true;

		if (config.type === 'markdown') {
			options.styleActiveLine = true;
			options.lineWrapping = true;
			options.matchBrackets = true;
		}

		options.showTrailingSpace = false;

		editor = CodeMirror(container[0], options);
		self.editor = editor;

		editor.on('keydown', function(editor, e) {

			if (e.shiftKey && e.ctrlKey && (e.keyCode === 40 || e.keyCode === 38)) {
				var tmp = editor.getCursor();
				editor.doc.addSelection({ line: tmp.line + (e.keyCode === 40 ? 1 : -1), ch: tmp.ch });
				e.stopPropagation();
				e.preventDefault();
			}

			if (e.keyCode === 13) {
				var tmp = editor.getCursor();
				var line = editor.lineInfo(tmp.line);
				if ((/^\t+$/).test(line.text))
					editor.replaceRange('', { line: tmp.line, ch: 0 }, { line: tmp.line, ch: line.text.length });
				return;
			}

			if (e.keyCode === 27)
				e.stopPropagation();

		});

		if (config.disabled) {
			self.aclass('ui-disabled');
			editor.readOnly = true;
			editor.refresh();
		}

		var can = {};
		can['+input'] = can['+delete'] = can.undo = can.redo = can.paste = can.cut = can.clear = true;

		editor.on('change', function(a, b) {

			if (config.disabled || !can[b.origin])
				return;

			setTimeout2(self.id, function() {
				var val = editor.getValue();

				if (config.trim) {
					var lines = val.split('\n');
					for (var i = 0, length = lines.length; i < length; i++)
						lines[i] = lines[i].replace(/\s+$/, '');
					val = lines.join('\n').trim();
				}

				skipbind = true;
				self.getter2 && self.getter2(val);
				self.change(true);
				self.set(val, 2);
				config.required && self.validate2();
			}, 200);

		});

		self.resize();
		self.on('resize + resize2', self.resize);
	};

	self.setter = function(value, path, type) {

		if (skipbind) {
			skipbind = false;
			return;
		}

		editor.setValue(value || '');
		editor.refresh();

		setTimeout(function() {
			editor.refresh();
			editor.scrollTo(0, 0);
			type && editor.setCursor(0);
		}, 200);

		setTimeout(function() {
			editor.refresh();
		}, 1000);

		setTimeout(function() {
			editor.refresh();
		}, 2000);
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		container.tclass(cls + '-invalid', invalid);
	};
}, ['https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/codemirror.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/codemirror.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/mode/javascript/javascript.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/mode/htmlmixed/htmlmixed.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/mode/xml/xml.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/mode/css/css.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/mode/markdown/markdown.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.2/addon/mode/overlay.min.js', function(next) {

	CodeMirror.defineMode('totaljsresources', function() {
		var REG_KEY = /^[a-z0-9_\-.#]+/i;
		return {

			startState: function() {
				return { type: 0, keyword: 0 };
			},

			token: function(stream, state) {

				var m;

				if (stream.sol()) {

					var line = stream.string;
					if (line.substring(0, 2) === '//') {
						stream.skipToEnd();
						return 'comment';
					}

					state.type = 0;
				}

				m = stream.match(REG_KEY, true);
				if (m)
					return 'tag';

				if (!stream.string) {
					stream.next();
					return '';
				}

				var count = 0;

				while (true) {

					count++;
					if (count > 5000)
						break;

					var c = stream.peek();
					if (c === ':') {
						stream.skipToEnd();
						return 'def';
					}

					if (c === '(') {
						if (stream.skipTo(')')) {
							stream.eat(')');
							return 'variable-L';
						}
					}

				}

				stream.next();
				return '';
			}
		};
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		function Bar(cls, orientation, scroll) {
			var self = this;
			self.orientation = orientation;
			self.scroll = scroll;
			self.screen = self.total = self.size = 1;
			self.pos = 0;

			self.node = document.createElement('div');
			self.node.className = cls + '-' + orientation;
			self.inner = self.node.appendChild(document.createElement('div'));

			CodeMirror.on(self.inner, 'mousedown', function(e) {

				if (e.which != 1)
					return;

				CodeMirror.e_preventDefault(e);
				var axis = self.orientation == 'horizontal' ? 'pageX' : 'pageY';
				var start = e[axis], startpos = self.pos;

				function done() {
					CodeMirror.off(document, 'mousemove', move);
					CodeMirror.off(document, 'mouseup', done);
				}

				function move(e) {
					if (e.which != 1)
						return done();
					self.moveTo(startpos + (e[axis] - start) * (self.total / self.size));
				}

				CodeMirror.on(document, 'mousemove', move);
				CodeMirror.on(document, 'mouseup', done);
			});

			CodeMirror.on(self.node, 'click', function(e) {
				CodeMirror.e_preventDefault(e);
				var innerBox = self.inner.getBoundingClientRect(), where;
				if (self.orientation == 'horizontal')
					where = e.clientX < innerBox.left ? -1 : e.clientX > innerBox.right ? 1 : 0;
				else
					where = e.clientY < innerBox.top ? -1 : e.clientY > innerBox.bottom ? 1 : 0;
				self.moveTo(self.pos + where * self.screen);
			});

			function onWheel(e) {
				var moved = CodeMirror.wheelEventPixels(e)[self.orientation == 'horizontal' ? 'x' : 'y'];
				var oldPos = self.pos;
				self.moveTo(self.pos + moved);
				if (self.pos != oldPos) CodeMirror.e_preventDefault(e);
			}
			CodeMirror.on(self.node, 'mousewheel', onWheel);
			CodeMirror.on(self.node, 'DOMMouseScroll', onWheel);
		}

		Bar.prototype.setPos = function(pos, force) {
			var t = this;
			if (pos < 0)
				pos = 0;
			if (pos > t.total - t.screen)
				pos = t.total - t.screen;
			if (!force && pos == t.pos)
				return false;
			t.pos = pos;
			t.inner.style[t.orientation == 'horizontal' ? 'left' : 'top'] = (pos * (t.size / t.total)) + 'px';
			return true;
		};

		Bar.prototype.moveTo = function(pos) {
			var t = this;
			t.setPos(pos) && t.scroll(pos, t.orientation);
		};

		var minButtonSize = 10;

		Bar.prototype.update = function(scrollSize, clientSize, barSize) {
			var t = this;
			var sizeChanged = t.screen != clientSize || t.total != scrollSize || t.size != barSize;

			if (sizeChanged) {
				t.screen = clientSize;
				t.total = scrollSize;
				t.size = barSize;
			}

			var buttonSize = t.screen * (t.size / t.total);
			if (buttonSize < minButtonSize) {
				t.size -= minButtonSize - buttonSize;
				buttonSize = minButtonSize;
			}

			t.inner.style[t.orientation == 'horizontal' ? 'width' : 'height'] = buttonSize + 'px';
			t.setPos(t.pos, sizeChanged);
		};

		function SimpleScrollbars(cls, place, scroll) {
			var t = this;
			t.addClass = cls;
			t.horiz = new Bar(cls, 'horizontal', scroll);
			place(t.horiz.node);
			t.vert = new Bar(cls, 'vertical', scroll);
			place(t.vert.node);
			t.width = null;
		}

		SimpleScrollbars.prototype.update = function(measure) {
			var t = this;
			if (t.width == null) {
				var style = window.getComputedStyle ? window.getComputedStyle(t.horiz.node) : t.horiz.node.currentStyle;
				if (style)
					t.width = parseInt(style.height);
			}

			var width = t.width || 0;
			var needsH = measure.scrollWidth > measure.clientWidth + 1;
			var needsV = measure.scrollHeight > measure.clientHeight + 1;

			t.vert.node.style.display = needsV ? 'block' : 'none';
			t.horiz.node.style.display = needsH ? 'block' : 'none';

			if (needsV) {
				t.vert.update(measure.scrollHeight, measure.clientHeight, measure.viewHeight - (needsH ? width : 0));
				t.vert.node.style.bottom = needsH ? width + 'px' : '0';
			}

			if (needsH) {
				t.horiz.update(measure.scrollWidth, measure.clientWidth, measure.viewWidth - (needsV ? width : 0) - measure.barLeft);
				t.horiz.node.style.right = needsV ? width + 'px' : '0';
				t.horiz.node.style.left = measure.barLeft + 'px';
			}

			return {right: needsV ? width : 0, bottom: needsH ? width : 0};
		};

		SimpleScrollbars.prototype.setScrollTop = function(pos) {
			this.vert.setPos(pos);
		};

		SimpleScrollbars.prototype.setScrollLeft = function(pos) {
			this.horiz.setPos(pos);
		};

		SimpleScrollbars.prototype.clear = function() {
			var parent = this.horiz.node.parentNode;
			parent.removeChild(this.horiz.node);
			parent.removeChild(this.vert.node);
		};

		CodeMirror.scrollbarModel.simple = function(place, scroll) {
			return new SimpleScrollbars('CodeMirror-simplescroll', place, scroll);
		};
		CodeMirror.scrollbarModel.overlay = function(place, scroll) {
			return new SimpleScrollbars('CodeMirror-overlayscroll', place, scroll);
		};
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {
		CodeMirror.defineOption('showTrailingSpace', false, function(cm, val, prev) {
			if (prev == CodeMirror.Init)
				prev = false;
			if (prev && !val)
				cm.removeOverlay('trailingspace');
			else if (!prev && val) {
				cm.addOverlay({ token: function(stream) {
					for (var l = stream.string.length, i = l; i; --i) {
						if (stream.string.charCodeAt(i - 1) !== 32)
							break;
					}
					if (i > stream.pos) {
						stream.pos = i;
						return null;
					}
					stream.pos = l;
					return 'trailingspace';
				}, name: 'trailingspace' });
			}
		});
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		CodeMirror.defineOption('scrollPastEnd', false, function(cm, val, old) {
			if (old && old != CodeMirror.Init) {
				cm.off('change', onChange);
				cm.off('refresh', updateBottomMargin);
				cm.display.lineSpace.parentNode.style.paddingBottom = '';
				cm.state.scrollPastEndPadding = null;
			}
			if (val) {
				cm.on('change', onChange);
				cm.on('refresh', updateBottomMargin);
				updateBottomMargin(cm);
			}
		});

		function onChange(cm, change) {
			if (CodeMirror.changeEnd(change).line == cm.lastLine())
				updateBottomMargin(cm);
		}

		function updateBottomMargin(cm) {
			var padding = '';

			if (cm.lineCount() > 1) {
				var totalH = cm.display.scroller.clientHeight - 30;
				var lastLineH = cm.getLineHandle(cm.lastLine()).height;
				padding = (totalH - lastLineH) + 'px';
			}

			if (cm.state.scrollPastEndPadding != padding) {
				cm.state.scrollPastEndPadding = padding;
				cm.display.lineSpace.parentNode.style.paddingBottom = padding;
				cm.off('refresh', updateBottomMargin);
				cm.setSize();
				cm.on('refresh', updateBottomMargin);
			}

		}
	});

	next();
}]);