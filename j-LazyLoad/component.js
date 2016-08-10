COMPONENT('lazyload', function() {

    var self = this;

    self.visible_old = 0;
    self.visible_timeout = 0;
    self.isinit = false;
    self.isredraw = false;

    self.readonly();

    self.init = function() {

        window.$lazyload = [];
        window.$lazyload_can = false;
        window.$lazyload_timeout = 0;

        var win = $(window);
        win.on('scroll', function(e) {

            if (!window.$lazyload_can)
                return;

            var arr = window.$lazyload;
            var top = win.scrollTop();
            var toph = top + win.height();

            for (var i = 0, length = arr.length; i < length; i++) {
                var item = arr[i];
                item.component.visible = toph >= item.top && top <= item.top + item.height;
                item.component.refresh(item.remove);
            }
        });

        window.$lazyload_refresh = function(skip) {
            clearTimeout(window.$lazyload_timeout);
            window.$lazyload_timeout = setTimeout(function() {
                var arr = window.$lazyload;
                for (var i = 0, length = arr.length; i < length; i++) {
                    var item = arr[i];
                    if (item.remove)
                        continue;
                    if (item.component.id !== skip)
                        item.top = item.component.element.offset().top;
                    if (item.innerh)
                        item.height = item.component.element.height();
                }
            }, 200);
        };

        setTimeout(function() {
            win.trigger('scroll');
        }, 500);

        setInterval(function() {
            $lazyload_refresh();
        }, 1000 * 60);
    };

    self.destroy = function() {
        self.clean();
    };

    self.clean = function() {
        var index = window.$lazyload.findIndex(function(item) {
            return item.component.id === self.id;
        });
        if (index === -1)
            return;
        window.$lazyload.splice(index, 1);
        window.$lazyload_can = window.$lazyload.length > 0;
    };

    self.refresh = function(remove) {

        if (self.visible_old === self.visible)
            return;

        clearTimeout(self.visible_timeout);
        self.visible_old = self.visible;
        self.visible_timeout = setTimeout(function() {

            var attr;

            if (self.visible) {
                if (self.isinit) {
                    self.isredraw = true;
                    attr = 'redraw';
                } else {
                    self.isinit = true;
                    attr = 'init';
                    setTimeout(function() {
                        $lazyload_refresh(self.id);
                    }, 200);
                }
            } else if (self.isinit)
                attr = 'hide';

            if (!attr)
                return;


            var path = self.attr('data-' + attr);
            if (!path)
                return;

            var val = self.get(path);
            if (typeof(val) === 'function')
                val.call(self, self);
            else
                self.set(attr === 'hide' ? !self.visible : self.visible);

            if (!self.isinit || !remove)
                return;

            self.clean();
        }, 100);
    };

    self.make = function() {
        var self = this;
        var item = {};

        item.component = self;
        item.top = self.element.offset().top;
        item.type = 0;
        item.height = (self.attr('data-height') || '').replace(/px|\%/g, '').parseInt();
        item.remove = self.attr('data-redraw') || self.attr('data-hide') ? false : true;

        if (!item.height) {
            item.innerh = true;
            item.height = self.element.height();
        }

        $lazyload.push(item);
        $lazyload_can = true;
    };
});