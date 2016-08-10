COMPONENT('autocomplete', function() {
    var self = this;
    var container;
    var old;
    var onSearch;
    var searchtimeout;
    var searchvalue;
    var blurtimeout;
    var onCallback;
    var datasource;
    var is = false;

    self.template = Tangular.compile('<li{{ if index === 0 }} class="selected"{{ fi }} data-index="{{ index }}"><span>{{ name }}</span><span>{{ type }}</span></li>');
    self.readonly();
    self.singleton();

    self.make = function() {
        self.element.addClass('ui-autocomplete-container');
        self.element.html('<div class="ui-autocomplete"><ul></ul></div>');
        container = self.element.find('ul');

        self.element.on('click', 'li', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (onCallback)
                onCallback(datasource[+$(this).attr('data-index')], old);
            self.visible(false);
        });

        self.element.on('mouseenter mouseleave', 'li', function(e) {
            $(this).toggleClass('selected', e.type === 'mouseenter');
        });

        $(document).on('click', function(e) {
            if (is)
                self.visible(false);
        });
    };

    function keydown(e) {
        var c = e.keyCode;
        var input = this;

        if (c !== 38 && c !== 40 && c !== 13) {
            if (c !== 8 && c < 32)
                return;
            clearTimeout(searchtimeout);
            searchtimeout = setTimeout(function() {
                var val = input.value;
                if (!val || searchvalue === val)
                    return;
                searchvalue = val;
                onSearch(val, function(value) { self.render(value); });
            }, 200);
            return;
        }

        var current = self.element.find('.selected');

        if (c === 13) {
            self.visible(false);
            if (!current.length)
                return;
            onCallback(datasource[+current.attr('data-index')], old);
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.length) {
            current.removeClass('selected');
            current = c === 40 ? current.next() : current.prev();
        }

        if (!current.length)
            current = self.element.find('li:{0}-child'.format(c === 40 ? 'first' : 'last'));
        current.addClass('selected');
    }

    function blur() {
        clearTimeout(blurtimeout);
        blurtimeout = setTimeout(function() {
            self.visible(false);
        }, 300);
    }

    self.visible = function(visible) {
        clearTimeout(blurtimeout);
        self.element.toggleClass('hidden', !visible);
        is = visible;
    };

    self.attach = function(input, search, callback, top, left, width) {

        clearTimeout(searchtimeout);

        if (input.setter)
            input = input.find('input');
        else
            input = $(input);

        if (old) {
            old.removeAttr('autocomplete');
            old.off('blur', blur);
            old.off('keydown', keydown);
        }

        input.on('keydown', keydown);
        input.on('blur', blur);
        input.attr({ 'autocomplete': 'off' });

        old = input;

        var offset = input.offset();
        offset.top += input.height();
        offset.width = input.width();

        if (left)
            offset.left += left;
        if (top)
            offset.top += top;
        if (width)
            offset.width += width;

        self.element.css(offset);
        self.refresh();
        input.focus();
        searchvalue = '';
        onSearch = search;
        onCallback = callback;
        self.visible(false);
    };

    self.render = function(arr) {

        datasource = arr;

        if (!arr || !arr.length) {
            self.visible(false);
            return;
        }

        var builder = [];
        for (var i = 0, length = arr.length; i < length; i++) {
            var obj = arr[i];
            obj.index = i;
            builder.push(self.template(obj));
        }

        container.empty().append(builder.join(''));
        self.visible(true);
    };
});