COMPONENT('listmenueditable', 'iconremove:times;defaulticon:pencil-alt;addicon:plus-square;placeholder:Write text and press ENTER', function(self, config) {

	var cls = 'ui-listmenueditable';
	var cls2 = '.' + cls;
	var container;
	var deftemplate = '';
	var template = '<div class="' + cls + '-item {{ if selected }}selected{{ fi }} {{ classname }}" data-index="{{ index }}" {{ if value }} data-value="{{ value }}" {{ fi }}>{{ if icon }}<span class="' + cls + '-icon"><i class="fa fa-{{ icon }}"></i></span>{{ fi }}<div class="' + cls + '-text"><span>{{ name | encode | ui_listmenueditable_helper }}</span></div></div>';
	var templateinput = '<div class="' + cls + '-item" {{ if index != null }}data-index="{{ index }}"{{ fi }}><span class="' + cls + '-deleteicon"><i class="fa fa-' + config.iconremove + '"></i></span><div class="' + cls + '-text"><input placeholder="' + config.placeholder + '" {{ if index != null }}value="{{ text }}"{{ fi }} type="text" /></div></div>';

	Thelpers.ui_listmenueditable_helper = function(val) {
		var t = this;
		return t.template ? t.template.indexOf('{{') === -1 ? t.template : Tangular.render(t.template, this) : val;
	};

	self.template = Tangular.compile(template);
	self.templateinput = Tangular.compile(templateinput);

	self.make = function() {
		self.aclass(cls);
		config.title && self.html('<div class="' + cls + '-header"><span class="' + cls + '-icon"><i class="fas fa-' + config.addicon + '"></i></span><div class="' + cls + '-text"><span>Title</span></div></div>');
		self.append('<div class="' + cls + '-container"></div>');

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
					if (deftemplate.length)
						obj.template = deftemplate;
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
			var index = parent.attrd('index');
			if (index == null)
				parent.remove();
			else {
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
		el.replaceWith(self.templateinput({ text: text[key], index: index }));

		setTimeout2(self.id + 'focus', function() {
			container.find('input').focus();
		}, 80);
	};

	self.add = function(templa) {
		deftemplate = templa || '';
		container.append(self.templateinput(EMPTYOBJECT));
		setTimeout2(self.id + 'focus', function() {
			container.find('input').focus();
		}, 80);
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

		for (var i = 0, length = value.length; i < length; i++) {
			var item = value[i];
			item.index = i;
			builder.push(itemtemplate(item));
		}

		if (container == null)
			container = $(cls2 + '-container');

		container.empty().append(builder.join(''));
	};

});