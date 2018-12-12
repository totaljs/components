COMPONENT('gallery', function(self) {

	var images, container, current = 0;

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.init = function() {
		$('body').append('<div class="ui-gallery-preview hidden"><button name="prev"><i class="fa fa-caret-left"></i></button><button name="next"><i class="fa fa-caret-right"></i></button><div class="ui-gallery-table"><div class="ui-gallery-cell"><div><img src="" alt="" /></div></div></div></div>');

		var W = window;

		W.uigallerycontainer = $('.ui-gallery-preview');

		$(W).on('resize', function() {
			setTimeout2('uigallery', function() {
				$('.ui-gallery-preview').css({ width: WW, height: WH });
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

		window.uigallerycontainer.on('click', 'button', function() {
			window.uigalleryinstance && window.uigalleryinstance[this.name]();
		});

		window.uigallerycontainer.on('click', 'img', function() {
			window.uigalleryinstance && window.uigalleryinstance.close();
		});
	};

	self.make = function() {

		self.aclass('ui-gallery');

		images = self.find('img');

		// Sets index
		images.each(function(index) {
			$(this).attrd('index', index);
		});

		images = images.toArray();
		container = $($('.ui-gallery-preview')[0]);

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
		$('html,body').rclass('ui-gallery-noscroll');
		window.uigalleryinstance = null;
	};

	self.show = function(index) {

		window.uigalleryinstance = self;

		current = index;
		var img = images[current];

		// Loads image
		container.find('img').attr('src', $(img).attrd('src'));
		container.rclass('hidden');
		container.css('height', $(window).height() + 5);
		$('html,body').aclass('ui-gallery-noscroll');
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