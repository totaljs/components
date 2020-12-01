COMPONENT('gallery', function(self, config, cls) {

	var images, container, current = 0;
	var cls2 = '.' + cls;

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.init = function() {

		$('body').append('<div class="{0}-preview hidden"><button name="prev"><i class="fa fa-caret-left"></i></button><button name="next"><i class="fa fa-caret-right"></i></button><div class="{0}-table"><div class="{0}-cell"><div><img src="" alt="" /></div></div></div></div>'.format(cls));
		W.uigallerycontainer = $('.' + cls +'-preview');

		ON('resize2 + resize', function() {
			setTimeout2(cls, function() {
				$(cls2 + '-preview').css({ width: WW, height: WH });
			}, 500);
		});

		$(W).on('keydown', function(e) {

			if (!W.uigalleryinstance || W.uigallerycontainer.hclass('hidden'))
				return;

			switch (e.which) {
				case 39:
					W.uigalleryinstance.next();
					break;
				case 37:
					W.uigalleryinstance.prev();
					break;
				case 27:
					W.uigalleryinstance.close();
					break;
			}
		});

		W.uigallerycontainer.on('click', 'button', function() {
			W.uigalleryinstance && W.uigalleryinstance[this.name]();
		});

		W.uigallerycontainer.on('click', 'img', function() {
			W.uigalleryinstance && W.uigalleryinstance.close();
		});
	};

	self.make = function() {

		self.aclass(cls);

		images = self.find('img');

		// Sets index
		images.each(function(index) {
			$(this).attrd('index', index);
		});

		images = images.toArray();
		container = $($(cls2 + '-preview')[0]);

		self.event('click', 'img', function() {
			var img = $(this);
			self.show(+img.attrd('index'));
		});

		container.on('touchmove', function(e) {
			e.preventDefault();
		});
	};

	self.close = function() {
		container.aclass('hidden');
		$('html,body').rclass(cls + '-noscroll');
		W.uigalleryinstance = null;
	};

	self.show = function(index) {

		W.uigalleryinstance = self;

		current = index;
		var img = images[current];

		// Loads image
		container.find('img').attr('src', $(img).attrd('src'));
		container.rclass('hidden');
		container.css('height', $(W).height() + 5);
		$('html,body').aclass(cls + '-noscroll');
	};

	self.next = function() {
		current++;
		if (current > images.length - 1)
			current = 0;
		self.show(current);
	};

	self.prev = function() {
		current--;
		if (current < 0)
			current = images.length - 1;
		self.show(current);
	};

});