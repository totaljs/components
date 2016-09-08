COMPONENT('map', function() {

    var self = this;
    self.readonly();

    self.prepare = function(lat, lng) {

        lat = lat.toString();
        lng = lng.toString();

        var max = function(val, num) {
            var index = val.indexOf('.');
            if (index === -1)
                return val;
            return val.substring(0, index + 1 + num);
        };

        return max(lat, 6) + ',' + max(lng, 6);
    };

    self.make = function() {
        var options = {};

        options.zoom = +(self.attr('data-zoom') || 13);
        options.scrollwheel = true;
        options.streetViewControl = false;
        options.mapTypeId = self.attr('data-type') || 'roadmap';

        self.map = new google.maps.Map(self.element.get(0), options);
        self.geo = new google.maps.Geocoder();

        options = { position: self.map.getCenter(), map: self.map }; // animation: google.maps.Animation.BOUNCE
        options.draggable = self.attr('data-draggable') === 'true';

        var tmp = self.attr('data-icon');
        if (tmp)
            options.icon = tmp;

        self.marker = new google.maps.Marker(options);

        google.maps.event.addListener(self.marker, 'click', function(e) {
            var fn = self.attr('data-click');
            fn && self.get(fn)(self.prepare(e.latLng.lat(), e.latLng.lng()));
        });

        if (!options.draggable)
            return;

        google.maps.event.addListener(self.marker, 'dragend', function(e) {
            self.set(self.prepare(e.latLng.lat(), e.latLng.lng()));
        });
    };

    self.search = function(lat, lng) {

        if (lng !== undefined) {
            var position = new google.maps.LatLng(lat, lng);
            self.map.setCenter(position);
            self.marker.setPosition(position);
            return self;
        }

        self.geo.geocode({ 'address': lat, 'partialmatch': true }, function(response, status) {
            if (status !== 'OK' || !response.length)
                return;
            var result = response[0].geometry;
            self.map.fitBounds(result.viewport);
            self.marker.setPosition(result.location);
        });

        return self;
    };

    self.setter = function(value) {

        if (!value)
            return;

        if (!value.replace(/\s/g, '').match(/^[0-9\.\,]+(\,|\;)?[0-9\.\,]+$/)) {
            self.search(value);
            return;
        }

        value = value.replace(/\s/g, '');

        var index = value.indexOf(';');
        if (index === -1)
            index = value.indexOf(',');
        if (index === -1)
            return;
        var lat = value.substring(0, index).parseFloat();
        var lng = value.substring(index + 1).parseFloat();
        self.search(lat, lng);
    };
});