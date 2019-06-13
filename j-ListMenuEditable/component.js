COMPONENT('listmenueditable', 'iconremove:times;defaulticon:pencil-alt;addicon:plus-square;placeholder:Write text and press ENTER;class:selected', function(self, config) {

	var cls = 'ui-listmenueditable';
	var cls2 = '.' + cls;
	var selected;
	var container;
	var last;
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
			container.find('.' + config.class).rclass(config.class);
			parent.aclass(config.class);
			selected = index;
			config.click && EXEC(config.click, parent, items[index], index);
		});

		self.event('click', cls2 + '-header ' + cls2 + '-icon', function() {
			config.addclick && EXEC(config.addclick);
		});

		self.event('keydown', 'input', function(event) {
			if (event.which === 13) {
				var parent = $(this).closest(cls2 + '-item');
				var value = parent.find('input').val();
				var cur = self.get();
				var index = parent.attrd('index');
				var key = config.key || 'name';

				if (!value.trim().length)
					return;

				if (index == null) {
					var obj = {};
					obj[key] = value;
					if (config.defaulticon.length)
						obj.icon = config.defaulticon;
					cur.push(obj);
				} else {
					cur[index][key] = value;
				}
				self.set(cur);
			}
		});

		self.event('click', cls2 + '-item ' + cls2 + '-icon', function() {
			var parent = $(this).closest(cls2 + '-item');
			config.editclick && EXEC(config.editclick, parent, parent.attrd('index'));
		});

		self.event('focusout', 'input', function() {
			var parent = $(this).closest(cls2 + '-item');
			var cur = self.get();
			var index = parseInt(parent.attrd('index'));
			if (index === last) {
				cur.splice(index, 1);
				self.set(cur);
			} else {
				var itemtemplate = self.itemtemplate();
				parent.replaceWith(itemtemplate(cur[index]));
			}
		});
	};

	self.edit = function(index) {
		if (index == null)
			return;

		var el = container.find(cls2 + '-item[data-index="' + index + '"]');
		var text = self.get()[index];
		var key = config.key || 'name';
		el.replaceWith(self.templateinput({ text: text[key] || '', index: index }));

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
		var itemtemplate = config.key ? Tangular.compile(template.replace(/\{\{\sname/g, '{{ ' + config.key)) : self.template;
		return itemtemplate;
	};

	self.setter = function(value) {
		if (!value || !value.length)
			return;

		var builder = [];
		var itemtemplate = self.itemtemplate();

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			item.index = i;
			item.icon = config.defaulticon;
			if (selected != null && selected == i)
				item.selected = true;
			builder.push(itemtemplate(item));
		}

		if (container == null)
			container = $(cls2 + '-container');

		container.empty().append(builder.join(''));
	};

});