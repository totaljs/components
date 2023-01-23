COMPONENT('movable', 'move:true', function(self, config) {

	var events = {};
	var draggable;

	self.readonly();

	self.make = function() {
		var target = config.global ? $(document) : config.parent ? self.parent(config.parent) : self.element;
		target.on('dragenter dragover dragexit drop dragleave dragstart', config.selector, events.ondrag).on('mousedown', config.selector, events.ondown);
	};

	events.ondrag = function(e) {

		if (!draggable) {
			e.preventDefault();
			return;
		}

		if (e.type !== 'dragstart') {
			e.stopPropagation();
			e.preventDefault();
		}

		switch (e.type) {
			case 'drop':

				var parent = config.container ? $(draggable).closest(config.container)[0] : draggable.parentNode;

				var a = draggable;
				var b = e.target;
				var ai = -1;
				var bi = -1;
				var is = false;

				draggable = null;

				while (true) {

					if (b.parentNode === parent) {
						is = true;
						break;
					}

					b = b.parentNode;
					if (b == null || b.tagName === 'HTML')
						break;
				}

				if (a === b || !is)
					return;

				for (var i = 0; i < parent.children.length; i++) {
					var child = parent.children[i];
					if (a === child)
						ai = i;
					else if (b === child)
						bi = i;
					if (bi !== -1 && ai !== -1)
						break;
				}

				var children;

				var $b = $(e.target);
				b = $b.filter(config.selector);

				if (!b.length)
					b = $b.closest(config.selector);

				if (b.length)
					b = b[0];
				else
					return;

				if (config.move) {
					if (ai > bi)
						parent.insertBefore(a, b);
					else
						parent.insertBefore(a, b.nextSibling);

					children = $(parent).find(config.selector).toArray();

				} else {

					children = $(parent).find(config.selector);

					var tmp = [];
					for (var i = 0; i < children.length; i++) {
						var item = children[i];
						if (item === a)
							tmp.push(b);
						else if (item === b)
							tmp.push(a);
						else
							tmp.push(item);
					}
					children = tmp;
				}

				config.exec && self.EXEC(config.exec, children, a, b);
				self.path && self.change(true);
				break;

			case 'dragstart':
				var eo = e.originalEvent;
				eo.dataTransfer && eo.dataTransfer.setData('text', '1');
				break;
			case 'dragenter':
			case 'dragover':
			case 'dragexit':
			case 'dragleave':
				break;
		}
	};

	events.ondown = function(e) {
		if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA')
			draggable = null;
		else
			draggable = this;
	};

	self.destroy = function() {
		$(document).off('dragenter dragover dragexit drop dragleave dragstart', config.selector, events.ondrag).off('mousedown', config.selector, events.ondown);
	};
});