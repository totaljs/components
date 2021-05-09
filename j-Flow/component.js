COMPONENT('flow', 'width:6000;height:6000;grid:25;paddingX:6;curvedlines:0;horizontal:1;steplines:1;animationradius:6;outputoffsetY:10;outputoffsetX:12;inputoffsetY:10;inputoffsetX:12', function(self, config, cls) {

	// config.infopath {String}, output: { zoom: Number, selected: Object }
	// config.undopath {String}, output: {Object Array}
	// config.redopath {String}, output: {Object Array}

	var D = '__';
	var drag = {};

	self.readonly();
	self.meta = {};
	self.el = {};     // elements
	self.op = {};     // operations
	self.cache = {};  // cache
	self.paused = {};
	self.animations = {};
	self.animations_token = 0;
	self.info = { zoom: 100 };
	self.undo = [];
	self.redo = [];

	self.make = function() {
		self.aclass(cls);

		self.html('<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="jflowgrid" width="{grid}" height="{grid}" patternunits="userSpaceOnUse"><path d="M {grid} 0 L 0 0 0 {grid}" fill="none" class="ui-flow-grid" shape-rendering="crispEdges" /></pattern></defs><rect width="100%" height="100%" fill="url(#jflowgrid)" shape-rendering="crispEdges" /><g class="lines"></g><g class="anim"></g></svg>'.arg(config));
		self.el.svg = self.find('svg');
		self.el.anim = self.el.svg.find('g.anim');
		self.el.lines = self.el.svg.find('g.lines');
		self.template = Tangular.compile('<div class="component invisible{{ if inputs && inputs.length }} hasinputs{{ fi }}{{ if outputs && outputs.length }} hasoutputs{{ fi }} f-{{ component }}" data-id="{{ id }}" style="top:{{ y }}px;left:{{ x }}px"><div class="area"><div class="content">{{ html | raw }}</div>{{ if inputs && inputs.length }}<div class="inputs">{{ foreach m in inputs }}<div class="input" data-index="{{ if m.id }}{{ m.id }}{{ else }}{{ $index }}{{ fi }}"><i class="component-io"></i><span>{{ if m.name }}{{ m.name | raw }}{{ else }}{{ m | raw }}{{ fi }}</span></div>{{ end }}</div>{{ fi }}{{ if outputs && outputs.length }}<div class="outputs">{{ foreach m in outputs }}<div class="output" data-index="{{ if m.id }}{{ m.id }}{{ else }}{{ $index }}{{ fi }}"><i class="component-io"></i><span>{{ if m.name }}{{ m.name | raw }}{{ else }}{{ m | raw }}{{ fi }}</span></div>{{ end }}</div>{{ fi }}</div></div>');
		self.aclass(cls + '-' + (config.horizontal ? 'h' : 'v'));

		drag.touchmove = function(e) {
			var evt = e.touches[0];
			drag.lastX = evt.pageX;
			drag.lastY = evt.pageY;
		};

		drag.touchend = function(e) {
			e.target = document.elementFromPoint(drag.lastX, drag.lastY);

			if (e.target && e.target.tagName !== 'SVG')
				e.target = $(e.target).closest('svg')[0];

			drag.unbind();

			if (e.target) {
				var pos = self.op.position();
				e.pageX = drag.lastX;
				e.pageY = drag.lastY;
				e.offsetX = e.pageX - pos.left;
				e.offsetY = e.pageY - pos.top;
				drag.drop(e);
			}
		};

		drag.bind = function() {
			$(document).on('touchmove', drag.touchmove).on('touchend', drag.touchend);
		};

		drag.unbind = function() {
			$(document).off('touchmove', drag.touchmove).off('touchend', drag.touchend);
		};

		drag.handler = function(e) {

			if (HIDDEN(self.element))
				return;

			drag.el = $(e.target);
			e.touches && drag.bind();
			var dt = e.originalEvent.dataTransfer;
			dt && dt.setData('text', '1');
		};

		drag.drop = function(e) {
			var meta = {};
			meta.pageX = e.pageX;
			meta.pageY = e.pageY;
			meta.offsetX = e.offsetX;
			meta.offsetY = e.offsetY;
			meta.el = drag.el;
			meta.target = $(e.target);
			config.ondrop && self.EXEC(config.ondrop, meta, self);
		};

		$(document).on('dragstart', '[draggable]', drag.handler).on('touchstart', '[draggable]', drag.handler);

		self.el.svg.on('dragenter dragover dragexit drop dragleave', function(e) {
			switch (e.type) {
				case 'drop':
					drag.drop(e);
					break;
			}
			e.preventDefault();
		});
	};

	self.destroy = function() {
		$(document).off('dragstart', drag.handler);
	};

	self.getOffset = function() {
		return self.element.offset();
	};

	var rebuilding = false;
	var rebuildagain = false;

	self.setter = function(value, path, type) {

		if (rebuilding) {
			rebuildagain = true;
			return;
		}

		if (type === 2 || !value)
			return;

		var keys = Object.keys(value);
		var onmake = config.onmake ? GET(self.makepath(config.onmake)) : null;
		var ondone = config.ondone ? GET(self.makepath(config.ondone)) : null;
		var onremove = config.onremove ? GET(self.makepath(config.onremove)) : null;
		var prev = self.cache;
		var ischanged = false;
		var tmp;
		var el;
		var recompile = false;

		rebuilding = true;

		self.cache = {};
		self.paused = {};
		self.animations_token = Date.now();
		self.animations = {};

		for (var i = 0; i < keys.length; i++) {

			var key = keys[i];

			if (key === 'paused') {
				self.paused = value[key];
				continue;
			}

			var com = value[key];
			var checksum = self.helpers.checksum(com);

			// com.id = key
			// com.outputs = ['0 output', '1 output', '2 output'] or [{ id: 'X', name: 'Output X' }]
			// com.inputs = ['0 input', '1 input', '2 input'] or [{ id: 'X', name: 'Input X' }]
			// com.connections = { 0: { ID: COMPONENT_ID, index: 'INDEX' } };
			// com.x
			// com.y
			// com.actions = { select: true, move: true, disabled: false, remove: true, connet: true };

			// Delegates
			// com.onmake = function(el, com)
			// com.ondone = function(el, com)
			// com.onmove = function(el, com)
			// com.onremove = function(el, com)
			// com.onconnect = function(meta)
			// com.ondisconnect = function(meta)

			// done && done(el, com);
			// make && make(el, com);

			var tmp = prev[key];
			var rebuild = true;

			com.id = key;

			if (tmp) {
				if (tmp.checksum === checksum)
					rebuild = false;
				delete prev[key];
				el = tmp.el;
			}

			if (rebuild) {
				tmp && tmp.el.aclass('removed').attrd('id', 'removed');
				var html = self.template(com);

				if (!recompile && html && html.COMPILABLE())
					recompile = true;

				html = $(html);
				self.append(html);
				el = self.find('.component[data-id="{id}"]'.arg(com));
				com.onmake && com.onmake(el, com);
				onmake && onmake(el, com);
				com.element = html.find('.content').eq(0);
				if (!ischanged && com.connections && Object.keys(com.connections).length)
					ischanged = true;
				if (type === 1)
					self.op.undo({ type: 'component', id: com.id, instance: com });
			}

			if (!com.connections)
				com.connections = {};

			self.cache[key] = { id: key, instance: com, el: el, checksum: checksum, actions: com.actions || {}};
		}

		var removedconn = [];

		// Remove unused components
		for (var key in prev) {
			tmp = prev[key];
			tmp.instance.onremove && tmp.instance.onremove(tmp.el, tmp.instance);
			onremove && onremove(tmp.el, tmp.instance);
			var conn = self.el.lines.find('.from' + D + key + ',.to' + D + key).aclass('connection removed hidden');
			for (var i = 0; i < conn.length; i++) {
				var dom = conn[i];
				removedconn.push({ fromid: dom.getAttribute('data-from'), fromindex: dom.getAttribute('data-fromindex'), toid: dom.getAttribute('data-to'), toindex: dom.getAttribute('data-toindex') });
			}
			tmp.el.remove();
		}

		for (var key in self.cache) {
			tmp = self.cache[key];
			tmp.instance.ondone && tmp.instance.ondone(tmp.el, tmp.instance);
			ondone && ondone(tmp.el, tmp.instance);
		}

		self.el.lines.find('path').aclass('removed');
		keys = Object.keys(self.cache);

		setTimeout(function() {

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				tmp = self.cache[key];
				tmp.el.rclass('invisible');
				tmp.instance.connections && self.reconnect(tmp);
			}

			self.find('.removed').remove();
			rebuilding = false;

			for (var i = 0; i < removedconn.length; i++) {
				var conn = removedconn[i];
				self.helpers.checkconnectedinput(conn.toid, conn.toindex);
				self.helpers.checkconnectedoutput(conn.fromid, conn.fromindex);
				var com = self.find('.component[data-id="' + conn.fromid + '"]');
				com.tclass('connected', self.el.lines.find('.from' + D + '_' + conn.fromid).length > 0);
			}

			rebuildagain && self.refresh();
			rebuildagain = false;

		}, 300);

		self.undo = [];
		self.redo = [];
		self.op.undo();
		self.op.redo();
		self.op.refreshinfo();

		COMPILE();
	};

	self.reconnect = function(m) {
		for (var index in m.instance.connections) {
			var output = m.el.find('.output[data-index="{0}"]'.format(index));
			var inputs = m.instance.connections[index];
			var problem = false;
			for (var j = 0; j < inputs.length; j++) {
				var com = inputs[j];
				var el = self.find('.component[data-id="{0}"]'.format(com.id));
				var input = el.find('.input[data-index="{0}"]'.format(com.index));
				if (!self.el.connect(output, input, true)) {
					inputs[j] = null;
					problem = true;
				}
			}
			if (problem) {
				index = 0;
				while (true) {
					var item = inputs[index];
					if (item === undefined)
						break;
					if (item === null)
						inputs.splice(index, 1);
					else
						index++;
				}
			}
		}
	};

	self.selected = function(callback) {

		var output = {};
		var arr;
		var tmp;
		var el;

		output.components = [];
		output.connections = [];

		arr = self.find('.component-selected');
		for (var i = 0; i < arr.length; i++) {
			el = arr[i];
			tmp = self.cache[el.getAttribute('data-id')];
			tmp && output.components.push(tmp);
		}

		arr = self.find('.connection-selected');
		for (var i = 0; i < arr.length; i++) {

			el = arr[i];
			var cls = el.getAttribute('class').split(' ');
			for (var j = 0; j < cls.length; j++) {
				var c = cls[j];
				if (c.substring(0, 4 + D.length) === 'conn' + D) {
					var a = c.split(D);
					var tmp = {};
					tmp.output = self.cache[a[1]].instance;
					tmp.input = self.cache[a[2]].instance;
					tmp.fromid = a[1];
					tmp.toid = a[2];
					tmp.fromindex = a[3];
					tmp.toindex = a[4];
					output.connections.push(tmp);
				}
			}
		}

		callback && callback(output);
		return output;
	};
});

