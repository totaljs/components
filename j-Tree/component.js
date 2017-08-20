COMPONENT('tree', 'selected:selected', function(self, config) {

	var cache = null;
	var counter = 0;
	var expanded = {};

	self.template = Tangular.compile('<div class="item{{ if children }} expand{{ fi }}" data-index="{{ $pointer }}"><i class="fa fa-{{ if children }}folder{{ else }}file-o{{ fi }}"></i>{{ name }}</div>');
	self.readonly();

	self.make = function() {
		self.aclass('ui-tree');
		self.event('click', '.item', function() {
			var el = $(this);
			var index = +el.attr('data-index');
			self.select(index);
		});
	};

	self.select = function(index) {
		var cls = config.selected;
		var el = self.find('[data-index="{0}"]'.format(index));
		if (el.hclass('expand')) {
			var parent = el.parent();
			parent.tclass('show');
			var is = expanded[index] = parent.hclass('show');
			el.find('.fa').tclass('fa-folder', !is).tclass('fa-folder-open', is);
			config.exec && EXEC(config.exec, cache[index], true, is);
		} else {
			!el.hclass(cls) && self.find('.' + cls).rclass(cls);
			el.aclass(cls);
			config.exec && EXEC(config.exec, cache[index], false);
		}
	};

	self.unselect = function() {
		var cls = config.selected;
		self.find('.' + cls).rclass(cls);
	};

	self.clear = function() {
		expanded = {};
	};

	self.expand = function(value) {
		self.find('.expand').each(function() {
			$(this).parent().tclass('show', value === true);
		});
	};

	self.renderchildren = function(builder, item, level) {
		builder.push('<div class="children children{0}" data-level="{0}">'.format(level));
		item.children.forEach(function(item) {
			counter++;
			item.$pointer = counter;
			cache[counter] = item;
			builder.push('<div class="node{0}">'.format(expanded[counter] ? ' show' : ''));
			builder.push(self.template(item));
			item.children && self.renderchildren(builder, item, level + 1);
			builder.push('</div>');
		});
		builder.push('</div>');
	};

	self.reset = function() {
		var cls = config.selected;
		self.find('.' + cls).rclass(cls);
	};

	self.first = function() {
		cache.first && self.select(cache.first.$pointer);
	};

	self.setter = function(value) {

		var builder = [];

		counter = 0;
		cache = {};

		value && value.forEach(function(item) {
			counter++;
			item.$pointer = counter;
			cache[counter] = item;
			builder.push('<div class="node{0}">'.format(expanded[counter] ? ' show' : '') + self.template(item));
			if (item.children)
				self.renderchildren(builder, item, 1);
			else if (!cache.first)
				cache.first = item;
			builder.push('</div>');
		});

		self.html(builder.join(''));
		config.first !== false && cache.first && setTimeout(self.first, 100);
	};
});