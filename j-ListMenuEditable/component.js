COMPONENT('listmenueditable', 'iconremove:times;defaulticon:pencil-alt;addicon:plus-square;placeholder:Write text and press ENTER', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container;
	var last, editing, selected;
	var template = '<div class="' + cls + '-item {{ if selected }}selected{{ fi }} {{ classname }}" data-index="{{ index }}" {{ if value }} data-value="{{ value }}" {{ fi }}>{{ if editable }}<span class="' + cls + '-icon"><i class="fa fa-{{ icon }}"></i></span>{{ fi }}<div class="' + cls + '-text"><span>{{ name | encode | ui_listmenueditable_helper }}</span></div></div>';
	var templateinput = '<div class="' + cls + '-item" {{ if index != null }}data-index="{{ index }}"{{ fi }}><span class="' + cls + '-deleteicon"><i class="fa fa-' + config.iconremove + '"></i></span><div class="' + cls + '-text"><input placeholder="' + config.placeholder + '" {{ if index != null }}value="{{ text }}"{{ fi }} type="text" /></div></div>';
	var layout;

	Thelpers.ui_listmenueditable_helper = function(val) {
		return layout ? layout.indexOf('{{') === -1 ? layout : Tangular.render(layout, this) : val;
	};

	self.template = Tangular.compile(template);
	self.templateinput = Tangular.compile(templateinput);

	self.make = function() {

		var scr = self.find('> script');
		layout = scr.length ? scr.html() : null;

		self.aclass(cls);
		config.title && self.html('<div class="{0}-header"><span class="{0}-icon"><i class="fas fa-{1}"></i></span><div class="{0}-text"><span>{2}</span></div></div>'.format(cls, config.addicon, config.title));
		self.append('<div class="' + cls + '-container"></div>');

		self.event('click', cls2 + '-item' + ' ' + cls2 + '-text', function() {

			if ($(this).find('input').length)
				return;

			var parent = $(this).closest(cls2 + '-item');
			var index = parent.attrd('index');
			var items = self.get();

			container.find('.selected').rclass('selected');
			parent.aclass('selected');

			selected = index;
			config.click && self.EXEC(config.click, parent, items[index], index);
		});

		self.event('click', cls2 + '-header ' + cls2 + '-icon', function() {
			config.addclick && self.EXEC(config.addclick);
		});

		self.event('keydown', 'input', function(e) {
			switch (e.which) {
				case 13:
					self.save();
					break;
				case 27:
					var parent = $(this).closest(cls2 + '-item');
					parent.find(cls2 + '-deleteicon').click();
					break;
			}
		});

		self.event('click', cls2 + '-item ' + cls2 + '-icon', function() {
			var parent = $(this).closest(cls2 + '-item');
			config.editclick && self.EXEC(config.editclick, parent, parent.attrd('index'), $(this));
		});

		self.event('click', cls2 + '-deleteicon', function() {
			var parent = $(this).closest(cls2 + '-item');
			var cur = self.get();
			var index = parseInt(parent.attrd('index'));
			editing = null;

			if (index === last) {
				cur.splice(index, 1);
				self.set(cur);
			} else {
				var tmp = self.itemtemplate();
				parent.replaceWith(tmp(cur[index]));
			}
		});
	};

	self.save = function() {
		var parent = editing.closest(cls2 + '-item');
		var value = editing.val();
		var cur = self.get();
		var index = parent.attrd('index');
		var key = config.key || 'name';
		editing = null;
		cur[index][key] = value;
		self.set(cur);
	};

	self.remove = function(index) {

		if (index == null)
			return;

		var cur = self.get();
		cur.splice(index, 1);
		self.set(cur);
	};

	self.edit = function(index) {
		if (index == null)
			return;

		if (editing)
			self.save();

		var el = container.find(cls2 + '-item[data-index="' + index + '"]');
		var text = self.get()[index];
		var key = config.key || 'name';
		el.replaceWith(self.templateinput({ text: text[key] || '', index: index }));
		editing = container.find('input');

		setTimeout2(self.id + 'focus', function() {
			container.find('input').focus();
			var input = container.find('input');
			var value = input.val();
			input.val('').val(value);
		}, 80);
	};

	self.add = function(data) {
		if (data == null)
			data = {};
		self.push(data);
		var index = last = self.get().length - 1;
		self.edit(index);
	};

	self.itemtemplate = function() {
		var tmp = config.key ? Tangular.compile(template.replace(/\{\{\sname/g, '{{ ' + config.key)) : self.template;
		return tmp;
	};

	self.setter = function(value) {
		if (!value || !value.length)
			return;

		var builder = [];
		var tmp = self.itemtemplate();
		last = editing = null;

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			item.index = i;
			item.icon = config.defaulticon;
			if (selected != null && selected == i)
				item.selected = true;
			builder.push(tmp(item));
		}

		if (container == null)
			container = $(cls2 + '-container');

		container.empty().append(builder.join(''));
	};
});