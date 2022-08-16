COMPONENT('locale', function(self, config) {

	self.singleton();
	self.nocompile();
	self.readonly();

	self.use = function(language) {

		if (!language)
			return;

		var fdw = 0; // First day of week  : 0 sunday, 1 monday, 5 friday, 6 saturday
		var nf = 1;  // Number format      : 1 == 100 000.123, 2 == 100 000,123, 3 == 100.000,123, 4 == 100,000.123
		var tf = 24; // Time format        : 12, 24
		var df = ''; // Date format        : yyyy-MM-dd

		// fdw = First day of week
		// nf  = Number format
		// tf  = Time format
		// df  = Date format

		switch (language) {

			case 'af':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'sq':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ar':
				nf = 4;
				df = 'yyyy/MM/dd';
				tf = 24;
				fdw = 6;
				break;

			case 'ar-dz':
				nf = 3;
				df = 'dd/yyyy/MM';
				tf = 24;
				fdw = 1;
				break;

			case 'ar-kw':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 6;
				break;

			case 'ar-ly':
				nf = 3;
				df = 'dd/yyyy/MM';
				tf = 24;
				fdw = 6;
				break;

			case 'ar-ma':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ar-sa':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'ar-tn':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'hy-am':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'az':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'bm':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'eu':
				nf = 3;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 1;
				break;

			case 'be':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'bn':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'bn-bd':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'bs':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'br':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'bg':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'my':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'km':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'ca':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;


			case 'tzm':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 6;
				break;

			case 'tzm-latn':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 6;
				break;

			case 'zh-cn':
				nf = 4;
				df = 'yyyy/MM/dd';
				tf = 24;
				fdw = 0;
				break;

			case 'zh-hk':
				nf = 4;
				df = 'yyyy/MM/dd';
				tf = 24;
				fdw = 0;
				break;

			case 'zh-mo':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'zh-tw':
				nf = 4;
				df = 'yyyy/MM/dd';
				tf = 24;
				fdw = 0;
				break;

			case 'cv':
				nf = 2;
				df = 'dd-MM-yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'hr':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'cs':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'da':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'nl':
				nf = 3;
				df = 'dd-MM-yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'nl-be':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'en-au':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'en-ca':
				nf = 4;
				df = 'yyyy-MM-dd';
				tf = 12;
				fdw = 0;
				break;

			case 'en-in':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'en-ie':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'en-il':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'en-nz':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 1;
				break;

			case 'en-sg':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'en-gb':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'en':
				nf = 4;
				df = 'MM/dd/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'eo':
				nf = 2;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 1;
				break;

			case 'et':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'fo':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'fil':
				nf = 4;
				df = 'MM/dd/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'fi':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'fr':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'fr-ca':
				nf = 4;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 0;
				break;

			case 'fr-ch':
				nf = 1;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'fy':
				nf = 3;
				df = 'dd-MM-yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'gl':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ka':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'de':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'de-at':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'de-ch':
				nf = 1;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'el':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 1;
				break;

			case 'gu':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'he':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'hi':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'hu':
				nf = 2;
				df = 'yyyy.MM.dd';
				tf = 24;
				fdw = 1;
				break;

			case 'is':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'id':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'ga':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'it':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'it-ch':
				nf = 1;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ja':
				nf = 4;
				df = 'yyyy/MM/dd';
				tf = 24;
				fdw = 0;
				break;

			case 'jv':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'kn':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'kk':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'tlh':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'gom-deva':
				nf = 4;
				df = 'dd-MM-yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'gom-latn':
				nf = 4;
				df = 'dd-MM-yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'ko':
				nf = 4;
				df = 'yyyy.MM.dd';
				tf = 12;
				fdw = 0;
				break;

			case 'ku':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 6;
				break;

			case 'ky':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'lo':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'lv':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'lt':
				nf = 2;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 1;
				break;

			case 'lb':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'mk':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ms-my':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ms':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ml':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'dv':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 5;
				break;

			case 'mt':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'mi':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'mr':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'mn':
				nf = 4;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 1;
				break;

			case 'me':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ne':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'se':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'nb':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'nn':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'oc-lnc':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'fa':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 6;
				break;

			case 'pl':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'pt':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'pt-br':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'x-pseudo':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 1;
				break;

			case 'pa-in':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'ro':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ru':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'gd':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'sr':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'sr-cyrl':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'sd':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'si':
				nf = 4;
				df = 'yyyy/MM/dd';
				tf = 12;
				fdw = 1;
				break;

			case 'sk':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'sl':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'es':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'es-do':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'es-mx':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'es-us':
				nf = 4;
				df = 'MM/dd/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'sw':
				nf = 4;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'sv':
				nf = 2;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 1;
				break;

			case 'tl-ph':
				nf = 4;
				df = 'MM/dd/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'tg':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'tzl':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ta':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'te':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'tet':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'th':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'bo':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 0;
				break;

			case 'tr':
				nf = 3;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'tk':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'uk':
				nf = 2;
				df = 'dd.MM.yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'ur':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 0;
				break;

			case 'ug-cn':
				nf = 4;
				df = 'yyyy-MM-dd';
				tf = 24;
				fdw = 0;
				break;

			case 'uz':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'uz-latn':
				nf = 2;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'vi':
				nf = 3;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'cy':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 24;
				fdw = 1;
				break;

			case 'yo':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 1;
				break;

			case 'ss':
				nf = 4;
				df = 'dd/MM/yyyy';
				tf = 12;
				fdw = 1;
				break;
		}

		if (!df)
			return false;

		DEF.dateformat = df;
		DEF.timeformat = tf === 12 ? '!HH:mm a' : 'HH:mm';
		DEF.firtdayofweek = fdw;
		DEF.decimalseparator = nf === 2 || nf === 3 ? ',' : '.';
		DEF.thousandsseparator = nf === 4 ? ',' : nf === 3 ? '.' : ' ';

		ENV('ts', (tf === 12 ? '!' : '') + df + ' - ' + (tf === 12 ? DEF.timeformat.substring(1) : DEF.timeformat));
		ENV('date', DEF.dateformat);
		ENV('time', DEF.timeformat);
		CONFIG('datepicker,firstday', 'firstday:' + fdw);
		CONFIG('timepicker', 'ampm:' + tf === 12 ? 'true' : 'false');

		self.path && self.set({ df: df, tf: tf, fdw: fdw, nf: nf });
		return true;
	};

	self.make = function() {

		var language = navigator.language.toLowerCase();
		if (config.language)
			self.use(config.language);
		else if (!self.use(language))
			self.use(language.split('-')[0]);

	};

});