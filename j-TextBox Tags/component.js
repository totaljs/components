COMPONENT('textboxtags', function() {

    var self = this;
    var isRequired = self.attr('data-required') === 'true';
    var isString = false;
    var container;

    if (!window.$textboxtagstemplate)
        window.$textboxtagstemplate = Tangular.compile('<li class="ui-textboxtags-tag" data-name="{{ name }}">{{ name }}<span class="fa fa-times"></span></li>');

    var template = window.$textboxtagstemplate;

    self.validate = function(value) {
        return isRequired ? value && value.length > 0 : true;
    };

    self.make = function() {

        var height = self.attr('data-height');
        var icon = self.attr('data-icon');
        var content = self.html();
        var html = '<div class="ui-textboxtags-values"' + (height ? ' style="min-height:' + height + '"' : '') + '><ul></ul><input type="text" placeholder="' + (self.attr('data-placeholder') || '') + '" /></div>';

        isString = self.type === 'string';

        if (content.length === 0) {
            self.element.addClass('ui-textboxtags');
            self.element.append(html);
        } else {
            self.element.empty();
            self.element.append('<div class="ui-textboxtags-label' + (isRequired ? ' ui-textboxtags-label-required' : '') + '">' + (icon ? '<span class="fa ' + icon + '"></span> ' : '') + content + ':</div>');
            self.element.append('<div class="ui-textboxtags">' + html + '</div>');
        }

        self.element.on('click', function(e) {
            self.element.find('input').focus();
        });

        container = self.element.find('ul');
        container.on('click', '.fa-times', function(e) {

            e.preventDefault();
            e.stopPropagation();

            var el = $(this);
            var arr = self.get();

            if (isString)
                arr = self.split(arr);

            if (!arr || !(arr instanceof Array) || !arr.length)
                return;

            var index = arr.indexOf(el.parent().attr('data-name'));
            if (index === -1)
                return;

            arr.splice(index, 1);
            self.reset(true);
            self.set(isString ? arr.join(', ') : arr);
        });

        self.element.on('keydown', 'input', function(e) {

            if (e.keyCode === 8) {
                if (this.value)
                    return;
                var arr = self.get();
                if (isString)
                    arr = self.split(arr);
                if (!arr || !(arr instanceof Array) || !arr.length)
                    return;
                arr.pop();
                self.reset(true);
                self.set(isString ? arr.join(', ') : arr);
                return;
            }

            if (e.keyCode !== 13)
                return;

            if (!this.value)
                return;

            var arr = self.get();
            var value = this.value;

            if (isString)
                arr = self.split(arr);

            if (!(arr instanceof Array))
                arr = [];

            if (arr.indexOf(value) === -1)
                arr.push(value);
            else
                return;

            this.value = '';
            self.reset(true);
            self.set(isString ? arr.join(', ') : arr);
        });
    };

    self.split = function(value) {
        if (!value)
            return new Array(0);
        var arr = value.split(',');
        for (var i = 0, length = arr.length; i < length; i++)
            arr[i] = arr[i].trim();
        return arr;
    };

    self.setter = function(value) {

        if (NOTMODIFIED(self.id, value))
            return;

        container.empty();

        if (!value || !value.length)
            return;

        var arr = isString ? self.split(value) : value;
        var builder = '';
        for (var i = 0, length = arr.length; i < length; i++)
            builder += template({ name: arr[i] });

        container.append(builder);
    };

    self.state = function(type) {
        self.element.find('.ui-textboxtags').toggleClass('ui-textboxtags-invalid', self.isInvalid());
    };
});