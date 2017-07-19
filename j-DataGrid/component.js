COMPONENT('datagrid', function(self) {

	var Theaders = {};
	var Trows = {};
	var Twidths = {};
	var rows, el_rows, el_headers;

	self.readonly();
	self.onCheckbox;
	self.onButton;

	self.make = function() {
		self.aclass('ui-datagrid');

		self.event('change', 'input', function() {
			var el = $(this);
			var index = parseInt(el.closest('.ui-datagrid-row').attr('data-index'));
			self.onCheckbox && self.onCheckbox(index, self.get()[index], el.prop('checked'), el);
		});

		self.event('click', 'button', function() {
			var el = $(this);
			var index = parseInt(el.closest('.ui-datagrid-row').attr('data-index'));
			self.onButton && self.onButton(index, self.get()[index], el.attr('name'), el);
		});

		self.find('script').each(function() {

			var html = this.innerHTML.replace(/(\s|\")column(\s|\")/g, function(text) {
				return text.replace('column', 'ui-datagrid-column');
			}).replace(/(\s|\")controls(\s|\")/g, function(text) {
				return text.replace('controls', 'ui-datagrid-controls');
			}).trim();

			var type = this.getAttribute('data-type');
			var header = type === 'header' || type === 'head';

			if (!header)
				html = html.replace(/class\=\".*?"/g, function(text) {
					return text.indexOf('ui-datagrid-column') === -1 ? text : '[#]' + text;
				});

			this.getAttribute('data-responsive').split(',').forEach(function(size) {
				size = size.trim();
				if (header) {
					Theaders[size] = Ta.compile(html);
					Twidths[size] = html.match(/width:\d+(px|\%)/gi);
				} else
					Trows[size] = Ta.compile(html);
			});

		}).remove();

		self.html('<div class="ui-datagrid-headers"></div><div class="ui-datagrid-rows"></div>');
		el_headers = self.find('.ui-datagrid-headers');
		el_rows = self.find('.ui-datagrid-rows');
	};

	self.renderrow = function(index, row, size) {
		if (!size)
			size = WIDTH();
		row.$index = index;
		var Trow = Trows[size];
		if (!Trow)
			return '';
		return Trow(row);
	};

	self.render = function(index, refresh, row, size) {

		if (!size)
			size = WIDTH();

		if (refresh === undefined)
			refresh = true;

		if (row === undefined)
			row = self.get()[index];

		var indexer = 0;

		rows[index] = '<div class="ui-datagrid-row" data-index="{1}">{0}</div>'.format(self.renderrow(index, row, size).replace(/\[\#\]/g, function() {
			var w = Twidths[size];
			if (w)
				w = w[indexer++];
			if (!w)
				return '';
			return 'style="{0}" '.format(w);
		}), index);

		refresh && self.find('.ui-datagrid-row[data-index="{0}"]'.format(index)).replaceWith(rows[index]);
		return self;
	};

	self.setter = function(value) {

		if (!value) {
			self.aclass('hidden');
			return;
		}

		rows = [];

		var size = WIDTH();

		for (var i = 0, length = value.length; i < length; i++)
			self.render(i, false, value[i], size);

		var Thead = Theaders[size];
		el_headers.empty().append(Thead ? Thead(value) : '');
		el_rows.empty().append(rows.join(''));
		self.rclass('hidden');
	};

});