// Designer: Helpers
EXTENSION('flow:helpers', function(self, config) {

	var D = '__';

	self.helpers = {};

	self.helpers.checksum = function(obj) {
		var checksum = JSON.stringify({ a: obj.outputs, b: obj.inputs, c: obj.html, d: obj.x, e: obj.y, f: obj.connections });
		return HASH(checksum, true);
	};

	self.helpers.connect = function(x1, y1, x4, y4, findex, tindex) {

		if (tindex === -1)
			tindex = 0;

		if (findex === -1)
			findex = 0;

		var y = (y4 - y1) / 2;
		var x2 = x1;
		var y2 = y1 + y;
		var x3 = x4;
		var y3 = y1 + y;
		var s = ' ';

		if (config.curvedlines)
			return self.helpers.diagonal(x1, y1, x4, y4);

		var paddingO = config.steplines ? Math.ceil(15 * ((findex + 1) / 100) * 50) : 15;
		var paddingI = config.steplines ? Math.ceil(15 * ((tindex + 1) / 100) * 50) : 15;
		var can = config.steplines && Math.abs(x1 - x4) > 50 && Math.abs(y1 - y4) > 50;
		var builder = [];

		builder.push('M' + (x1 >> 0) + s + (y1 >> 0));

		if (config.horizontal) {

			if (can)
				x2 += paddingO;

			x2 += paddingO * 2;

			builder.push('L' + (x2 >> 0) + s + (y1 >> 0));

			if (can) {
				if ((x1 !== x4 || y1 !== y4)) {
					var d = Math.abs(paddingO - paddingI) / 2 >> 0;
					y2 += d;
					builder.push('L' + (x2 >> 0) + s + (y2 >> 0));
					y3 += d;
					x3 -= paddingI * 3;
					builder.push('L' + (x3 >> 0) + s + (y3 >> 0));
				}
				x4 -= paddingI;
			}

			if (can)
				x4 -= paddingI * 2;
			else
				x4 -= paddingI;

			builder.push('L' + (x4 >> 0) + s + (y4 >> 0));

			if (can)
				x4 += paddingI * 2;

			x4 += paddingI;

		} else if (can) {
			if ((x1 !== x4 || y1 !== y4)) {
				builder.push('L' + (x2 >> 0) + s + (y2 >> 0));
				builder.push('L' + (x3 >> 0) + s + (y3 >> 0));
			}
		}

		builder.push('L' + (x4 >> 0) + s + (y4 >> 0));
		return builder.join(s);
	};

	self.helpers.move1 = function(x1, y1, conn, findex, tindex) {
		var pos = conn.attrd('offset').split(',');
		conn.attr('d', self.helpers.connect(x1, y1, +pos[2], +pos[3], findex, tindex));
		conn.attrd('offset', x1 + ',' + y1 + ',' + pos[2] + ',' + pos[3]);
	};

	self.helpers.checkconnected = function(meta) {
		meta.el.tclass('connected', Object.keys(meta.instance.connections).length > 0);
	};

	self.helpers.checkconnectedoutput = function(id, index) {
		var is = !!self.el.lines.find('.from' + D + id + D + index).length;
		self.find('.component[data-id="{0}"]'.format(id)).find('.output[data-index="{0}"]'.format(index)).tclass('connected', is);
	};

	self.helpers.checkconnectedinput = function(id, index) {
		var is = !!self.el.lines.find('.to' + D + id + D + index).length;
		self.find('.component[data-id="{0}"]'.format(id)).find('.input[data-index="{0}"]'.format(index)).tclass('connected', is);
	};

	self.helpers.move2 = function(x4, y4, conn, findex, tindex) {
		var pos = conn.attrd('offset').split(',');
		conn.attr('d', self.helpers.connect(+pos[0], +pos[1], x4, y4, findex, tindex));
		conn.attrd('offset', pos[0] + ',' + pos[1] + ',' + x4 + ',' + y4);
	};

	self.helpers.isconnected = function(output, input) {

		var co = output.closest('.component');
		var ci = input.closest('.component');
		var coid = self.cache[co.attrd('id')];
		var ciid = self.cache[ci.attrd('id')];

		if (coid.id === ciid.id)
			return true;

		if (coid.actions.disabled || coid.actions.connect === false || ciid.actions.disabled || ciid.actions.connect === false)
			return true;

		var el = $('.conn' + D + co.attrd('id') + D + ci.attrd('id') + D + output.attrd('index') + D + input.attrd('index'));
		return el.length > 0;
	};

	self.helpers.position = function(el, isout) {

		var component = el.closest('.component');
		var pos = el.offset();
		var mainoffset = el.closest('.ui-flow').offset();

		var x = (pos.left - mainoffset.left) + (isout ? config.outputoffsetX : config.inputoffsetX);
		var y = (pos.top - mainoffset.top) + (isout ? config.outputoffsetY : config.inputoffsetY);

		if (config.horizontal) {
			var zoom = self.info.zoom / 100;
			if (isout)
				x += (component.width() * zoom) - 13;
		}

		var id = component.attrd('id');
		var indexid = el.attrd('index');

		return { x: x >> 0, y: y >> 0, id: id, index: indexid, indexoffset: el.index() };
	};

	self.helpers.parseconnection = function(line) {
		var arr = line.attr('class').split(' ');
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].substring(0, 4 + D.length) === 'conn' + D) {
				var info = arr[i].split(D);
				var obj = {};
				obj.fromid = info[1];
				obj.toid = info[2];
				obj.fromindex = info[3];
				obj.toindex = info[4];
				return obj;
			}
		}
	};

	self.helpers.diagonal = function(x1, y1, x4, y4) {
		if (config.horizontal)
			return 'M' + x1 + ',' + y1 + 'C' + ((x1 + x4) / 2) + ',' + y1 + ' ' + x4 + ',' + ((y1 + y4) / 2) + ' ' + x4 + ',' + y4;
		else
			return 'M' + x1 + ',' + y1 + 'C' + x1 +  ',' + ((y1 + y4) / 2) + ' ' + x4 + ',' + ((y1 + y4) / 2) + ' ' + x4 + ',' + y4;
	};

});

