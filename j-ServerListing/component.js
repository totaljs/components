COMPONENT('serverlisting', function(self, config) {

	var container, paginate;
	var layout;

	self.readonly();

	self.make = function() {

		self.find('script').each(function(index) {
			var T =  Tangular.compile(this.innerHTML);
			if (index)
				layout = T;
			else
				self.template = T;
		});

		self.aclass('ui-serverlisting');
		self.html('<div class="ui-serverlisting-container"></div><div class="ui-serverlisting-paginate"></div>');
		container = self.find('.ui-serverlisting-container');
		paginate = self.find('.ui-serverlisting-paginate');
		paginate.on('click', 'button', function() {
			EXEC(config.paginate, +$(this).attrd('index'));
		});
	};

	self.setter = function(value) {

		if (!value) {
			container.empty();
			paginate.empty();
			self.aclass('hidden');
			return;
		}

		if (self.notmodified('items'))
			return;

		var builder = [];
		var g = { count: value.count, page: value.page, pages: value.pages };

		for (var i = 0; i < value.items.length; i++) {
			g.index = i;
			builder.push(self.template(value.items[i], g));
		}

		container.html(layout ? layout({ page: value.page, pages: value.pages, body: builder.join(''), count: value.count }) : builder.join(''));

		if (value.page < 2) {
			builder = [];
			for (var i = 0; i < value.pages; i++)
				builder.push('<button data-index="{0}">{0}</button>'.format(i + 1));
			paginate.html(builder.join(''));
		}

		paginate.find('.selected').rclass('selected');
		paginate.find('button[data-index="{0}"]'.format(value.page)).aclass('selected');
		paginate.tclass('hidden', value.pages < 2);
		self.tclass('hidden', value.count === 0);
	};

});