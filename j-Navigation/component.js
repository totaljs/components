COMPONENT('navigation', 'pk:id', function(self, config, cls) {

	var cls2 = '.' + cls;
	var current, items, open = {};

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls);

		self.event('click', 'b', function(e) {
			var el = $(this);
			config.options && self.EXEC(config.options, items[el.closest(cls2 + '-item').attrd('id')], el);
			e.preventDefault();
			e.stopPropagation();
		});

		self.event('click', cls2 + '-link', function() {
			var el = $(this);
			var parent = el.parent();
			var index = parent.attrd('id');

			if (el.hclass(cls + '-children')) {
				if (parent.hclass(cls + '-selected')) {
					parent.tclass(cls + '-show');
					current && current.rclass(cls + '-selected');
					current = parent;
				} else if (!parent.hclass(cls + '-show'))
					parent.aclass(cls + '-show');

				if (parent.hclass(cls + '-show')) {
					parent.aclass(cls + '-selected');
					current && current.rclass(cls + '-selected');
					current = parent;
					self.EXEC(config.exec, items[index]);
					if (config.pk)
						open.selected = items[index][config.pk];
				}

			} else {
				current && current.rclass(cls + '-selected');
				current = parent;
				parent.aclass(cls + '-selected');
				self.EXEC(config.exec, items[index]);
				if (config.pk)
					open.selected = items[index][config.pk];
			}

			if (config.pk)
				open[items[index][config.pk]] = parent.hclass(cls + '-selected');
		});
	};

	self.setter = function(value) {

		if (!value || !value.length)
			return;

		var indexer = 0;
		var selectedindex = -1;

		items = {};

		var render = function(children, level) {

			var builder = [];

			for (var i = 0; i < children.length; i++) {

				indexer++;

				var item = children[i];
				var childs = item.children && item.children.length;

				if (config.pk) {
					if (open.selected && item[config.pk] === open.selected)
						selectedindex = indexer;
					if (item.collapsed && open[item[config.pk]])
						item.collapsed = false;
				}

				var o = '<div class="ui-navigation-item ui-navigation-level-{0}{1}" title="{2}" data-id="{3}">'.format(level, childs && !item.collapsed ? ' ' + cls + '-show' : '', item.title, indexer);
				o += '<span class="ui-navigation-link{1}">{2}<i class="far"></i>{0}</span>'.format(item.name, childs ? ' ui-navigation-children' : '', item.options ? '<b><i class="fa fa-ellipsis-h"></i></b>' : '');

				items[indexer] = item;

				if (childs) {
					item.children.quicksort('treeorder');
					o += '<div class="' + cls + '-level">';
					o += render(item.children, level + 1);
					o += '</div>';
				}

				o += '</div>';
				builder.push(o);
			}

			return builder.join('');
		};

		current = null;
		self.html(render(value, 0));

		if (selectedindex !== -1)
			self.find(cls2 + '-item[data-id="{0}"]'.format(selectedindex)).aclass(cls + '-selected');
		else if (config.autoselect)
			self.find(cls2 + '-item:first-child').eq(0).find(cls2 + '-link').trigger('click');
	};
});