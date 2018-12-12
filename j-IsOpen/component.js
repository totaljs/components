COMPONENT('isopen', function(self) {

	var interval, prev;

	self.destroy = function() {
		clearInterval(interval);
	};

	self.blind();
	self.nocompile && self.nocompile();

	self.make = function() {

		var scr = self.find('script');
		var me = false;

		if (!scr.length) {
			scr = self.element;
			me = true;
		}

		self.template = Tangular.compile(scr.html());
		interval = setInterval(self.prerender, 60000);
		!me && scr.remove();
		self.prerender();
		self.tclass('ui-isopen');
	};

	self.prerender = function() {
		var dt = new Date();
		var model = {};
		model.minutes = dt.getMinutes();
		model.hours = dt.getHours();
		model.date = dt;
		model.day = dt.getDate();
		model.month = dt.getMonth() + 1;
		model.year = dt.getFullYear();
		model.daytype = dt.getDay();
		model.week = model.daytype === 0 || model.daytype === 6;
		var tmp = self.template(model);
		if (tmp !== prev) {
			prev = tmp;
			self.html(tmp);
		}
	};
});