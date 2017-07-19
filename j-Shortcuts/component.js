COMPONENT('shortcuts', function(self) {

	var items = [];
	var length = 0;

	self.singleton();
	self.readonly();
	self.blind();

	self.make = function() {
		$(window).on('keydown', function(e) {
			length && setTimeout2(self.id, function() {
				for (var i = 0; i < length; i++)
					items[i].fn(e) && items[i].callback(e);
			}, 100);
		});
	};

	self.register = function(shortcut, callback) {
		var builder = [];
		shortcut.split('+').trim().forEach(function(item) {
			var lower = item.toLowerCase();
			switch (lower) {
				case 'ctrl':
				case 'alt':
				case 'shift':
					builder.push('e.{0}Key').format(lower);
					return;
				case 'win':
				case 'meta':
				case 'cmd':
					builder.push('e.metaKey');
					return;
				case 'space':
					builder.push('e.keyCode===32');
					return;
				case 'tab':
					builder.push('e.keyCode===9');
					return;
				case 'esc':
					builder.push('e.keyCode===27');
					return;
				case 'enter':
					builder.push('e.keyCode===13');
					return;
				case 'backspace':
				case 'del':
				case 'delete':
					builder.push('(e.keyCode===8||e.keyCode===127)');
					return;
				case 'up':
					builder.push('e.keyCode===38');
					return;
				case 'down':
					builder.push('e.keyCode===40');
					return;
				case 'right':
					builder.push('e.keyCode===39');
					return;
				case 'left':
					builder.push('e.keyCode===37');
					return;
				case 'f1':
				case 'f2':
				case 'f3':
				case 'f4':
				case 'f5':
				case 'f6':
				case 'f7':
				case 'f8':
				case 'f9':
				case 'f10':
				case 'f11':
				case 'f12':
					builder.push('e.key===\'{0}\''.format(item.toUpperCase()));
					return;
				case 'capslock':
					builder.push('e.which===20');
					return;
			}

			var num = item.parseInt();
			if (num)
				builder.push('e.which===' + num);
			else
				builder.push('e.key===\'{0}\''.format(item));

		});

		items.push({ fn: new Function('e', 'return ' + builder.join('&&')), callback: callback });
		length = items.length;
		return self;
	};
});