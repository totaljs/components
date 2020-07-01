COMPONENT('select', '', function(self, config) {

	var cls = 'ui-select';
	var cls2 = '.' + cls;
	var select, button, items = [];
	var datasource = null;
	var visible = false;

	self.nocompile && self.nocompile();

	self.redraw = function() {
		var tmp = [];
		items.forEach(function(i, index){
			tmp.push('<a class="ui-select-option" data-index="{0}">{1}</a>'.format(index, i.name));
		});
		select.html(tmp.join(''));
	};

	self.configure = function(key, value, init) {

		switch(key) {
			case 'items':
				items = value.split(',').trim();
				if (items && items instanceof Array) {
					items = items.map(function(o){
						o = o.split('|');
						return { id: o[0], name: o[1] };
					});
					self.redraw();
				}
				break;
			case 'datasource':
				items = GET(value);
				if (items && items instanceof Array)
					self.redraw();
			case 'size':
				self.css('font-size', value + 'px');
				break;
		};
	};

	self.make = function() {

		self.aclass(cls);

		self.html('<button></button><div class="ui-select-select hidden"></div>');
		button = self.find('button');
		select = self.find(cls2 + '-select');

		setTimeout(function(){
			select.css('min-width', button.width());
		}, 1000);

		self.event('click', 'button', function(e) {

			select.tclass('hidden', visible);
			visible = !visible;
			e.stopPropagation();

		});

		self.event('click', cls2 + '-option', function(e) {

			e.stopPropagation();

			var el = $(this);
			var index = +el.attrd('index');
			var item = items[index];

			if (item === undefined)
				return;

			self.set(item.id);
			self.change(true);
			select.aclass('hidden');
			visible = false;
		});
	};

	self.setter = function(value, path, type) {
		var item = items.findItem('id', value);
		var text = item ? item.name : (config.text || 'Select');
		type && config.exec && EXEC(config.exec, value);
		return button.html('<span>{0}</span><i class="fa fa-caret-down"></i>'.format(text));
	};

	$(document).on('click', function() {
		if (!visible)
			return;

		visible = false;
		select.aclass('hidden');
	});
});