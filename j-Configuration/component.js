COMPONENT('configuration', 'dateformat:yyyy-MM-dd', function(self, config, cls) {

	var cls2 = '.' + cls;
	var datasource;
	var items = EMPTYARRAY;

	self.validate = function(value) {

		if (config.disabled)
			return true;

		if (!value)
			value = EMPTYOBJECT;

		var errors = [];

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.required && item.isdisabled !== true && item.isvisible !== false) {
				var val = value[item.id];
				var is = item.validate(item.prepare(val));
				item.element.tclass(cls + '-invalid', !is);
				if (!is)
					errors.push(item);
			}
		}

		return !errors.length;
	};

	self.reload = function() {
		var model = self.get();
		var prev;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			item.$disable && item.disable(item.$disable(model || EMPTYOBJECT));

			var is = true;
			if (item.$visible) {
				is = item.$visible(model || EMPTYOBJECT);
				item.element.tclass('hidden', !is);
			}

			if (item.element[0].getAttribute('class').indexOf(cls + '-last') !== -1)
				item.element.rclass(cls + '-last');

			if (prev && prev.group !== item.group)
				prev.element.aclass(cls + '-last');

			if (is)
				prev = item;
		}

		if (prev)
			prev.element.aclass(cls + '-last');
	};

	self.compilefn = function(fn) {
		var index = fn.indexOf('=>');
		if (index !== -1)
			fn = fn.substring(index + 2);
		return new Function('value', 'model', fn);
	};

	self.types = {};
	self.types.template = function(item) {

		var icon = '';
		if (item.icon)
			icon = '<i class="' + self.icon(item.icon) + '"></i>';

		var builder = [];
		var align = item.align || 0;

		if (align === 'center')
			align = 1;
		else if (align === 'right')
			align = 2;

		builder.push('<div class="{0}-item{1}">'.format(cls, align ? (' ' + cls + '-align-' + align) : ''));
		builder.push('<div class="{0}-item-label">{1}{2}</div>'.format(cls, icon, item.name || item.text));
		item.summary && builder.push('<div class="{0}-item-summary">{1}</div>'.format(cls, item.summary));
		builder.push('<div class="{0}-item-control"></div>'.format(cls));
		item.note && builder.push('<div class="{0}-item-note">{1}</div>'.format(cls, item.note));
		item.button && builder.push('<div class="{0}-button"><button>{1}</button></div>'.format(cls, item.button));
		item.html && builder.push(item.html);
		builder.push('</div>');

		var T;

		var get = function() {
			var model = self.get() || EMPTYOBJECT;
			return model[item.id];
		};

		var set = function(val) {
			var model = self.get();
			var empty = false;
			if (!model) {
				empty = true;
				model = {};
			}

			var old = model[item.id];
			val = T.prepare(val);
			if (old != val) {
				model[item.id] = val;

				if (empty) {
					self.bind('@modified @touched', model);
				} else {
					self.bind('@modified @touched');
					UPD(self.path.toString() + '.' + item.id);
				}

				self.change(true);
				return true;
			}
		};

		var el = $(builder.join(''));
		item.required && el.aclass(cls + '-required');

		var control = el.find(cls2 + '-item-control');
		var type = self.types[item.type || 'string'](item, control, set, get);

		T = type;
		type.element = el;
		type.control = control;
		type.id = item.id;
		type.required = item.required;

		var fndisable = item.disable ? self.compilefn(item.disable) : null;
		if (fndisable) {
			type.$disable = function(model) {
				var is = !!fndisable(model, model);
				item.button && type.element.find(cls2 + '-button button').prop('disabled', is);
				type.isdisabled = is;
				return is;
			};
		} else {
			type.$disable = null;
			type.isdisabled = false;
		}

		var fnvisible = item.visible ? self.compilefn(item.visible) : null;
		if (fnvisible) {
			type.$visible = function(model) {
				var is = !!fnvisible(model, model);
				type.isvisible = is;
				return is;
			};
		} else {
			type.$visible = null;
			type.isvisible = true;
		}

		item.noborder && el.aclass(cls + '-noborder');
		item.click && el.find(cls2 + '-button button').on('click', function() {
			var meta = {};
			meta.item = item;
			meta.value = get();
			meta.set = set;
			meta.type = type;
			self.EXEC(item.click, meta);
		});

		return type;
	};

	self.types.string = function(item, el, set, get) {

		var obj = {};

		obj.bind = function(val) {
			var input = el.find('input');
			if (item.camouflage) {
				var arr = [];
				for (var i = 0; i < val.length; i++)
					arr.push('•');
				val = arr.join('');
			}

			input.val(val);
		};

		obj.validate = function(val) {
			if (val == null)
				return false;
			if (item.transform === 'email')
				return val.isEmail();
			if (item.transform === 'phone')
				return val.isPhone();
			if (item.transform === 'url')
				return val.isURL();
			return !!val;
		};

		obj.disable = function(val) {
			el.tclass(cls + '-disabled', !!val).find('input').prop('disabled', !!val);
		};

		obj.prepare = function(val) {

			if (val == null)
				return '';

			val = (val + '').trim();

			switch (item.transform) {
				case 'phone':
				case 'url':
					return val.replace(/\s/g, '');
				case 'email':
				case 'lowercase':
					return val.toLowerCase();
				case 'uppercase':
					return val.toUppercase();
				case 'slug':
					return val.slug();
				case 'id':
					return val.slug().replace(/-/g, '');
			}

			return val;
		};

		el.append('<div class="{0}-type-string"{1}><input type="text" placeholder="{2}" /></div>'.format(cls, item.width ? ' style="max-width:{0}px"'.format(item.width) : '', (item.placeholder || '').encode()));

		var input = el.find('input');
		item.maxlength && input.prop('maxlength', item.maxlength);

		input.on('change', function() {
			set(this.value);
		}).blur(function() {
			if (item.camouflage)
				obj.bind(this.value);
		}).on('focus', function() {
			if (item.camouflage) {
				var val = obj.prepare(get());
				this.value = val;
			}
		});

		item.monospace && input.aclass(cls + '-monospace');
		item.bold && input.aclass('b');
		return obj;
	};

	self.types.multiline = self.types.textarea = function(item, el, set) {
		var obj = {};

		obj.bind = function(val) {
			el.find('input').val(val);
		};

		obj.validate = function(val) {
			return !!val;
		};

		obj.disable = function(val) {
			el.tclass(cls + '-disabled', !!val).find('textarea').prop('disabled', !!val);
		};

		obj.prepare = function(val) {
			return val != null ? (val + '').trim() : '';
		};

		el.append('<div class="{0}-type-multiline"{2}><textarea placeholder="{1}"></textarea></div>'.format(cls, (item.placeholder || '').encode(), item.height ? ' style="height:{0}"'.format(item.height) : ''));

		var input = el.find('textarea').on('change', function() {
			set(this.value);
		});

		item.monospace && input.aclass(cls + '-monospace');
		item.bold && input.aclass('b');
		return obj;
	};

	self.types.group = function(item) {

		var icon = '';
		if (item.icon)
			icon = '<i class="' + self.icon(item.icon) + '"></i>';

		var builder = ['<div>'];
		builder.push('<div class="{0}-group">{1}</div>'.format(cls, icon + item.name || item.text));
		if (item.summary)
			builder.push('<div class="{0}-group-summary">{1}</div>'.format(cls, item.summary));
		else
			builder.push('<br>');
		return builder.join('') + '</div>';
	};

	self.types.number = function(item, el, set, get) {
		var obj = {};

		obj.bind = function(val) {
			el.find('input').val(val);
		};

		obj.disable = function(val) {
			el.tclass(cls + '-disabled', !!val).find('input').prop('disabled', !!val);
		};

		obj.validate = function(val) {
			return val != 0;
		};

		obj.prepare = function(val) {

			if (val == null)
				return 0;

			if (item.min != null && val < item.min)
				val = item.min;
			else if (item.max != null && val > item.max)
				val = item.max;

			var type = typeof(val);
			return type === 'string' ? val.parseFloat() : type === 'number' ? val : 0;
		};

		el.parent().aclass(cls + '-border');
		el.append('<div class="{0}-type-number"{1}><span><i class="ti ti-angle-up"></i><i class="ti ti-angle-down"></i></span><div><input type="text" placeholder="{2}" /></div></div>'.format(cls, item.width ? ' style="max-width:{0}px"'.format(item.width) : '', (item.placeholder || '').encode()));

		var input = el.find('input');
		input.prop('maxlength', item.maxlength || 12);
		input.on('change blur', function() {
			set(this.value);
		});

		item.monospace && input.aclass(cls + '-monospace');
		item.bold && item.aclass('b');

		el.find('span i').on('click', function() {

			if (input[0].disabled)
				return;

			var inc = item.increment || 1;
			var val = get() || 0;
			if (this.getAttribute('class').indexOf('-up') !== -1) {
				set(val + inc);
			} else {
				set(val - inc);
			}
		});

		return obj;
	};

	self.types.boolean = self.types.checkbox = function(item, el, set) {

		var tcls = cls + '-checked';
		var obj = {};

		obj.bind = function(val) {
			el.tclass(tcls, !!val);
		};

		obj.validate = function(val) {
			return val === true;
		};

		obj.disable = function(val) {
			el.parent().tclass(cls + '-disabled', !!val);
		};

		obj.prepare = function(val) {
			return !!val;
		};

		el.parent().aclass(cls + '-border');
		el.append('<div class="{0}-type-boolean"><div><span><i class="ti ti-check"></i></span></div></div>'.format(cls));
		el.find(cls2 + '-type-boolean > div').on('click', function() {
			if (!el.parent().hclass(cls + '-disabled')) {
				el.tclass(tcls);
				set(el.hclass(tcls));
			}
		});
		return obj;
	};

	self.types.dropdown = function(item, el, set) {

		var obj = {};

		obj.bind = function(val) {

			var items = item.items;

			if (typeof(items) === 'string')
				items = GET(self.makepath(items));

			var obj = (items || EMPTYARRAY).findItem('id', val);
			el.find('label').tclass('hidden', !!obj);
			el.find(cls2 + '-value').text(obj ? obj.name : '');
		};

		obj.validate = function(val) {
			return !!val;
		};

		obj.disable = function(val) {
			el.parent().tclass(cls + '-disabled', !!val);
		};

		obj.prepare = function(val) {
			return val == null ? null : val;
		};

		el.append('<div class="{0}-type-dropdown"><span><i class="ti ti-angle-down"></i></span><label>{1}</label><div class="{0}-value"></div></div>'.format(cls, (item.placeholder || '').encode()));

		el.find(cls2 + '-type-dropdown').on('click', function() {
			if (!el.parent().hclass(cls + '-disabled')) {

				var items = item.items;

				if (typeof(items) === 'string')
					items = GET(self.makepath(items));

				var opt = {};
				opt.element = $(this);
				opt.items = items;
				opt.placeholder = item.dirplaceholder;
				opt.search = item.dirsearch;
				opt.empty = item.dirempty;
				opt.callback = function(val) {
					set(val ? val.id : null);
				};
				SETTER('directory/show', opt);
			}
		});

		return obj;
	};

	self.types.color = function(item, el, set) {
		var obj = {};

		obj.bind = function(val) {
			el.find(cls2 + '-type-color div').css('background-color', val);
		};

		obj.validate = function(val) {
			return !!val;
		};

		obj.disable = function(val) {
			el.parent().tclass(cls + '-disabled', !!val);
		};

		obj.prepare = function(val) {
			return val == null ? '' : (val + '');
		};

		el.append('<div class="{0}-type-color"><div></div></div>'.format(cls));

		el.find(cls2 + '-type-color').on('click', function() {
			if (!el.parent().hclass(cls + '-disabled')) {
				var opt = {};
				opt.element = $(this);
				opt.callback = set;
				SETTER('colorpicker/show', opt);
			}
		});

		return obj;
	};

	self.types.icon = function(item, el, set) {
		var obj = {};

		obj.bind = function(val) {
			el.find(cls2 + '-type-icon').html('<i class="{0}"></i>'.format(val));
		};

		obj.validate = function(val) {
			return !!val;
		};

		obj.disable = function(val) {
			el.parent().tclass(cls + '-disabled', !!val);
		};

		obj.prepare = function(val) {
			return val == null ? '' : (val + '');
		};

		el.append('<div class="{0}-type-icon"></div>'.format(cls));

		el.find(cls2 + '-type-icon').on('click', function() {
			if (!el.parent().hclass(cls + '-disabled')) {
				var opt = {};
				opt.element = $(this);
				opt.callback = set;
				SETTER('icons/show', opt);
			}
		});

		return obj;
	};

	self.types.date = function(item, el, set, get) {
		var obj = {};

		obj.bind = function(val) {
			el.find(cls2 + '-value').html(val ? val.format(item.format || DEF.dateformat || config.dateformat) : '');
			el.find('label').tclass('hidden', !!val);
		};

		obj.validate = function(val) {
			return !!val;
		};

		obj.disable = function(val) {
			el.parent().tclass(cls + '-disabled', !!val);
		};

		obj.prepare = function(val) {
			if (val == null)
				return null;
			var type = typeof(val);
			return type === 'string' ? val.parseDate() : type === 'number' ? new Date(val) : val instanceof Date ? val : null;
		};

		el.append('<div class="{0}-type-date"><span><i class="ti ti-calendar"></i></span><label>{1}</label><div class="{0}-value"></div></div>'.format(cls, (item.placeholder || '').encode()));

		el.find(cls2 + '-type-date').on('click', function() {
			if (!el.parent().hclass(cls + '-disabled')) {
				var opt = {};
				opt.value = get();
				opt.element = $(this);
				opt.callback = set;
				SETTER('datepicker/show', opt);
			}
		});

		return obj;
	};

	self.types.selectable = function(item, el, set) {

		var obj = {};
		var prev;
		var items = item.items;

		if (typeof(items) === 'string')
			items = GET(self.makepath(items));

		if (!(items instanceof Array))
			items = (items || EMPTYARRAY);

		obj.bind = function(val) {

			var elements = el.find(cls2 + '-type-selectable-item');
			el.find(cls2 + '-selected').rclass(cls + '-selected');

			if (val instanceof Array) {
				for (var i = 0; i < val.length; i++) {
					var index = items.findIndex('id', val[i]);
					if (index !== -1)
						elements.eq(index).aclass(cls + '-selected');
				}
			} else {
				var index = items.findIndex('id', val);
				if (index !== -1)
					elements.eq(index).aclass(cls + '-selected');
			}
		};

		obj.validate = function(val) {
			return item.multiple ? val && val.length > 0 : !!val;
		};

		obj.disable = function(val) {
			el.parent().tclass(cls + '-disabled', !!val);
		};

		obj.prepare = function(val) {
			return val == null ? '' : item.multiple && val instanceof Array ? val : (val + '');
		};

		var builder = [];

		for (var i = 0; i < items.length; i++)
			builder.push('<div class="{0}-type-selectable-item"><i class="{icon}"></i><span>{name}</div>'.format(cls).args(items[i]));

		el.append('<div class="{0}-type-selectable">{1}</div>'.format(cls, builder.join('')));

		el.find(cls2 + '-type-selectable-item').on('click', function() {
			var selcls = cls + '-selected';
			if (!el.parent().hclass(cls + '-disabled')) {
				var target = $(this);

				if (item.multiple) {
					target.tclass(selcls);
				} else {
					if (prev && prev[0] !== target[0])
						prev.rclass(selcls);
					prev = target.tclass(selcls);
				}

				var arr = el.find(cls2 + '-selected');
				var selected = [];

				for (var i = 0; i < arr.length; i++) {
					var index = $(arr[i]).index();
					selected.push(items[index].id);
				}

				set(item.multiple ? selected : (selected[0] || null));
			}
		});

		return obj;
	};

	self.configure = function(key, value) {
		if (key === 'datasource') {
			self.datasource(value, function(path, value) {
				datasource = value;
				self.redraw();
				self.refresh();
			}, true);
		}
	};

	self.rebind = function(val) {
		datasource = val instanceof Array ? val : new Function('val', 'return ' + val.trim())(val);
		self.redraw();
		self.refresh();
	};

	self.redraw = function() {

		items = [];
		self.empty();

		var container = self.element;
		var was = false;
		var group;
		var count = 0;

		for (var i = 0; i < datasource.length; i++) {
			var item = datasource[i];
			if (item.type === 'group') {

				if (count && !was)
					self.append('<br>');

				group = item;
				self.append(self.types.group(item));
				var div = document.createElement('DIV');
				self.append(div);
				container = $(div).aclass(cls + '-items');
			} else {
				count++;
				item = self.types.template(item);
				item.group = group;
				container.append(item.element);
				items.push(item);
			}
		}
	};

	self.make = function() {
		self.aclass(cls);
		var template = self.find('script').html();
		template && self.rebind(template);
	};

	self.setter = function(value, path) {

		if (!value)
			value = {};

		var p = self.path.toString();
		var diff = path.substring(p.length + 1);

		for (var key in value) {
			var val = value[key];
			for (var j = 0; j < items.length; j++) {
				var item = items[j];
				if (item.id === key && item.type !== 'group' && (!diff || diff.indexOf(path) === -1))
					item.bind(item.prepare(val));
			}
		}

		self.reload();
		self.rclass('invisible');
	};

});