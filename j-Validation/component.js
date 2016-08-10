/**
 * Validator
 * @version 2.0.0
 */
COMPONENT('validation', function() {

    var self = this;
    var path;
    var elements;

    self.readonly();

    self.make = function() {
        elements = self.find(self.attr('data-selector') || 'button');
        elements.prop({ disabled: true });
        self.evaluate = self.attr('data-if');
        path = self.path.replace(/\.\*$/, '');
        self.watch(self.path, self.state, true);
    };

    self.state = function() {
        var disabled = jC.disabled(path);
        if (!disabled && self.evaluate)
            disabled = !EVALUATE(self.path, self.evaluate);
        elements.prop({ disabled: disabled });
    };
});