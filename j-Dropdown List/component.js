/**
 * Dropdown
 * @version 2.0.0
 */
COMPONENT('dropdown', function() {

    var self = this;
    var required = self.attr('data-required') === 'true';
    var select;
    var container;

    self.validate = function(value) {

        var type = typeof(value);

        if (select.prop('disabled'))
            return true;

        if (type === 'undefined' || type === 'object')
            value = '';
        else
            value = value.toString();

        if (window.$calendar)
            window.$calendar.hide();

        if (self.type === 'currency' || self.type === 'number')
            return value > 0;

        return value.length > 0;
    };

    if (!required)
        self.noValid();

    self.render = function(arr) {

        var builder = [];
        var value = self.get();
        var template = '<option value="{0}"{1}>{2}</option>';
        var propText = self.attr('data-source-text') || 'name';
        var propValue = self.attr('data-source-value') || 'id';
        var emptyText = self.attr('data-empty');

        if (emptyText !== undefined)
            builder.push('<option value="">{0}</option>'.format(emptyText));

        for (var i = 0, length = arr.length; i < length; i++) {
            var item = arr[i];
            if (item.length)
                builder.push(template.format(item, value === item ? ' selected="selected"' : '', item));
            else
                builder.push(template.format(item[propValue], value === item[propValue] ? ' selected="selected"' : '', item[propText]));
        }

        select.html(builder.join(''));
    };

    self.make = function() {

        var options = [];

        (self.attr('data-options') || '').split(';').forEach(function(item) {
            item = item.split('|');
            options.push('<option value="{0}">{1}</option>'.format(item[1] === undefined ? item[0] : item[1], item[0]));
        });

        self.element.addClass('ui-dropdown-container');

        var label = self.html();
        var html = '<div class="ui-dropdown"><span class="fa fa-sort"></span><select data-component-bind="">{0}</select></div>'.format(options.join(''));
        var builder = [];

        if (label.length) {
            var icon = self.attr('data-icon');
            builder.push('<div class="ui-dropdown-label{0}">{1}{2}:</div>'.format(required ? ' ui-dropdown-label-required' : '', icon ? '<span class="fa {0}"></span> '.format(icon) : '', label));
            builder.push('<div class="ui-dropdown-values">{0}</div>'.format(html));
            self.html(builder.join(''));
        } else
            self.html(html).addClass('ui-dropdown-values');

        select = self.find('select');
        container = self.find('.ui-dropdown');

        var ds = self.attr('data-source');
        if (!ds)
            return;

        var prerender = function(path) {
            var value = self.get(self.attr('data-source'));
            if (NOTMODIFIED(self.id, value))
                return;
            if (!value)
                value = [];
            self.render(value);
        };

        self.watch(ds, prerender, true);
    };

    self.state = function(type, who) {
        if (!type)
            return;
        var invalid = self.isInvalid();
        if (invalid === self.$oldstate)
            return;
        self.$oldstate = invalid;
        container.toggleClass('ui-dropdown-invalid', self.isInvalid());
    };
});