EXTENSION('flow:operations', function(self, config) {

	var D = '__';

	// Internal method
	var removeconnections = function(next, removed) {

		var connections = next.instance.connections;
		var meta = {};
		var onremove = function(conn) {

			var is = conn.id === removed.id;
			if (is) {
				meta.output = next.instance;
				meta.input = removed.instance;
				meta.fromid = next.id;
				meta.toid = removed.id;
				meta.toindex = conn.index;
				next.instance.ondisconnect && next.instance.ondisconnect.call(next.instance, meta);
				removed.instance.ondisconnect && removed.instance.ondisconnect.call(removed.instance, meta);
				config.ondisconnect && self.EXEC(config.ondisconnect, meta);
			}

			return is;
		};

		for (var index in connections) {
			var conn = connections[index];
			meta.fromindex = index;
			connections[index] = conn = conn.remove(onremove);
			if (conn.length === 0) {
				delete connections[index];
				self.helpers.checkconnectedoutput(next.id, index);
			}
		}

		self.helpers.checkconnected(next);
	};

	self.op.unselect = function(type) {
		var cls = 'connection-selected';
		if (type == null || type === 'connections') {
			self.el.lines.find('.' + cls).rclass(cls);
			self.el.lines.find('.highlight').rclass('highlight');
		}

		cls = 'component-selected';

		if (type == null || type === 'component')
			self.find('.' + cls).rclass(cls);

		if (self.info.selected) {
			self.info.selected = null;
			self.op.refreshinfo();
		}

	};

	self.op.modified = function() {
		self.change(true);
		self.update(true, 2);
	};

	self.op.clean = function() {

		var model = self.get();

		for (var key in model) {

			if (key === 'paused') {
				var count = 0;
				for (var subkey in model.paused) {
					var tmp = subkey.split(D);
					if (!model[tmp[1]] || !model[tmp[1]].connections || !model[tmp[1]].connections[tmp[2]])
						delete model.paused[subkey];
					else
						count++;
				}
				if (!count)
					delete model.paused;
				continue;
			}

			// check connections
			var com = model[key];
			for (var subkey in com.connections) {

				var tmp = model[key].connections[subkey];
				var index = 0;

				while (true) {
					var conn = tmp[index];
					if (conn == null)
						break;

					if (!model[conn.id] || !model[conn.id].inputs) {
						tmp.splice(index, 1);
						continue;
					}

					index++;
				}

				if (!tmp.length)
					delete model[key].connections;
			}
		}
	};

	self.op.remove = function(id, noundo) {

		var tmp = self.cache[id];
		if (tmp == null || tmp.actions.remove === false)
			return false;

		tmp.instance.onremove && tmp.instance.onremove(tmp.el, tmp.instance);
		config.onremove && self.EXEC(config.onremove, tmp.el, tmp.instance);

		delete self.cache[id];
		delete self.get()[id];

		self.el.lines.find('.from' + D + id).remove();
		self.el.lines.find('.to' + D + id).remove();

		// browse all components and find dependencies to this component
		for (var key in self.cache)
			removeconnections(self.cache[key], tmp);

		var connections = tmp.instance.connections;

		for (var index in connections) {
			var conns = connections[index];
			for (var j = 0; j < conns.length; j++) {
				var conn = conns[j];
				self.helpers.checkconnectedinput(conn.id, conn.index);
			}
		}

		if (!noundo)
			self.op.undo({ type: 'remove', id: id, instance: tmp.instance });

		self.find('.component[data-id="{0}"]'.format(id)).remove();
		self.op.modified();
		return true;
	};

	self.op.select = function(id) {

		var com = self.cache[id];
		if (com == null)
			return false;

		var cls = 'component-selected';
		self.find('.' + cls).rclass(cls);
		self.find('.component[data-id="{0}"]'.format(id)).aclass(cls);

		var connections = self.el.lines.find('.from{0},.to{0}'.format(D + id)).aclass('highlight');
		var parent = self.el.lines[0];

		for (var i = 0; i < connections.length; i++) {
			var dom = connections[i];
			parent.removeChild(dom);
			parent.appendChild(dom);
		}

		self.info.selected = com.instance;
		self.op.refreshinfo();
		return true;
	};

	self.op.modify = function(instance, type) {
		if (!instance.changes)
			instance.changes = {};
		instance.changes[type] = 1;
	};

	self.op.disconnect = function(fromid, toid, fromindex, toindex, noundo) {

		if (typeof(fromid) === 'object') {
			var meta = fromid;
			toid = meta.toid;
			fromindex = meta.fromindex;
			toindex = meta.toindex;
			fromid = meta.fromid;
		}

		var a = self.cache[fromid];
		var b = self.cache[toid];

		if (!a || !b)
			return false;

		var ac = a.instance;

		self.op.modify(a.instance, 'disconnect');
		self.op.modify(b.instance, 'disconnect');

		toindex += '';
		fromindex += '';

		var conn = ac.connections[fromindex].findItem(function(conn) {
			return conn.id === toid && conn.index === toindex;
		});

		if (!conn || conn.disabled)
			return false;

		ac.connections[fromindex].splice(ac.connections[fromindex].indexOf(conn), 1);

		if (!ac.connections[fromindex].length)
			delete ac.connections[fromindex];

		if (!noundo)
			self.op.undo({ type: 'disconnect', fromid: fromid, toid: toid, fromindex: fromindex, toindex: toindex });

		self.el.lines.find('.conn{0}{1}{2}{3}'.format(D + fromid, D + toid, D + fromindex, D + toindex)).remove();
		self.op.modified();
		self.helpers.checkconnected(a);
		self.helpers.checkconnectedoutput(fromid, fromindex);
		self.helpers.checkconnectedinput(toid, toindex);
		return true;
	};

	self.op.reposition = function() {

		var dzoom = self.info.zoom / 100;
		var dzoomoffset = ((100 - self.info.zoom) / 10) + (self.info.zoom > 100 ? 1 : -1);

		var zoom = function(val) {
			return Math.ceil(val / dzoom) - dzoomoffset;
		};

		self.el.lines.find('.connection').each(function() {

			var path = $(this);
			if (path.hclass('removed'))
				return;

			var meta = self.helpers.parseconnection(path);

			if (!meta)
				return;

			var output = self.find('.component[data-id="{0}"]'.format(meta.fromid)).find('.output[data-index="{0}"]'.format(meta.fromindex));
			if (!output.length)
				return;

			var input = self.find('.component[data-id="{0}"]'.format(meta.toid)).find('.input[data-index="{0}"]'.format(meta.toindex));
			if (!input.length)
				return;

			var a = self.helpers.position(output, true);
			var b = self.helpers.position(input);

			// I don't know why :-D
			b.x -= config.paddingX;

			if (dzoom !== 1) {
				b.x = zoom(b.x);
				b.y = zoom(b.y);
				a.x = zoom(a.x);
				a.y = zoom(a.y);
			}

			path.attrd('offset', a.x + ',' + a.y + ',' + b.x + ',' + b.y);
			path.attrd('from', a.id);
			path.attrd('to', b.id);
			path.attrd('fromindex', a.index);
			path.attrd('toindex', b.index);
			path.attrd('fromindexoffset', a.indexoffset);
			path.attrd('toindexoffset', b.indexoffset);
			path.attr('d', self.helpers.connect(a.x, a.y, b.x, b.y, a.indexoffset, b.indexoffset));
		});
	};

	self.op.position = function() {
		var obj = {};
		var scroll = self.closest('.ui-scrollbar-area')[0];

		if (scroll) {
			obj.scrollTop = scroll.scrollTop;
			obj.scrollLeft = scroll.scrollLeft;
		}

		var offset = self.el.svg.offset();
		obj.left = offset.left;
		obj.top = offset.top;
		return obj;
	};

	self.op.refreshinfo = function() {
		config.infopath && self.SEEX(config.infopath, self.info);
	};

	self.op.undo = function(value) {
		if (value) {
			self.undo.push(value);
			if (self.undo.length > 50)
				self.undo.shift();
		}
		config.undopath && self.SEEX(config.undopath, self.undo);
	};

	self.op.redo = function(value) {
		if (value) {
			self.redo.push(value);
			if (self.redo.length > 50)
				self.redo.shift();
		}
		config.redopath && self.SEEX(config.redopath, self.redo);
	};

	self.op.resize = function() {
		setTimeout2(self.ID + 'reposition', self.op.reposition, 300);
	};

	self.on('resize + resize2', self.op.resize);
});

