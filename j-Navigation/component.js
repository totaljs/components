COMPONENT('navigation', function(self, config) {

	var current, items;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-navigation');
		self.event('click', '.ui-navigation-link', function() {
			var el = $(this);
			var parent = el.parent();
			if (el.hclass('ui-navigation-children')) {
				parent.tclass('ui-navigation-show');
			} else {
				current && current.rclass('ui-navigation-selected');
				current = parent;
				parent.aclass('ui-navigation-selected');
				EXEC(config.exec, items[current.attrd('id')]);
			}
		});
	};

	self.setter = function(value) {

		if (!value || !value.length)
			return;

		var indexer = 0;
		items = {};

		var render = function(children, level) {

			var builder = [];

			for (var i = 0; i < children.length; i++) {

				indexer++;

				var item = children[i];
				var childs = item.children && item.children.length;
				var o = '<div class="ui-navigation-item ui-navigation-level-{0}{1}" title="{2}" data-id="{3}">'.format(level, childs && !item.collapsed ? ' ui-navigation-show' : '', item.title, indexer);
				o += '<span class="ui-navigation-link{1}{2}"><i class="far"></i>{0}</span>'.format(item.name, childs ? ' ui-navigation-children' : '');

				if (childs) {
					item.children.quicksort('treeorder');
					o += '<div class="ui-navigation-level">';
					o += render(item.children, level + 1);
					o += '</div>';
				} else
					items[indexer] = item;

				o += '</div>';
				builder.push(o);
			}

			return builder.join('');
		};

		current = null;
		self.html(render(value, 0));
		config.autoselect && self.find('.ui-navigation-item:first-child').eq(0).find('.ui-navigation-link').trigger('click');
	};
});