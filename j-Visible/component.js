COMPONENT('visible', function() {
    var self = this;
    var condition = self.attr('data-if');
    self.readonly();
    self.setter = function(value) {

        var is = true;

        if (condition)
            is = EVALUATE(self.path, condition);
        else
            is = value ? true : false;

        self.element.toggleClass('hidden', !is);
    };
});