EXTENSION('flow:map', function(self, config) {

	var events = {};
	var drag = {};

	events.move = function(e) {
		var x = (drag.x - e.pageX);
		var y = (drag.y - e.pageY);

		if (drag.target[0]) {
			drag.target[0].scrollTop += ((y / 6) / drag.zoom) >> 0;
			drag.target[0].scrollLeft += ((x / 6) / drag.zoom) >> 0;
		}
	};

	events.movetouch = function(e) {
		events.move(e.touches[0]);
	};

	events.up = function() {
		events.unbind();
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			self.element.on('mouseup', events.up);
			self.element.on('mousemove', events.move);
			self.element.on('touchend', events.up);
			self.element.on('touchmove', events.movetouch);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			self.element.off('mouseup', events.up);
			self.element.off('mousemove', events.move);
			self.element.off('touchend', events.up);
			self.element.off('touchmove', events.movetouch);
		}
	};

	self.event('contextmenu', function(e) {
		events.is && events.up();
		config.contextmenu && self.SEEX(config.contextmenu, e, 'map');
		e.preventDefault();
		e.stopPropagation();
	});

	self.event('mousedown touchstart', function(e) {

		if (events.is) {
			events.up();
			return;
		}

		if (e.button || e.target.tagName !== 'rect')
			return;

		var evt = e.touches ? e.touches[0] : e;
		var et = $(e.target);
		var target = et.closest('.ui-scrollbar-area');

		if (!target[0]) {
			target = et.closest('.ui-viewbox');
			if (!target[0])
				return;
		}

		drag.target = target;
		drag.zoom = self.info.zoom / 100;
		drag.x = evt.pageX;
		drag.y = evt.pageY;

		events.bind();
		e.preventDefault();

		// Unselects all selected components/connections
		self.op.unselect();
	});
});

