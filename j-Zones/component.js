COMPONENT('mapzones', 'height:200;zoom:13;color:#fcba03;modify:1', function(self, config, cls) {

  var meta = { points: [], zoom: config.zoom, color: config.color };
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
    self.append('<div></div>');
    meta.container = self.find('div')[0];

    if (config.height > 0)
      $(meta.container).css('height', config.height);

    var extent = new ol.proj.get('EPSG:3857').getExtent().slice();
    extent[0] += extent[0];
    extent[2] += extent[2];

    meta.view = new ol.View({
      center: [0,0],
      zoom: meta.zoom ? meta.zoom : config.zoom,
      extent
    });

    meta.map = new ol.Map({
      layers: [new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
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
    var height = config.height;

    if (typeof(height) === 'string')
      height = self.parent(config.height).height();

    if (meta.height !== height) {
      meta.height = height;
      $(meta.container).css('height', height);
    }
  };

  self.modify = function() {
    meta.modify = new ol.interaction.Modify({
      source: meta.source,
      deleteCondition: function(e) { 
        return ol.events.condition.shiftKeyOnly(e) && ol.events.condition.singleClick(e) 
      }
    });

    meta.map.addInteraction(meta.modify);

    meta.modify.on('modifyend', function(e) {
      coords(e.features.item(0));
      meta.zoom = meta.map.getView().getZoom();
    }, this);
  };

  self.draw = function() {
    meta.draw = new ol.interaction.Draw({
      source: meta.source,
      type: 'Polygon',
      style: meta.style
    });

    meta.map.addInteraction(meta.draw);

    meta.draw.on('drawend', function(e) {
      meta.map.removeInteraction(meta.draw);
      meta.zoom = meta.map.getView().getZoom();
      coords(e.feature);
    }, this);

    meta.draw.on('drawstart', function(e) {
      meta.geolocation.setTracking(false);
      meta.source.removeFeature(meta.positionFeature);
    });
  };

  self.center = function() {
    var feature = meta.source.getFeatures()[0];
    var polygon = feature.getGeometry();
    meta.view.fit(polygon, {padding: [170, 50, 30, 150]});

    meta.map.getView().animate({
      zoom: meta.zoom,
      duration: 250
    });
  };

  self.centergeolocation = function() {
    meta.positionFeature.once('change', function() {
      var feature = meta.source.getFeatures()[0];
      var point = feature.getGeometry();
      meta.view.fit(point, {padding: [170, 50, 30, 150], minResolution: 50});
    });
  };

  self.parse = function(value) {

    for (var i = 0; i < value.length; i++) {
      var item = value[i];
      var tmp = item.split(',');
      meta.points.push(ol.proj.transform([tmp[1], tmp[0] ], 'EPSG:4326', 'EPSG:3857'));
    }

    meta.source = new ol.source.Vector({});
    
    meta.feature = new ol.Feature({
      geometry: new ol.geom.Polygon([meta.points])
    });

    meta.source.addFeature(meta.feature);

    meta.polygon = new ol.layer.Vector({
      source: meta.source,
      style: meta.style
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
          fill: new ol.style.Fill({
            color: meta.color ? meta.color : config.color
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
          })
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

    var wkt  = format.writeGeometry(p.transform(ol.proj.get('EPSG:3857'),ol.proj.get('EPSG:4326')));
    p.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

    parsecoords(wkt);
  };

  var parsecoords = function(wkt) {

    var arr = [];
    var tmp = wkt.replace('POLYGON((', '').replace('))', '').split(',');

    for (var i = 0; i < tmp.length; i++) {
      var item = tmp[i];
      var tmpitem = item.split(' ');

      tmpitem[0] = +tmpitem[0];
      tmpitem[1] = +tmpitem[1];

      tmpitem.reverse();
      arr.push(tmpitem.join());
    }

    skip = true;

    var obj = { zoom: meta.zoom, points: arr };

    self.set(obj);
  };

  self.setstyle = function() {
    meta.style = {
      'fill-color': meta.color ? meta.color + '20' : config.color + '20',
      'stroke-color': meta.color ? meta.color : config.color,
      'stroke-width': 2,
      'circle-radius': 7,
      'circle-fill-color': meta.color ? meta.color : config.color,
    }

    return meta.style;
  };

  self.setter = function(value) {
    if (skip) {
      skip = false;
      return;
    }

    meta.color = value.color ? value.color : config.color;
    meta.zoom = value.zoom ? value.zoom : config.zoom;
    self.setstyle();

    if (value && value.items && value.items.length) {
      var polygon = self.parse(value.items);
      meta.map.addLayer(polygon);
      self.center();
    } else {
      var position = self.geolocation();
      meta.map.addLayer(position);
      self.centergeolocation();
      meta.geolocation.setTracking(true);
      self.draw();
    }

    config.modify && self.modify();

  };

}, ['https://cdn.jsdelivr.net/npm/ol@v7.3.0/dist/ol.js', 'https://cdn.jsdelivr.net/npm/ol@v7.3.0/ol.css']);