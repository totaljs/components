COMPONENT('shortcuts', function(self) {

	var items = [];
	var length = 0;
	var keys = {};
	var elements;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	var cb = function(o, e) {
		o.callback(e, o.owner);
	};

	self.make = function() {

		$(W).on('keydown', function(e) {

			// cache
			if ((e.metaKey && !keys.meta) || (e.altKey && !keys.alt) || (e.ctrlKey && !keys.ctrl) || (e.shiftKey && !keys.shift) || (!keys[e.keyCode] && !keys[e.key]))
				return;

			if (length && !e.isPropagationStopped()) {
				for (var i = 0; i < length; i++) {
					var o = items[i];
					if (o.fn(e)) {
						if (o.prevent) {
							e.preventDefault();
							e.stopPropagation();
						}
						setTimeout(cb, 100, o, e);
						return;
					}
				}
			}
		});

		ON('component + knockknock', self.refresh);
	};

	self.refreshforce = function() {

		var arr = document.querySelectorAll('.shortcut');
		var index = 0;

		while (true) {
			var item = items[index++];
			if (item == null)
				break;
			if (item.owner) {
				index--;
				items.splice(index, 1);
			}
		}

		for (var i = 0; i < arr.length; i++) {
			var shortcut = arr[i].getAttribute('data-shortcut');
			shortcut && self.register(shortcut, self.execshortcut, true, arr[i]);
		}

	};

	self.execshortcut = function(e, owner) {
		$(owner).trigger('click');
	};

	self.refresh = function() {
		setTimeout2(self.ID, self.refreshforce, 500);
	};

	self.exec = function(shortcut) {
		var item = items.findItem('shortcut', shortcut.toLowerCase().replace(/\s/g, ''));
		item && item.callback(EMPTYOBJECT);
	};

	self.key = function(num) {
		keys[num] = 1;
	};

	self.register = function(shortcut, callback, prevent, owner) {
		shortcut.split(',').trim().forEach(function(shortcut) {
			var builder = [];
			var alias = [];
			shortcut.split('+').trim().forEach(function(item) {
				var lower = item.toLowerCase();
				alias.push(lower);
				switch (lower) {
					case 'ctrl':
					case 'alt':
					case 'shift':
						builder.push('e.{0}Key'.format(lower));
						keys[lower] = 1;
						return;
					case 'win':
					case 'meta':
					case 'cmd':
						builder.push('e.metaKey');
						keys.meta = 1;
						return;
					case 'ins':
						builder.push('e.keyCode===45');
						self.key(45);
						return;
					case 'space':
						builder.push('e.keyCode===32');
						self.key(32);
						return;
					case 'tab':
						builder.push('e.keyCode===9');
						self.key(9);
						return;
					case 'esc':
						builder.push('e.keyCode===27');
						self.key(28);
						return;
					case 'enter':
						builder.push('e.keyCode===13');
						self.key(13);
						return;
					case 'backspace':
						builder.push('e.keyCode===8');
						self.key(8);
						break;
					case 'del':
					case 'delete':
						builder.push('e.keyCode===46');
						self.key(46);
						return;
					case 'remove':
						builder.push('(e.keyCode===8||e.keyCode===46)');
						self.key(46);
						return;
					case 'up':
						builder.push('e.keyCode===38');
						self.key(38);
						return;
					case 'down':
						builder.push('e.keyCode===40');
						self.key(40);
						return;
					case 'right':
						builder.push('e.keyCode===39');
						self.key(39);
						return;
					case 'left':
						builder.push('e.keyCode===37');
						self.key(37);
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
						var a = item.toUpperCase();
						builder.push('e.key===\'{0}\''.format(a));
						keys[a] = 1;
						return;
					case 'capslock':
						builder.push('e.which===20');
						self.key(20);
						return;
				}

				var num = item.parseInt();
				if (num) {
					builder.push('e.which===' + num);
					self.key(num);
				} else {
					num = item.toUpperCase().charCodeAt(0);
					self.key(num);
					builder.push('e.keyCode==={0}'.format(num));
				}
			});

			items.push({ shortcut: alias.join('+'), fn: new Function('e', 'return ' + builder.join('&&')), callback: callback, prevent: prevent, owner: owner });
			length = items.length;
		});

		if (!owner)
			self.refresh();

		return self;
	};
});