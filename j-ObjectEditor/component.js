COMPONENT('objecteditor', 'null:true;dateformat:yyyy-MM-dd HH\\:mm\\:ss', function(self, config) {

	self.nocompile && self.nocompile();

	var skip = false;
	var tstringmultiline = '<div class="ui-oe-string-multiline ui-oe-item"><div class="ui-oe-label"><span>{label}</span></div><div class="ui-oe-control"><textarea data-type="string" name="{path}">{value}</textarea></div></div>';
	var tstring = '<div class="ui-oe-string ui-oe-item"><div class="ui-oe-label"><span>{label}</span></div><div class="ui-oe-control"><input type="text" data-type="string" name="{path}" value="{value}" /></div></div>';
	var tdate = '<div class="ui-oe-date ui-oe-item"><div class="ui-oe-label"><span>{label}</span></div><div class="ui-oe-control"><input type="text" data-type="date" name="{path}" value="{value}" /></div></div>';
	var tnumber = '<div class="ui-oe-number ui-oe-item"><div class="ui-oe-label"><span>{label}</span></div><div class="ui-oe-control"><input type="text" data-type="number" name="{path}" value="{value}" /></div></div>';
	var tboolean = '<div class="ui-oe-boolean ui-oe-item"><div class="ui-oe-label"><span>{label}</span></div><div class="ui-oe-control"><div data-name="{path}" class="ui-eo-checkbox{value}"><i class="ti ti-check"></i></div></div></div>';
	var tnull = '<div class="ui-oe-null ui-oe-item"><div class="ui-oe-label"><span>{label}</span></div><div class="ui-oe-control">null</div></div>';
	var tgroup = '<div class="ui-oe-group ui-oe-level-{level}"><div class="ui-oe-label">{name}</div><div class="ui-oe-items">{body}</div></div>';
	var tarray = '<div class="ui-oe-array ui-oe-level-{level}"><div class="ui-oe-label"><b>Array:</b> {name}</div><div class="ui-oe-items">{body}</div></div>';

	self.configure = function(key, value ) {
		if (key === 'skip')
			config.skip = value instanceof Array ? value : value.split(',');
	};

	self.make = function() {
		self.aclass('ui-oe');

		self.event('click', '.ui-eo-checkbox', function() {
			var el = $(this);
			var cls = 'checked';
			var path = self.path + '.' + el.attrd('name');
			el.tclass(cls);
			skip = true;
			SET(path, el.hclass(cls));
			self.change(true);
		});

		self.event('input', 'input,textarea', function() {

			var el = $(this);
			var type = el.attrd('type');
			var path = self.path + '.' + this.name;
			var val = this.value;

			switch (type) {
				case 'string':
					break;
				case 'number':
					val = val.parseFloat();
					break;
				case 'date':
					val = val.parseDate(config.dateformat);
					break;
			}

			setTimeout2(self.ID, function() {
				skip = true;
				SET(path, val);
				self.change(true);
			}, 100);
		});
	};

	self.redraw = function(path, obj, level) {

		var arr = Object.keys(obj);
		var builder = [];

		for (var i = 0; i < arr.length; i++) {
			var key = arr[i];
			var val = obj[key];

			if (val == null)
				continue;

			var tmp = {};

			tmp.pathraw = (path ? (path + '.') : '') + key;

			if (!config.null || (config.skip && config.skip.indexOf(tmp.pathraw) !== -1))
				continue;

			tmp.path = tmp.pathraw;
			tmp.label = key;
			tmp.value = val;

			if (val == null) {
				builder.push(tnull.arg(tmp));
				continue;
			}

			var type = typeof(val);
			if (type === 'string') {
				tmp.value = Tangular.helpers.encode(tmp.value);
				if (tmp.value.indexOf('\n') == -1)
					builder.push(tstring.arg(tmp));
				else
					builder.push(tstringmultiline.arg(tmp));
			} else if (type === 'number')
				builder.push(tnumber.arg(tmp));
			else if (type === 'boolean') {
				tmp.value = val ? ' checked' : '';
				builder.push(tboolean.arg(tmp));
			} else {
				if (val instanceof Date) {
					tmp.value = tmp.value.format(config.dateformat);
					builder.push(tdate.arg(tmp));
				} else if (val instanceof Array) {

					type = typeof(val[0]);
					var sub = [];

					if (type === 'number') {
						for (var j = 0; j < val.length; j++) {
							tmp.path = tmp.pathraw + '[' + j + ']';
							tmp.value = val[j];
							sub.push(tnumber.arg(tmp));
						}
					} else if (type === 'string') {
						for (var j = 0; j < val.length; j++) {
							tmp.path = tmp.pathraw + '[' + j + ']';
							tmp.value = val[j];
							tmp.value = Tangular.helpers.encode(tmp.value);
							sub.push(tstring.arg(tmp));
						}
					} else if (type === 'boolean') {
						for (var j = 0; j < val.length; j++) {
							tmp.path = tmp.pathraw + '[' + j + ']';
							tmp.value = val[j];
							sub.push(tboolean.arg(tmp));
						}
					} else {
						for (var j = 0; j < val.length; j++)
							sub.push(self.redraw(tmp.pathraw + '[' + j + ']', val[j], j + 1));
					}
					sub.length && builder.push(tarray.arg({ name: tmp.pathraw, body: sub.join(''), level: level }));
				} else
					builder.push(self.redraw(tmp.path, val, level + 1));
			}

		}

		var output = builder.join('');
		return level ? tgroup.arg({ name: path, body: output, level: level }) : output;
	};

	self.setter = function(value) {

		if (value == null)
			return;

		if (skip) {
			skip = false;
			return;
		}

		self.html(self.redraw('', value, 0));
	};

});