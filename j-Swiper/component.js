COMPONENT('swiper', 'null', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, body, pagination, navigation, items, swiper;
	var opt = {};
	var inactivitytimer;
	var resettime = config.reset !== undefined ? config.reset * 60000 : null;

	self.readonly();

	self.make = function() {

		var scr = self.find('script');
		if (scr.length) {
			self.template = Tangular.compile(scr.html());
			scr.remove();
		}

		self.aclass(cls);
		self.element.wrapInner('<div class="swiper {0}-container {0}-{1}"><div class="swiper-wrapper {0}-body"></div></div>'.format(cls, self.id));
		container = self.find(cls2 + '-container');

		body = self.find(cls2 + '-body');
		items = body.find('> figure').toArray();

		self.rclass('hidden invisible', 500);

		if (config.pagination) {
			pagination = '<div class="swiper-pagination {0}-pagination"></div>'.format(cls);
			container.append(pagination);
			opt.pagination = {
				el: '.swiper-pagination',
				clickable: true
			};
		}

		if (config.navigation) {
			navigation = '<div class="swiper-button-next {0}-button-next"></div><div class="swiper-button-prev {0}-button-prev"></div>'.format(cls);
			container.append(navigation);
			opt.navigation = {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			};
		}

		if (config.autoplay) {
			opt.autoplay = {
				delay: config.delay || 2500,
				disableOnInteraction: false
			};
		}

		opt.slidesPerView = 1;
		opt.loopAddBlankSlides = true;
		opt.spaceBetween = config.spacebetween || 0;
		opt.loop = config.loop && true;
		opt.freeMode = config.freemode && true;
		opt.lazy = true;

		opt.breakpoints = {
			640: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			768: {
				slidesPerView: config.slidesperview || 1,
				spaceBetween: config.spacebetween || 0
			}
		};

		setTimeout(() => {
		 	swiper = new Swiper(cls2 + '-' + self.id, opt);
		 	if (resettime !== null) 
		 		resettimer();
		}, 500);

		if (resettime !== null) {
			document.addEventListener('pointerdown', resettimer);
			document.addEventListener('wheel', resettimer);
			document.addEventListener('keydown', resettimer);
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState === "visible") 
					resettimer();
			});
		}

		function resettimer() {
			clearTimeout(inactivitytimer);
			inactivitytimer = setTimeout(() => {
				if (swiper) 
					swiper.slideTo(0);
			}, resettime);
		}
	};

	self.setter = function(value) {

		if (!value || !(value instanceof Array)) {
			if (self.template) {
				body.html('');
				self.aclass('hidden');
			}
			return;
		}

		var builder = [];
		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			builder.push('<figure class="swiper-slide">' + self.template(item) + '</figure>');
		}

		body.html(builder.join(''));
		self.rclass('hidden');
		items = body.find('> figure').toArray();
	};

}, ['https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css']);