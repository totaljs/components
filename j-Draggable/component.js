COMPONENT('draggable', function(self, config) {

	var events = {};
	var draggable;

	self.readonly();

	self.make = function() {
		$(document).on('mousedown', config.selector, events.ondown);
	};

	events.bind = function(is) {

		if (events.is === is)
			return;

		var en = 'dragenter dragover dragexit drop dragleave dragstart';
		var el = $(document);
		if (is) {
			el.on(en, events.ondrag);
			el.on('mouseup', events.up);
		} else {
			el.off(en, events.drag);
			el.off('mouseup', events.up);
		}

		events.is = is;
	};

	events.ondrag = function(e) {

		if (!draggable)
			return;

		if (e.type !== 'dragstart') {
			e.stopPropagation();
			e.preventDefault();
		}

		switch (e.type) {
			case 'drop':
				var a = draggable;
				var parent = e.target;
				var is = false;

				while (true) {

					if (parent === self.dom) {
						is = true;
						break;
					}

					if (parent.tagName === 'HTML' || parent.tagName === 'BODY')
						break;

					parent = parent.parentNode;
				}

				if (is && config.exec) {
					var meta = {};
					meta.pageX = e.pageX;
					meta.pageY = e.pageY;
					meta.offsetX = e.offsetX;
					meta.offsetY = e.offsetY;
					meta.el = $(a);
					meta.target = $(e.target);
					self.EXEC(config.exec, meta, meta.el);
					self.path && self.change(true);
				}
				break;

			case 'dragstart':
				var eo = e.originalEvent;
				if (eo.dataTransfer)
					eo.dataTransfer.setData('text', '1');
				break;
			case 'dragenter':
			case 'dragover':
			case 'dragexit':
			case 'dragleave':
				break;
		}
	};

	events.ondown = function() {
		draggable = this;
		events.bind(true);
	};

	events.onup = function() {
		draggable = null;
		events.bind(false);
	};

	self.destroy = function() {
		events.bind(false);
	};

});