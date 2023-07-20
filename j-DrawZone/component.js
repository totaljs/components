COMPONENT('drawzone', 'height:200;zoom:13;stroke:2;radius:7;color:#fcba03;readonly:0;opacity:40;margin:0;geolocation:1;latlng:48.73702477,19.137712', function(self, config, cls) {

	var meta = { points: [], zoom: config.zoom, color: config.color, layer: null };
	var skip = false;

	self.readonly();
	self.nocompile();

	self.meta = meta;

	self.destroy = function() {

		for (var m of meta.points)
			m.remove();

		meta.map.remove();
		meta.points = null;
		meta.map = null;
		meta.polygon = null;
		meta.source = null;
		meta.view = null;
	};

	self.make = function() {

		self.aclass(cls);
		self.append('<div style="height:{height}px"></div>'.args(config));

		meta.container = self.find('div')[0];

		var extent = new ol.proj.get('EPSG:3857').getExtent().slice();
		extent[0] += extent[0];
		extent[2] += extent[2];

		meta.view = new ol.View({
			center: [0,0],
			zoom: meta.zoom ? meta.zoom : config.zoom,
			extent
		});

		meta.map = new ol.Map({
			layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
			target: meta.container,
			view: meta.view
		});

		self.on('resize + resize2', self.resize);
		self.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {

		var container = $(meta.container);
		var height = config.height;

		if (config.parent) {
			var parent = self.parent(config.parent);
			var tmp = parent.height() - config.margin;
			if (height < tmp)
				height = tmp;
		}

		container.css('height', height);
	};

	self.modify = function() {

		meta.modify && meta.map.removeInteraction(meta.modify);
		meta.modify = null;

		if (config.readonly)
			return;

		meta.modify = new ol.interaction.Modify({
			source: meta.source,
			deleteCondition: function(e) {
				return ol.events.condition.doubleClick(e)
			}
		});

		meta.map.addInteraction(meta.modify);

		meta.modify.on('modifyend', function(e) {
			coords(e.features.item(0));
			meta.zoom = meta.map.getView().getZoom();
		});

	};

	self.draw = function() {

		meta.draw && meta.map.removeInteraction(meta.draw);
		meta.draw = null;

		if (config.readonly)
			return;

		meta.draw = new ol.interaction.Draw({
			source: meta.source,
			type: 'Polygon',
			style: meta.style
		});

		meta.map.addInteraction(meta.draw);

		meta.draw.on('drawend', function(e) {
			meta.map.removeInteraction(meta.draw);
			meta.zoom = meta.map.getView().getZoom();
			meta.draw = null;
			coords(e.feature);
		});

		meta.draw.on('drawstart', function(e) {
			meta.geolocation && meta.geolocation.setTracking(false);
			meta.source.removeFeature(meta.positionFeature);
		});
	};

	self.center = function() {
		var feature = meta.source.getFeatures()[0];
		var polygon = feature.getGeometry();
		meta.view.fit(polygon, { padding: [170, 50, 30, 150] });
		meta.map.getView().animate({ zoom: meta.zoom, duration: 250 });
	};

	self.centergeolocation = function() {
		meta.positionFeature.once('change', function() {
			var feature = meta.source.getFeatures()[0];
			var point = feature.getGeometry();
			meta.view.fit(point, { padding: [170, 50, 30, 150], minResolution: 50 });
		});
	};

	self.parsepolygon = function(value) {

		for (var point of meta.points)
			point.remove();

		meta.points = [];
		meta.feature && meta.source.removeFeature(meta.feature);

		for (var item of value)
			meta.points.push(ol.proj.transform([item.lng, item.lat], 'EPSG:4326', 'EPSG:3857'));

		meta.source = new ol.source.Vector({});

		meta.feature = new ol.Feature({
			geometry: new ol.geom.Polygon([meta.points])
		});

		meta.source.addFeature(meta.feature);

		meta.polygon = new ol.layer.Vector({
			source: meta.source,
			style: [
				meta.style,
				new ol.style.Style({ image: new ol.style.Circle({ radius: config.radius, fill: new ol.style.Fill({ color: meta.color })}), geometry: function (feature) {
					const coordinates = feature.getGeometry().getCoordinates()[0];
					return new ol.geom.MultiPoint(coordinates);
				}})
			]
		});

		return meta.polygon;
	};

	self.geolocation = function() {

		meta.source = new ol.source.Vector({});

		meta.geolocation = new ol.Geolocation({
			trackingOptions: {
				enableHighAccuracy: true
			},
			projection: meta.view.getProjection()
		});

		meta.accuracyFeature = new ol.Feature();

		meta.geolocation.on('change:accuracyGeometry', function() {
			meta.accuracyFeature.setGeometry(meta.geolocation.getAccuracyGeometry());
		});

		meta.positionFeature = new ol.Feature();

		meta.positionFeature.setStyle(
			new ol.style.Style({
				image: new ol.style.Circle({
					radius: 6,
					fill: new ol.style.Fill({ color: meta.color ? meta.color : config.color }),
					stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
				})
			})
		);

		meta.geolocation.on('change:position', function() {
			var coords = meta.geolocation.getPosition();
			meta.positionFeature.setGeometry(coords ? new ol.geom.Point(coords) : null);
		});

		meta.source.addFeature(meta.positionFeature);

		meta.position = new ol.layer.Vector({
			source: meta.source,
			style: meta.style
		});

		return meta.position;
	};

	var coords = function(feature) {
		var p = feature.getGeometry();
		var format = new ol.format.WKT();
		var wkt = format.writeGeometry(p.transform(ol.proj.get('EPSG:3857'), ol.proj.get('EPSG:4326')));
		var center = ol.extent.getCenter((p.getExtent()));
		p.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

		var arr = [];
		var tmp = wkt.replace('POLYGON((', '').replace('))', '').split(',');

		for (var item of tmp) {
			var tmpitem = item.split(' ');
			var latlng = {};
			latlng.lat = +tmpitem[1];
			latlng.lng = +tmpitem[0];
			arr.push(latlng);
		}

		skip = true;

		var obj = self.get() || {};
		obj.zoom = meta.zoom;
		obj.color = meta.color;
		obj.points = arr;
		obj.center = { lat: center[1], lng: center[0] };

		self.clear();
		meta.map.addLayer(self.parsepolygon(arr));
		self.set(obj);

		if (!config.readonly)
			self.modify();
	};

	self.setstyle = function() {
		var color = meta.color || config.color;
		meta.style = {
			'fill-color': color + config.opacity,
			'stroke-color': color,
			'stroke-width': config.stroke,
			'circle-radius': config.radius,
			'circle-fill-color': color,
		};
	};

	self.clear = function(draw) {
		var layers = meta.map.getAllLayers();
		for (var i = 1; i < layers.length; i++)
			meta.map.removeLayer(layers[i]);

		meta.draw && meta.map.removeInteraction(meta.draw);
		meta.draw = null;
		draw && self.draw();
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		var color = config.color;
		var zoom = config.zoom;

		if (value) {
			if (value.color)
				color = value.color;
			if (value.zoom)
				zoom = value.zoom;
		}

		meta.color = color;
		meta.zoom = zoom;

		self.setstyle();
		self.clear();

		var position;
		var polygon;

		if (!value)
			value = { points: [] };

		if (value.zoom)
			meta.zoom = value.zoom;

		if (value.color)
			meta.color = value.color;

		if (value.points && value.points.length) {

			polygon = self.parsepolygon(value.points);
			meta.map.addLayer(polygon);
			self.center();

		} else {

			position = self.geolocation();
			meta.map.addLayer(position);
			self.centergeolocation();

			var arr = config.latlng.split(',');

			meta.map.getView().setCenter(ol.proj.fromLonLat([+arr[1], +arr[0]], 'EPSG:3857'));
			meta.map.getView().setZoom(meta.zoom);

			config.geolocation && meta.geolocation.setTracking(true);
			self.draw();
		}

		if (!config.readonly)
			self.modify();

	};

}, ['https://cdn.jsdelivr.net/npm/ol@v7.3.0/dist/ol.js', 'https://cdn.jsdelivr.net/npm/ol@v7.3.0/ol.css']);