EXTENSION('flow:components', function(self, config) {

	var D = '__';
	var events = {};
	var drag = {};

	var zoom = function(val) {
		return Math.ceil(val / drag.zoom) - drag.zoomoffset;
	};

	drag.css = {};

	events.move = function(e) {

		var x = (e.pageX - drag.x);
		var y = (e.pageY - drag.y);

		drag.css.left = zoom(drag.posX + x);
		drag.css.top = zoom(drag.posY + y);

		if (!drag.is)
			drag.is = true;

		drag.target.css(drag.css);

		// move all output connections
		for (var i = 0; i < drag.output.length; i++) {
			var conn = $(drag.output[i]);
			var pos = self.helpers.position(conn, true);
			var arr = self.el.lines.find('.from' + D + pos.id + D + pos.index);
			for (var j = 0; j < arr.length; j++) {
				var ce = $(arr[j]);
				var findex = +ce.attrd('fromindexoffset');
				var tindex = +ce.attrd('toindexoffset');
				self.helpers.move1(zoom(pos.x + drag.zoomoffset), zoom(pos.y), ce, findex, tindex);
			}
		}

		// move all input connections
		for (var i = 0; i < drag.input.length; i++) {
			var conn = $(drag.input[i]);
			var pos = self.helpers.position(conn);
			var arr = self.el.lines.find('.to' + D + pos.id + D + pos.index);
			var findex = +conn.attrd('fromindexoffset');
			var tindex = +conn.attrd('toindexoffset');
			for (var j = 0; j < arr.length; j++) {
				var ce = $(arr[j]);
				var findex = +ce.attrd('fromindexoffset');
				var tindex = +ce.attrd('toindexoffset');
				self.helpers.move2(zoom(pos.x - 6), zoom(pos.y), ce, findex, tindex);
			}
		}
	};

	events.movetouch = function(e) {
		events.move(e.touches[0]);
	};

	events.up = function() {

		if (drag.is) {
			var data = self.get()[drag.id];
			self.op.undo({ type: 'move', id: drag.id, x: data.x, y: data.y, newx: drag.css.left, newy: drag.css.top });
			data.x = drag.css.left;
			data.y = drag.css.top;
			data.onmove && data.onmove(drag.target, data);
			config.onmove && self.EXEC(config.onmove, drag.target, data);
			self.op.modified();
			self.op.modify(data, 'move');
		}

		events.unbind();
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			self.element.on('mouseup', events.up);
			self.element.on('mousemove', events.move);
			self.element.on('touchend', events.up);
			self.element.on('touchmove', events.movetouch);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			self.element.off('mouseup', events.up);
			self.element.off('mousemove', events.move);
			self.element.off('touchend', events.up);
			self.element.off('touchmove', events.movetouch);
		}
	};

	self.event('contextmenu', '.area', function(e) {
		events.is && events.up();
		var el = $(this);
		var id = el.closest('.component').attrd('id');
		config.contextmenu && self.SEEX(config.contextmenu, e, 'component', self.cache[id].instance);
		e.preventDefault();
		e.stopPropagation();
	});

	self.event('dblclick', '.area', function() {
		var target = $(this).closest('.component');
		config.dblclick && self.SEEX(config.dblclick, self.cache[target.attrd('id')].instance);
	});

	self.event('mousedown touchstart', '.area', function(e) {

		if (events.is) {
			events.up();
			return;
		}

		e.preventDefault();

		var evt = e.touches ? e.touches[0] : e;
		var target = $(e.target).closest('.component');
		drag.id = target.attrd('id');

		var tmp = self.cache[drag.id];

		self.op.unselect('connections');

		if (tmp.actions.select !== false)
			self.op.select(drag.id);

		if (tmp.actions.move === false)
			return;

		drag.target = target;
		drag.x = evt.pageX;
		drag.y = evt.pageY;
		drag.zoom = self.info.zoom / 100;
		drag.zoomoffset = ((100 - self.info.zoom) / 10) + (self.info.zoom > 100 ? 1 : -1);

		drag.is = false;
		drag.output = target.find('.output');
		drag.input = target.find('.input');

		var pos = target.position();
		drag.posX = pos.left;
		drag.posY = pos.top;

		var dom = target[0];
		var parent = dom.parentNode;
		var children = parent.children;

		if (children[children.length - 1] !== dom)
			parent.appendChild(dom);

		events.bind();
	});

});

