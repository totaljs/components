COMPONENT('packetawidget', function(self, config, cls) {
    self.singleton();

    self.show = function(opt) {
        if (typeof Packeta === 'undefined' || typeof Packeta.Widget === 'undefined') {
            console.error('Packeta widget did not load.');
            return;
        }

        Packeta.Widget.pick(null, function(point) {
            if (point) {
                if (opt.callback)
                    opt.callback(point);
            }
        });

    };

}, ['https://widget.packeta.com/v6/www/js/library.js']);