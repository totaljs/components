COMPONENT('iframepreview', function() {
    var self = this;
    var iframe;
    var is;

    if (!window.$iframepreview) {
        window.$iframepreview = true;
        $(window).on('keydown', function(e) {
            e.keyCode === 27 && FIND('iframepreview', true).forEach(FN('n => n.hide()'));
        });
    }

    self.readonly();
    self.make = function(template) {
        self.classes('ui-iframepreview hidden');
        self.html('<div style="max-width:{0}"><i class="fa fa-times-circle"></i><iframe src="about:blank" frameborder="0" allowfullscreen></div>'.format(self.attr('data-width') || '960px'));
        iframe = self.find('iframe');
        self.event('click', '.fa', self.hide);
    };

    self.open = function(url) {

        window.$iframepreview_current && window.$iframepreview_current !== self && window.$iframepreview_current.hide();
        url && iframe.attr('src', url);

        if (is)
            return;

        self.classes('-hidden');
        window.$iframepreview_current = self;
        is = true;
    };

    self.show = self.open;

    self.hide = function() {
        if (!is)
            return;
        self.classes('hidden');
        is = false;
    };

    self.setter = function(value) {
        if (value)
            self.open(value);
        else
            self.hide();
    };
});