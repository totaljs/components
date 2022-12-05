COMPONENT('table2', 'margin:0', function(self, config, cls) {

    var cls2 = '.' + cls;
    var table;
    var columns;
    var headers = [];
    var colconfigs = [];
    var headerrow = $('<tr class="{0}-header"></tr>'.format(cls));
    var height = self.parent().height() - config.margin;

    self.make = function() {

        var data = self.get();

        self.aclass(cls + '-wrapper');

        self.element.wrapInner('<table class="{0}"></table>'.format(cls));

        table = self.find(cls2);
        columns = table.find('div[data-colconfig]').aclass('hidden');

        columns.each(function(i){
            var el = $(this);
            var settings = el.attrd('colconfig').parseConfig();
            colconfigs.push(settings);
            headers.push(el.html());
            el.remove();
        });

        for (var i = 0; i < headers.length; i++) {
            var clss = [];
            var c = colconfigs[i];
            var colheader = $('<th class="{0}-th" style="min-width:{2}px">{1}</th>'.format(cls, headers[i], colconfigs[i].width));

            if (c.align)
                clss.push(c.align);
            if (c.monospace)
                clss.push('monospace');
            if (c.bold)
                clss.push('bold');

            colheader.aclass(clss.join(' '));

            headerrow.append(colheader);
        }
        table.append(headerrow);

        for (var item of data) {
            var row = $('<tr class="{0}-tr" data-id="{1}"></tr>'.format(cls, item.id));

            for (var i = 0; i < headers.length; i++ ) {
                var clss = [];
                var c = colconfigs[i];
                var width = c.width + 'px' || '100px';
                var value = item[c.value];

                if (c.align)
                    clss.push(c.align);
                if (c.monospace)
                    clss.push('monospace');
                if (c.bold)
                    clss.push('bold');

                row.append('<td class="{0}-td {3}" style="min-width:{1}">{2}</td>'.format(cls,width, value, clss.join(' ')));

            }
            table.append(row);
        }

        self.event('click', cls2 + '-tr', function() {
            EXEC(config.click, $(this).attrd('id'));
        });

        self.css('height', height);

    };

});