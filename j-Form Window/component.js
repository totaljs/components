COMPONENT('form', function() {

    var self = this;

    if (!MAN.$$form) {
        MAN.$$form = true;
        $(document).on('click', '.ui-form-button-close', function() {
            SET($.components.findById($(this).attr('data-id')).path, '');
        });
    }

    var hide = function() {
        self.set('');
    };

    self.readonly();
    self.submit = function(hide) { hide(); };
    self.cancel = function(hide) { hide(); };

    self.make = function() {
        var content = self.element.html();
        var width = self.attr('data-width') || '800px';
        var submit = self.attr('data-submit');

        self.condition = self.attr('data-if');
        self.element.empty();

        $(document.body).append('<div id="{0}" class="hidden ui-form-container"><div class="ui-form-container-padding"><div class="ui-form" style="max-width:' + width + '"><div class="ui-form-title"><span class="fa fa-times ui-form-button-close" data-id="{0}"></span>{1}</div>{2}</div></div>'.format(self._id, self.attr('data-title'), content));

        self.element = $('#' + self._id);
        self.element.data(COM_ATTR, self);

        self.element.find('button').on('click', function(e) {
            switch (this.name) {
                case 'submit':
                case 'cancel':
                    if (!this.disabled)
                        self[this.name](hide);
                    break;
            }
        });

        return true;
    };

    self.setter = function(value) {
        var isHidden = !EVALUATE(self.path, self.condition);
        self.element.toggleClass('hidden', isHidden);
        !isHidden && !isMOBILE && self.element.find('input').eq(0).focus();
    };
});