EXTENSION('flow:connections', function(self, config) {

	var D = '__';
	var events = {};
	var drag = {};
	var prevselected = null;

	drag.css = {};

	var zoom = function(val) {
		return Math.ceil(val / drag.zoom) - drag.zoomoffset;
	};

	events.move = function(e) {
		var x = (e.pageX - drag.x) + drag.offsetX;
		var y = (e.pageY - drag.y) + drag.offsetY;
		drag.path.attr('d', drag.input ? self.helpers.connect(zoom(x), zoom(y), zoom(drag.pos.x), zoom(drag.pos.y), -1, drag.realindex) : self.helpers.connect(zoom(drag.pos.x), zoom(drag.pos.y), zoom(x), zoom(y), drag.realindex, -1));
		if (drag.click)
			drag.click = false;
	};

	events.movetouch = function(e) {
		var evt = e.touches[0];
		drag.lastX = evt.pageX;
		drag.lastY = evt.pageY;
		events.move(evt);
	};

	events.up = function(e) {

		drag.path.remove();
		events.unbind();

		if (drag.click && (Date.now() - drag.ticks) < 150) {
			var icon = drag.target.find('.component-io');
			var clsp = 'disabled';
			icon.tclass(clsp);

			var key = (drag.input ? 'input' : 'output') + D + drag.pos.id + D + drag.pos.index;
			var model = self.get();

			if (!model.paused)
				model.paused = {};

			if (icon.hclass(clsp))
				model.paused[key] = 1;
			else
				delete model.paused[key];

			self.op.modify(model[drag.pos.id], 'pause');
			setTimeout2(self.ID + 'clean', self.op.clean, 2000);
			self.op.modified();
			return;
		}

		if (drag.lastX != null && drag.lastY != null)
			e.target = document.elementFromPoint(drag.lastX, drag.lastY);

		drag.target.add(drag.targetcomponent).rclass('connecting');

		if (drag.input) {

			// DRAGGED FROM INPUT
			var output = $(e.target).closest('.output');
			if (!output.length)
				return;

			// Checks if the connection is existing
			if (self.helpers.isconnected(output, drag.target))
				return;

			self.el.connect(output, drag.target);

		} else {

			// DRAGGED FROM OUTPUT
			var input = $(e.target).closest('.input');
			if (!input.length)
				return;

			// Checks if the connection is existing
			if (self.helpers.isconnected(drag.target, input))
				return;

			self.el.connect(drag.target, input);
		}
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			self.element.on('mouseup', events.up);
			self.element.on('mousemove', events.move);
			self.element.on('touchend', events.up);
			self.element.on('touchmove', events.movetouch);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			self.element.off('mouseup', events.up);
			self.element.off('mousemove', events.move);
			self.element.off('touchend', events.up);
			self.element.off('touchmove', events.movetouch);
		}
	};

	self.event('mousedown touchstart', '.output,.input', function(e) {

		if (e.button)
			return;

		e.preventDefault();
		e.stopPropagation();

		if (config.horizontal && !e.target.classList.contains('component-io'))
			return;

		drag.click = true;
		drag.ticks = Date.now();

		var target = $(this);
		var evt = e.touches ? e.touches[0] : e;
		var com = target.closest('.component');
		var tmp = self.cache[com.attrd('id')];

		if (tmp.actions.disabled || tmp.actions.connect === false)
			return;

		var offset = self.getOffset();
		var targetoffset = target.offset();

		drag.input = target.hclass('input');
		drag.target = target;
		drag.index = +target.attrd('index');
		drag.realindex = target.index();
		drag.x = evt.pageX;
		drag.y = evt.pageY;
		drag.zoom = self.info.zoom / 100;
		drag.zoomoffset = ((100 - self.info.zoom) / 10) + (self.info.zoom > 100 ? 1 : -1);

		drag.pos = self.helpers.position(target, !drag.input);
		drag.target.add(com).aclass('connecting');
		drag.targetcomponent = com;

		// For touch devices
		drag.lastX = null;
		drag.lastY = null;

		if (drag.input)
			drag.pos.x -= config.paddingX;

		if (evt.offsetX == null || evt.offsetY == null) {
			var off = self.op.position();
			drag.offsetX = drag.x - off.left;
			drag.offsetY = drag.y - off.top;
		} else {
			drag.offsetX = (targetoffset.left - offset.left) + evt.offsetX + (drag.input ? 2 : 5);
			drag.offsetY = (targetoffset.top - offset.top) + evt.offsetY + (drag.input ? 2 : 2);
		}

		if (config.horizontal) {
			if (drag.input)
				drag.offsetX -= 10;
			else
				drag.offsetX = drag.offsetX + (com.width() * drag.zoom) - 10;
		}

		drag.path = self.el.lines.asvg('path');
		drag.path.aclass('connection connection-draft');

		events.bind();
	});

	self.el.connect = function(output, input, init) {

		if (!output[0] || !input[0])
			return false;

		drag.zoom = self.info.zoom / 100;
		drag.zoomoffset = ((100 - self.info.zoom) / 10) - 1;

		var a = self.helpers.position(output, true);
		var b = self.helpers.position(input);

		b.x -= config.paddingX;

		if (drag.zoom !== 1) {
			b.x = zoom(b.x);
			b.y = zoom(b.y);
			a.x = zoom(a.x);
			a.y = zoom(a.y);
		}

		var path = self.el.lines.asvg('path');
		path.aclass('connection from' + D + a.id + ' to' + D + b.id + ' from' + D + a.id + D + a.index + ' to' + D + b.id + D + b.index + ' conn' + D + a.id + D + b.id + D + a.index + D + b.index);
		path.attrd('offset', a.x + ',' + a.y + ',' + b.x + ',' + b.y);
		path.attrd('fromindex', a.index);
		path.attrd('toindex', b.index);
		path.attrd('fromindexoffset', a.indexoffset);
		path.attrd('toindexoffset', b.indexoffset);
		path.attrd('from', a.id);
		path.attrd('to', b.id);
		path.attr('d', self.helpers.connect(a.x, a.y, b.x, b.y, a.indexoffset, b.indexoffset));

		input.add(output).aclass('connected');

		if (init) {
			var kp = 'input' + D + b.id + D + b.index;
			input.find('.component-io').tclass('disabled', !!self.paused[kp]);
			kp = 'output' + D + a.id + D + a.index;
			output.find('.component-io').tclass('disabled', !!self.paused[kp]);
		}

		var data = self.get();
		var ac = data[a.id];
		var bc = data[b.id];
		var key = a.index + '';

		if (ac.connections == null)
			ac.connections = {};

		if (ac.connections[key] == null)
			ac.connections[key] = [];

		self.op.modify(ac, 'connect');
		self.op.modify(bc, 'connect');

		var arr = ac.connections[key];
		var bindex = b.index + '';
		var is = true;

		for (var i = 0; i < arr.length; i++) {
			var tmp = arr[i];
			if (tmp.id === b.id && tmp.index === bindex) {
				is = false;
				break;
			}
		}

		if (is)
			ac.connections[key].push({ id: b.id + '', index: bindex });

		output.closest('.component').aclass('connected');

		var meta = {};
		meta.output = ac;
		meta.input = data[b.id];
		meta.fromid = a.id;
		meta.toid = b.id;
		meta.fromindex = a.index;
		meta.toindex = b.index;
		meta.path = path;
		ac.onconnect && ac.onconnect.call(ac, meta);
		bc.onconnect && bc.onconnect.call(bc, meta);
		config.onconnect && self.EXEC(config.onconnect, meta);

		if (!init) {
			self.op.undo({ type: 'connect', fromid: meta.fromid, toid: meta.toid, fromindex: meta.fromindex + '', toindex: meta.toindex + '' });
			self.op.modified();
		}

		return true;
	};

	self.event('contextmenu', '.connection', function(e) {
		events.is && events.up();

		var el = $(this);
		var meta = {};
		var classes = el.attr('class').split(' ');

		for (var i = 0; i < classes.length; i++) {
			var cls = classes[i];
			if (cls.substring(0, 6) === 'conn__') {
				var arr = cls.split('__');
				meta.fromid = arr[1];
				meta.toid = arr[2];
				meta.fromindex = arr[3];
				meta.toindex = arr[4];
				meta.from = self.cache[meta.fromid].instance;
				meta.to = self.cache[meta.toid].instance;
				break;
			}
		}

		meta.fromid && config.contextmenu && self.SEEX(config.contextmenu, e, 'connection', meta);

		e.preventDefault();
		e.stopPropagation();
	});

	self.event('mousedown touchstart', '.connection', function(e) {

		var el = $(this);
		var cls = 'connection-selected';

		self.op.unselect();

		if (el.hclass(cls))
			return;

		prevselected && prevselected.rclass(cls);
		el.aclass(cls);
		prevselected = el;

		var conn = self.helpers.parseconnection(el);
		conn.isconnection = true;
		conn.frominstance = self.cache[conn.fromid].instance;
		conn.toinstance = self.cache[conn.toid].instance;

		self.info.selected = conn;
		self.op.refreshinfo();

		var dom = el[0];
		var parent = el.parent()[0];

		parent.removeChild(dom);
		parent.appendChild(dom);

		e.preventDefault();
		e.stopPropagation();
	});

});

