COMPONENT('feedbackbutton', 'color:#333;position:right;expire:3 days', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.nocompile();
	self.readonly();
	self.singleton();

	self.make = function() {
		var hidden = !!CACHE(cls);
		self.tclass('hidden', hidden);
		self.html('<div class="{0} {0}-{2}" style="background-color:{1}"><div class="{0}-inner"><i class="fas fa-comment-alt-exclamation"></i><span>Feedback</span></div><div class="{0}-close"><i class="fal fa-times"></i></div></div>'.format(cls, config.color, config.position));
	};

	self.hide = function() {
		CACHE(cls, 1, config.expire);
		self.aclass('hidden');
	};

	self.event('click', cls2 + '-close', self.hide);

	self.event('click', cls2 + '-inner', function() {
		config.exec && EXEC(config.exec, self.hide);
	});

});