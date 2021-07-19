COMPONENT('movement', function(self) {

	var SKIP = { INPUT: 1, TEXTAREA: 1, SELECT: 1 };
	var TYPE = { '13': 'enter', '27': 'esc', '38': 'up', '40': 'down', '37': 'left', '39': 'right' };
	var ondown, onexit;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.make = function() {

		$(W).on('keydown', function(e) {
			if (!SKIP[e.target.tagName]) {
				var c = e.keyCode;
				switch (c) {
					case 9:  // tab
						onexit && onexit();
						onexit = null;
						ondown = null;
						break;
					case 13: // enter
					case 27: // esc
					case 38: // up
					case 40: // down
					case 37: // left
					case 39: // right
						ondown && ondown(TYPE[c + ''], e);
						break;
				}
			}
		});
	};

	self.assign = function(down, exit) {
		onexit && onexit();
		ondown = down;
		onexit = exit;
	};

});