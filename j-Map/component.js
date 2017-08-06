COMPONENT('map', function(self, config) {
	// TODO: more makers (array), methods for add maker, remove maker, change maker animation
	var animations = {};
	var W = window;
	var loaded = false;

	self.readonly();

	self.prepare = function(lat, lng) {

		lat = lat.toString();
		lng = lng.toString();

		var max = function(val, num) {
			var index = val.indexOf('.');
			return index === -1 ? val : val.substring(0, index + 1 + num);
		};

		return max(lat, 6) + ',' + max(lng, 6);
	};

	self.make = function() {

		// Waits for Google API
		WAIT(function() {
			return W.google;
		}, function() {

			animations.drop = W.google.maps.Animation.DROP;
			animations.bounce = W.google.maps.Animation.BOUNCE;

			var options = {};
			options.zoom = config.zoom || 13;
			options.scrollwheel = true;
			options.streetViewControl = false;
			options.mapTypeId = config.type || 'roadmap';

			self.map = new W.google.maps.Map(self.element.get(0), options);
			self.geo = new W.google.maps.Geocoder();

			options = { position: self.map.getCenter(), map: self.map };
			options.draggable = config.draggable || false;

			if (config.animation)
				options.animation = animations[config.animation];

			if (config.icon)
				options.icon = config.icon;

			self.marker = new W.google.maps.Marker(options);

			W.google.maps.event.addListener(self.marker, 'click', function(e) {
				var fn = config.click;
				fn && self.get(fn)(self.prepare(e.latLng.lat(), e.latLng.lng()));
			});

			if (!options.draggable)
				return;

			W.google.maps.event.addListener(self.marker, 'dragend', function(e) {
				self.set(self.prepare(e.latLng.lat(), e.latLng.lng()));
			});

			loaded = true;
			self.refresh();
		});
	};

	self.search = function(lat, lng) {

		if (!loaded)
			return;

		if (lng !== undefined) {
			var position = new W.google.maps.LatLng(lat, lng);
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

	self.reset = function(lat, lng) {

		if (!loaded)
			return;

		W.google.maps.event.trigger(self.map, 'resize');

		if(lng !== undefined){
			var position = new W.google.maps.LatLng(lat, lng);
			self.map.setCenter(position);
		}

		return self;
	};

	self.setter = function(value) {

		if (!value || !loaded)
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