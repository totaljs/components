COMPONENT('markdowneditor', function (self) {

    var input, editor;

    self.setter = function (value, path, type) {
        if (type !== 3)
            editor.value(value || '');
    };

    self.make = function () {
        self.html('<textarea></textarea>');

        input = self.find('textarea')[0];
        editor = new SimpleMDE({ element: input });
        editor.codemirror.on('change', function () {
            self.set(self.path, editor.value(), 3);
        });
    };

}, ['https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js', 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css']);