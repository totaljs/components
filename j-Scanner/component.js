COMPONENT('scanner', function(self, config, cls) {

    var cls2 = '.' + cls;
    var constraints = { video: { facingMode: 'environment' }, audio: false };
    var bottomspace = WH > 620 ? '40px' : '10px';
    var canvas;
    var stream;
    var video;
    var close;
    var shoot;
    var photo;
    var streaming = false;
    var ctx;
    var mask;
    var wrapper;
    var skip = false;
    var bigphoto;
    var accept;
    var discard;

    // points = [left+right, top+bottom]
    var points = [40, 20]; // in %

    self.make = function() {
        self.aclass('hidden ' + cls);
        self.html('<div class="{0}-wrapper"><video class="{0}-video" playsinline autoplay ></video><canvas class="{0}-canvas" style="position:absolute;left:0;top:0;right:0;bottom:0"></canvas><div class="{0}-mask"><div class="{0}-animation"></div><div class="corner topleft"></div><div class="corner topright"></div><div class="corner bottomleft"></div><div class="corner bottomright"></div></div></div><img class="{0}-bigphoto" alt="bigscreen" /><button class="{0}-close"><i class="fal fa-times-circle"></i></button><div class="{0}-btn {0}-discard"><i class="fal fa-times"></i></div><div class="{0}-btn {0}-accept"><i class="fal fa-check"></i></div><button class="{0}-shoot"></button>'.format(cls));

        video = self.find(cls2 + '-video');
        canvas = self.find(cls2 + '-canvas');
        close = self.find(cls2 + '-close');
        shoot = self.find(cls2 + '-shoot');
        photo = self.find(cls2 + '-photo');
        mask = self.find(cls2 + '-mask');
        wrapper = self.find(cls2 + '-wrapper');
        bigphoto = self.find(cls2 + '-bigphoto');
        accept = self.find(cls2 + '-accept');
        discard = self.find(cls2 + '-discard');

        photo.aclass('hidden');
        bigphoto.aclass('hidden');
        ctx = canvas[0].getContext('2d');

        close.on('click', function() {
            self.close();
        });

        photo.on('click', function() {
            var picwidth = mask.width() + 'px';
            console.log(picwidth);
            photo.css('width', picwidth);
            photo.css('scale', 1);
        });

        accept.on('click', function() {
            self.accept();
        });

        discard.on('click', function() {
            self.discard();
        });
    };

    var render = function() {
        if (streaming) {
            var c = canvas[0];
            c.width = WW;
            c.height = wrapper.height();
            ctx.drawImage(video[0], 0, 0, c.width, c.height);
            ctx.beginPath();
            var lr = (((c.width / 100) * points[0]) / 2) >> 0;
            var tb = (((c.height / 100) * points[1]) / 2) >> 0;

            if (!skip) {
                canvas.css({'height' : c.height + 'px', 'width' : c.width + 'px' });
                mask.css('inset', '{0} {1}'.format(tb + 'px', lr + 'px'));
                skip = true;
            }

            requestAnimationFrame(render);
        }
    };

    self.show = function(opt) {
        self.opt = opt;
        self.rclass('hidden');

        navigator.mediaDevices.getUserMedia(constraints).then(function(response) {
            stream = response;
            video[0].srcObject = stream;
            video[0].play();

            video.on('canplay', function() {
                if (!streaming) {
                    canvas.attr({ width: video[0].videoWidth, height: video[0].videoHeight });
                    streaming = true;
                    self.clear();
                    render();
                }
            });

            shoot.on('click', function() {
                self.shoot();
            });

            self.clear();

        }).catch(function(err) {
            console.log(err);
        });
    };

    self.close = function() {
        stream.getTracks().forEach(function(track) {
            track.stop();
            self.element.aclass('hidden');
            photo.aclass('hidden');
            bigphoto.aclass('hidden');
            mask.rclass('hidden');
            shoot.css({ 'opacity' : 1, 'bottom' : bottomspace });
            accept.rclass(cls + '-accept-open');
            discard.rclass(cls + '-discard-open');
        });
    };

    self.shoot = function() {
        photo.rclass('hidden');
        bigphoto.rclass('hidden');
        var c = canvas[0];
        var lr = (((c.width / 100) * points[0]) / 2) >> 0;
        var tb = (((c.height / 100) * points[1]) / 2) >> 0;
        var target = document.createElement('CANVAS');
        var ctxtmp = target.getContext('2d');
        target.width = c.width - lr * 2;
        target.height = c.height - tb * 2;
        ctxtmp.drawImage(c, -lr, -tb, c.width, c.height);
        var base64 = target.toDataURL('image/png');
        config.exec && self.SEEX(config.exec, base64);
        self.base64 = base64;
        bigphoto.attr('src', base64);
        bigphoto.css({ 'top' : tb, 'left' : lr });
        mask.aclass('hidden');
        shoot.css({ 'opacity' : 0, 'bottom' : '-100vh' });
        accept.aclass(cls + '-accept-open');
        discard.aclass(cls + '-discard-open');
    };

    self.discard = function() {
        shoot.css({ 'opacity' : 1, 'bottom' : bottomspace });
        accept.rclass(cls + '-accept-open');
        discard.rclass(cls + '-discard-open');
        bigphoto.aclass('hidden');
        mask.rclass('hidden');
    };

    self.accept = function() {
        self.opt.callback(self.base64);
    };

    self.clear = function() {
        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, canvas[0].width, canvas[0].height);
        var base64 = canvas[0].toDataURL('image/png');
        photo.attr('src', base64);
    };
});