EXTENSION('flow:commands', function(self, config) {

	var zoom = 1;

	var disconnect = function() {
		var arr = self.el.lines.find('.connection-selected');
		for (var i = 0; i < arr.length; i++) {
			var obj = self.helpers.parseconnection($(arr[i]));
			obj && self.op.disconnect(obj.fromid, obj.toid, obj.fromindex, obj.toindex);
		}
	};

	var remove = function() {
		var arr = self.find('.component-selected');
		for (var i = 0; i < arr.length; i++)
			self.op.remove($(arr[i]).attrd('id'));
	};

	self.command('flow.refresh', self.op.reposition);

	self.command('flow.components.find', function(id) {
		var com = self.cache[id];
		if (com) {
			var pos = com.el.offset();
			var scroll = self.closest('.ui-scrollbar-area');
			if (scroll) {
				var offset = self.element.offset();
				scroll.animate({ scrollLeft: pos.left - 200 - offset.left, scrollTop: pos.top - 150 - offset.top }, 300);
				self.op.unselect();
				self.op.select(id);
			}
		}
	});

	self.command('flow.selected.disconnect', function() {
		disconnect();
		self.op.unselect();
	});

	self.command('flow.selected.remove', function() {
		remove();
		self.op.unselect();
	});

	function translate_path(count, path) {
		var l = path.getTotalLength();
		var t = (l / 100) * count;
		var p = path.getPointAtLength(t);
		return 'translate(' + p.x + ',' + p.y + ')';
	}

	self.command('flow.traffic', function(id, opt) {

		if (!opt)
			opt = { speed: 3, count: 1, delay: 50 };

		if (!opt.limit)
			opt.limit = 20;

		var path = self.el.lines.find('.from__' + id);

		if (opt.count > opt.limit)
			opt.count = opt.limit;

		if (!path.length || (self.animations[id] > opt.limit) || document.hidden)
			return;

		var add = function(next) {

			for (var i = 0; i < path.length; i++) {

				var el = self.el.anim.asvg('circle').aclass('traffic').attr('r', opt.radius || config.animationradius);
				var dom = el[0];

				dom.$path = path[i];
				dom.$count = 0;
				dom.$token = self.animations_token;

				if (self.animations[id])
					self.animations[id]++;
				else
					self.animations[id] = 1;

				(function(self, el, dom, opt) {
					var fn = function() {

						dom.$count += (opt.speed || 3);

						if (document.hidden || !dom.$path || !dom.$path.parentNode || dom.$token !== self.animations_token) {
							el.remove();
							if (self.animations[id])
								self.animations[id]--;
							return;
						}

						if (dom.$count >= 100) {
							if (self.animations[id] > 0)
								self.animations[id]--;
							el.remove();
						} else
							el.attr('transform', translate_path(dom.$count, dom.$path));

						requestAnimationFrame(fn);
					};
					requestAnimationFrame(fn);
				})(self, el, dom, opt);
			}

			next && setTimeout(next, opt.delay || 50);
		};

		if (!opt.count || opt.count === 1) {
			add();
			return;
		}

		var arr = [];
		for (var i = 0; i < opt.count; i++)
			arr.push(add);

		arr.wait(function(fn, next) {
			fn(next);
		});

	});

	self.command('flow.selected.clear', function() {
		disconnect();
		remove();
		self.op.unselect();
	});

	self.command('flow.clean', function() {
		self.op.clean();
	});

	self.command('flow.components.add', function(com) {
		if (!com.id)
			com.id = 'f' + Date.now().toString(36);
		var data = self.get();
		data[com.id] = com;
		self.op.modify(com, 'newbie');
		self.op.modified();
		self.refresh(true);
		self.op.undo({ type: 'component', id: com.id });
	});

	self.command('flow.zoom', function(type) {

		switch (type) {
			case 'in':
				zoom -= 0.05;
				break;
			case 'out':
				zoom += 0.05;
				break;
			case 'reset':
				zoom = 1;
				break;
		}

		if (zoom < 0.3 || zoom > 1.7)
			return;

		self.info.zoom = 100 * zoom;
		self.op.refreshinfo();
		self.element.css('transform', 'scale({0})'.format(zoom));
	});

	self.command('flow.undo', function() {

		var prev = self.undo.pop();
		if (prev == null)
			return;

		self.op.undo();
		self.op.redo(prev);

		if (prev.type === 'disconnect') {
			var output = self.find('.component[data-id="{0}"]'.format(prev.fromid)).find('.output[data-index="{0}"]'.format(prev.fromindex));
			var input = self.find('.component[data-id="{0}"]'.format(prev.toid)).find('.input[data-index="{0}"]'.format(prev.toindex));
			self.el.connect(output, input, true);
			return;
		}

		if (prev.type === 'connect') {
			self.op.disconnect(prev.fromid, prev.toid, prev.fromindex, prev.toindex, true);
			return;
		}

		if (prev.type === 'component') {
			self.op.remove(prev.id, true);
			return;
		}

		if (prev.type === 'move') {
			self.find('.component[data-id="{0}"]'.format(prev.id)).css({ left: prev.x, top: prev.y });
			self.op.reposition();
			return;
		}

		if (prev.type === 'remove') {
			var com = prev.instance;
			com.id = prev.id;
			var data = self.get();
			data[com.id] = com;
			self.op.modified();
			self.update('refresh');
			return;
		}

	});

	self.command('flow.redo', function() {

		var next = self.redo.pop();
		if (next == null)
			return;

		self.op.redo();
		self.op.undo(next);
		self.op.refreshinfo();

		if (next.type === 'disconnect') {
			self.op.disconnect(next.fromid, next.toid, next.fromindex, next.toindex, true);
			return;
		}

		if (next.type === 'connect') {
			var output = self.find('.component[data-id="{0}"]'.format(next.fromid)).find('.output[data-index="{0}"]'.format(next.fromindex));
			var input = self.find('.component[data-id="{0}"]'.format(next.toid)).find('.input[data-index="{0}"]'.format(next.toindex));
			self.el.connect(output, input, true);
			return;
		}

		if (next.type === 'component') {
			var com = next.instance;
			com.id = next.id;
			var data = self.get();
			data[com.id] = com;
			self.op.modified();
			self.refresh(true);
			return;
		}

		if (next.type === 'move') {
			self.find('.component[data-id="{0}"]'.format(next.id)).css({ left: next.newx, top: next.newy });
			self.op.reposition();
			return;
		}

		if (next.type === 'remove') {
			self.op.remove(next.id, true);
			return;
		}

	});

	// Resets editor
	self.command('flow.reset', function() {
		self.refresh();
		self.info.selected = null;
		self.op.refreshinfo();
		self.undo = [];
		self.redo = [];
		self.op.undo();
		self.op.redo();
	});

});