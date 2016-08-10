/**
 * Checkbox
 * @version 1.0.0
 */
COMPONENT('checkbox', function() {

    var self = this;
    var required = self.attr('data-required') === 'true';
    var input;

    self.validate = function(value) {
        var is = false;
        var type = typeof(value);

        if (input.prop('disabled'))
            return true;

        if (type === 'undefined' || type === 'object')
            value = '';
        else
            value = value.toString();

        return value === 'true' || value === 'on';
    };

    if (!required)
        self.noValid();

    self.make = function() {
        self.element.addClass('ui-checkbox');
        self.html('<label><input type="checkbox" data-component-bind="" /><span{1}>{0}</span></label>'.format(self.html(), required ? ' class="ui-checkbox-label-required"' : ''));
        input = self.find('input');
    };
});