COMPONENT('markdowneditor', function (self, config) {

    var input, editor, content;

    self.validate = function (value) {
        if (!config.required)
            return true;

        if (value == null)
            value = '';
        else
            value = value.toString();

        return value.length > 0;
    };

    self.state = function (type) {
        if (!type)
            return;

        var invalid = config.required ? self.isInvalid() : false;
        if (invalid === self.$oldstate)
            return;

        self.$oldstate = invalid;
        self.find('.CodeMirror-wrap').tclass('ui-markdown-editor-invalid', invalid);
    };

    self.redraw = function () {
        var label = config.label || content;
        var builder = [];

        if (label)
            if (config && config.required)
                builder.push(`<div class="ui-markdown-editor-label ui-markdown-editor-label-required"><i class="fa fa-pencil"></i>${label}:</div>`);
            else
                builder.push(`<div class="ui-markdown-editor-label">${label}:</div>`);

        builder.push('<textarea></textarea>');

        self.html('<div>' + builder.join('') + '</div>');

        input = self.find('textarea')[0];
        editor = new SimpleMDE({element: input});
        editor.codemirror.on('change', function () {
            self.set(self.path, editor.value(), 3);
            self.change(true);
        });
    };

    self.make = function () {
        content = self.html();

        self.redraw();
    };

    self.setter = function (value, path, type) {
        if (type !== 3)
            editor.value(value || '');
    };

}, ['https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js', 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css']);