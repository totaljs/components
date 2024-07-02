COMPONENT('rules', 'dirsearch:Search', function(self, config, cls) {

	var skip = false;
	var cls2 = '.' + cls;
	var items;

	self.readonly();
	self.renders = {};

	self.renders.number = function(item) {
		return '<div class="{0}-number"><input type="text"{1} value="{2}" /></div>'.format(cls, item.enabled ? '' : ' disabled', Thelpers.encode(item.value));
	};

	self.renders.string = function(item) {
		if (item.items) {
			var m = item.items.findItem('id', item.value);
			return '<div class="{0}-string"><div class="{0}-list">{2}</div></div>'.format(cls, item.enabled ? '' : ' disabled', m ? m.name : '');
		} else
			return '<div class="{0}-string"><input type="text"{1} value="{2}" /></div>'.format(cls, item.enabled ? '' : ' disabled', Thelpers.encode(item.value));
	};

	self.renders.boolean = function(item) {
		return '<div class="{0}-boolean"><span class="{0}-checkbox{1}"><i></i></span></div>'.format(cls, item.value ? ' checked' : '');
	};

	self.renders.item = function(item) {

		var type = item.type.toLowerCase();
		var html = self.renders[type](item);
		var comparer = ['<', '<=', '==', '!=', '>=', '>'];

		for (var i = 0; i < comparer.length; i++) {
			var m = comparer[i];
			var disabled = type !== 'number' && i !== 2 && i !== 3;
			var selected = item.comparer === m;
			comparer[i] = '<button data-disabled="{3}" class="{4}" name="{0}"{1}>{2}</button>'.format(m, disabled || !item.enabled ? ' disabled' : '', m === '!=' ? '<>' : m === '==' ? '=' : m.replace('>=', '=>'), disabled, selected ? 'selected' : '');
		}

		return ('<div class="{0}-item' + (item.enabled ? '' : ' disabled') + '" data-name="' + item.name + '"><div class="{0}-value">' + html + '</div><div class="{0}-comparer">' + comparer.join('') + '</div><div class="{0}-key"><div class="{0}-enabled"><span class="{0}-checkbox' + (item.enabled ? ' checked' : '') + '"><i></i></span></div><div class="{0}-label">' + item.label + (item.note ? ('<div class="help">' + item.note + '</div>') : '') + '</div></div></div>').format(cls);
	};

	self.forcechange = function() {
		skip = true;
		self.update();
		self.change(true);
	};

	self.make = function() {
		self.aclass(cls);

		self.event('click', cls2 + '-enabled', function() {
			var el = $(this);
			var is = el.find('span').tclass('checked').hclass('checked');
			el = el.closest(cls2 + '-item');
			el.tclass('disabled', !is);
			el.find('button').prop('disabled', function() {
				return this.getAttribute('data-disabled') === 'true' ? true : !is;
			});
			el.find('input').prop('disabled', !is);
			items.findItem('name', el.attrd('name')).enabled = is;
			self.forcechange();
		});

		self.event('click', cls2 + '-boolean', function() {
			var el = $(this);
			var is = el.find('span').tclass('checked').hclass('checked');
			var id = el.closest(cls2 + '-item').attrd('name');
			items.findItem('name', id).value = is;
			self.forcechange();
		});

		self.event('click', 'button', function() {
			var el = $(this);
			el.parent().find('.selected').rclass('selected');
			el.aclass('selected');
			var id = el.closest(cls2 + '-item').attrd('name');
			items.findItem('name', id).comparer = el.prop('name');
			self.forcechange();
		});

		self.event('change', 'input', function() {
			var el = $(this);
			var id = el.closest(cls2 + '-item').attrd('name');
			var item = items.findItem('name', id);
			if (item.type === 'number')
				item.value = el.val().parseFloat();
			else
				item.value = el.val();
			self.forcechange();
		});

		self.event('click', cls2 + '-list', function() {
			var el = $(this);
			var opt = {};
			var item = items.findItem('name', el.closest(cls2 + '-item').attrd('name'));
			opt.element = el;
			opt.align = 'right';
			opt.items = item.items;
			opt.placeholder = config.dirsearch;
			opt.callback = function(sel) {
				el.text(sel.name);
				self.forcechange();
			};
			SETTER('directory/show', opt);
		});

	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value)
			value = [];

		items = value;
		var builder = [];
		for (var i = 0; i < value.length; i++)
			builder.push(self.renders.item(value[i]));

		self.html(builder.join(''));
	};

});