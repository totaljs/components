COMPONENT('listing', 'count:20', function(self, config) {

	var container, paginate, pages = 0;
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

		self.aclass('ui-listing');
		self.html('<div class="ui-listing-container"></div><div class="ui-listing-paginate"></div>');
		container = self.find('.ui-listing-container');
		paginate = self.find('.ui-listing-paginate');
		paginate.on('click', 'button', function() {
			self.page(+$(this).attrd('index'));
		});
	};

	self.page = function(index) {

		var builder = [];
		var arr = self.get().takeskip(config.count, index * config.count);
		var g = {};

		for (var i = 0; i < arr.length; i++) {
			g.index = i;
			builder.push(self.template(arr[i], g));
		}

		container.html(layout ? layout({ page: i, pages: pages, body: builder.join('') }) : builder.join(''));
		paginate.find('.selected').rclass('selected');
		paginate.find('button[data-index="{0}"]'.format(index)).aclass('selected');
	};

	self.setter = function(value) {

		if (!value) {
			container.empty();
			paginate.empty();
			return;
		}

		pages = Math.ceil(value.length / config.count);
		var builder = [];

		for (var i = 0; i < pages; i++)
			builder.push('<button data-index="{0}">{1}</button>'.format(i, i + 1));

		paginate.html(builder.join(''));
		self.page(0);
	};

});