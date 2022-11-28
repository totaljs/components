COMPONENT('feedbackbutton', 'color:#333;position:right;expire:3 days;label:Feedback;icon:ti ti-comment;animate:1', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.nocompile();
	self.readonly();
	self.singleton();

	self.make = function() {
		var hidden = !!CACHE(cls);
		self.tclass('hidden', hidden);
		config.animate && self.aclass(cls + '-animate');
		var button = config.url ? '<a class="{0}-inner" href="{3}" target="_blank"><i class="{2}"></i><span>{1}</span></a>'.format(cls, config.label, config.icon, config.url) : '<div class="{0}-inner"><i class="{2}"></i><span>{1}</span></div>'.format(cls, config.label, config.icon);
		self.html(('<div class="{0} {0}-{2}" style="background-color:{1}">' + button + '<div class="{0}-close"><i class="ti ti-times"></i></div></div>').format(cls, config.color, config.position));
	};

	self.hide = function() {
		CACHE(cls, 1, config.expire);
		self.aclass('hidden');
	};

	self.event('click', cls2 + '-close', self.hide);
	self.event('click', cls2 + '-inner', function() {
		config.exec && self.EXEC(config.exec, self.hide);
	});

});