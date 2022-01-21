COMPONENT('watcher', 'delay:0', function(self, config) {

	var fn = NOOP;
	var delay = null;

	self.readonly();

	self.make = function() {
		var scr = self.find('scri' + 'pt').eq(0);
		var js = scr.html();
		if (js) {
			fn = new Function('value', 'path', 'type', 'element', 'component', js);
			scr.remove();
		}
	};

	self.destroy = function() {
		fn = null;
	};

	var exec = function(value, path, type) {
		delay = null;
		fn.call(this, value, path, type, self.element, self);
	};

	self.setter = function(value, path, type) {
		if (config.delay) {
			delay && clearTimeout(delay);
			delay = setTimeout(exec, config.delay, value, path, type);
		} else
			fn.call(this, value, path, type, self.element, self);
	};

});