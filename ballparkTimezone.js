/**
 * All this does is add a Date.getTimezone() which makes
 *  a guess at the timezone.  That's all.  Uses [some] Olson
 *  zone data.  Works mostly.
 */
(function(Date) {
	//  "OFFSET:DST_AMOUNT:DST_START": "TIMEZONE_ID
	var timezones = {
		"Pacific/Midway": { offset: -39600, savings: 0, savingsStart: 0 },
		"America/Adak": { offset: -36000, savings: 3600, savingsStart: 1331467200 },
		"Pacific/Honolulu": { offset: -36000, savings: 0, savingsStart: 0 },
		"Pacific/Marquesas": { offset: -34200, savings: 0, savingsStart: 0 },
		"America/Juneau": { offset: -32400, savings: 3600, savingsStart: 1331463600 },
		"Pacific/Gambier": { offset: -32400, savings: 0, savingsStart: 0 },
		"America/Santa_Isabel": { offset: -28800, savings: 3600, savingsStart: 1333274400 },
		"America/Los_Angeles": { offset: -28800, savings: 3600, savingsStart: 1331460000 },
		"America/Metlakatla": { offset: -28800, savings: 0, savingsStart: 0 },
		"America/Chihuahua": { offset: -25200, savings: 3600, savingsStart: 1333270800 },
		"America/Denver": { offset: -25200, savings: 3600, savingsStart: 1331456400 },
		"America/Phoenix": { offset: -25200, savings: 0, savingsStart: 0 },
		"America/Mexico_City": { offset: -21600, savings: 3600, savingsStart: 1333267200 },
		"America/Chicago": { offset: -21600, savings: 3600, savingsStart: 1331452800 },
		"America/Guatemala": { offset: -21600, savings: 0, savingsStart: 0 },
		"America/New_York": { offset: -18000, savings: 3600, savingsStart: 1331449200 },
		"America/Havana": { offset: -18000, savings: 3600, savingsStart: 1331442000 },
		"America/Cayman": { offset: -18000, savings: 0, savingsStart: 0 },
		"Pacific/Easter": { offset: -18000, savings: -3600, savingsStart: 1331434800 },
		"America/Caracas": { offset: -16200, savings: 0, savingsStart: 0 },
		"Atlantic/Bermuda": { offset: -14400, savings: 3600, savingsStart: 1331445600 },
		"America/Puerto_Rico": { offset: -14400, savings: 0, savingsStart: 0 },
		"America/St_Johns": { offset: -12600, savings: 3600, savingsStart: 1331443800 },
		"America/Godthab": { offset: -10800, savings: 3600, savingsStart: 1332637200 },
		"America/Miquelon": { offset: -10800, savings: 3600, savingsStart: 1331442000 },
		"America/Fortaleza": { offset: -10800, savings: 0, savingsStart: 0 },
		"Atlantic/Stanley": { offset: -10800, savings: -3600, savingsStart: 1334466000 },
		"America/Asuncion": { offset: -10800, savings: -3600, savingsStart: 1333854000 },
		"America/Santiago": { offset: -10800, savings: -3600, savingsStart: 1331434800 },
		"America/Campo_Grande": { offset: -10800, savings: -3600, savingsStart: 1330225200 },
		"America/Noronha": { offset: -7200, savings: 0, savingsStart: 0 },
		"America/Montevideo": { offset: -7200, savings: -3600, savingsStart: 1331438400 },
		"America/Bahia": { offset: -7200, savings: -3600, savingsStart: 1330221600 },
		"America/Scoresbysund": { offset: -3600, savings: 3600, savingsStart: 1332637200 },
		"Atlantic/Cape_Verde": { offset: -3600, savings: 0, savingsStart: 0 },
		"UTC": { offset: 0, savings: 0, savingsStart: 0 },
		"Europe/London": { offset: 0, savings: 3600, savingsStart: 1332637200 },
		"Africa/Algiers": { offset: 3600, savings: 0, savingsStart: 0 },
		"Europe/Stockholm": { offset: 3600, savings: 3600, savingsStart: 1332637200 },
		"Africa/Windhoek": { offset: 7200, savings: -3600, savingsStart: 1333238400 },
		"Africa/Cairo": { offset: 7200, savings: 0, savingsStart: 0 },
		"Asia/Beirut": { offset: 7200, savings: 3600, savingsStart: 1332626400 },
		"Europe/Kiev": { offset: 7200, savings: 3600, savingsStart: 1332637200 },
		"Asia/Amman": { offset: 7200, savings: 3600, savingsStart: 1333058400 },
		"Asia/Jerusalem": { offset: 7200, savings: 3600, savingsStart: 1333065600 },
		"Asia/Damascus": { offset: 7200, savings: 3600, savingsStart: 1333663200 },
		"Africa/Nairobi": { offset: 10800, savings: 0, savingsStart: 0 },
		"Asia/Tehran": { offset: 12600, savings: 3600, savingsStart: 1332275400 },
		"Asia/Dubai": { offset: 14400, savings: 0, savingsStart: 0 },
		"Asia/Yerevan": { offset: 14400, savings: 3600, savingsStart: 1332626400 },
		"Asia/Baku": { offset: 14400, savings: 3600, savingsStart: 1332633600 },
		"Asia/Kabul": { offset: 16200, savings: 0, savingsStart: 0 },
		"Asia/Karachi": { offset: 18000, savings: 0, savingsStart: 0 },
		"Asia/Colombo": { offset: 19800, savings: 0, savingsStart: 0 },
		"Asia/Kathmandu": { offset: 20700, savings: 0, savingsStart: 0 },
		"Asia/Dhaka": { offset: 21600, savings: 0, savingsStart: 0 },
		"Asia/Rangoon": { offset: 23400, savings: 0, savingsStart: 0 },
		"Asia/Bangkok": { offset: 25200, savings: 0, savingsStart: 0 },
		"Asia/Hong_Kong": { offset: 28800, savings: 0, savingsStart: 0 },
		"Australia/Eucla": { offset: 31500, savings: 0, savingsStart: 0 },
		"Asia/Tokyo": { offset: 32400, savings: 0, savingsStart: 0 },
		"Australia/Darwin": { offset: 34200, savings: 0, savingsStart: 0 },
		"Australia/Brisbane": { offset: 36000, savings: 0, savingsStart: 0 },
		"Australia/Broken_Hill": { offset: 37800, savings: -3600, savingsStart: 1333211400 },
		"Australia/Lord_Howe": { offset: 39600, savings: -1800, savingsStart: 1333206000 },
		"Australia/Sydney": { offset: 39600, savings: -3600, savingsStart: 1333209600 },
		"Pacific/Pohnpei": { offset: 39600, savings: 0, savingsStart: 0 },
		"Pacific/Norfolk": { offset: 41400, savings: 0, savingsStart: 0 },
		"Asia/Anadyr": { offset: 43200, savings: 0, savingsStart: 0 },
		"Pacific/Fiji": { offset: 46800, savings: -3600, savingsStart: 1327154400 },
		"Antarctica/South_Pole": { offset: 46800, savings: -3600, savingsStart: 1333202400 },
		"Pacific/Enderbury": { offset: 46800, savings: 0, savingsStart: 0 },
		"Pacific/Chatham": { offset: 49500, savings: -3600, savingsStart: 1333202400 },
		"Pacific/Apia": { offset: 50400, savings: -3600, savingsStart: 1333202400 },
		"Pacific/Kiritimati": { offset: 50400, savings: 0, savingsStart: 0 },
	};

	var getTimezoneOffset = function(timestamp) {
		var d = new Date();

		d.setTime(timestamp * 1000);

		return d.getTimezoneOffset() * -60;
	};

	Date.prototype.getTimezone = function() {
		var januaryTimezoneOffset = getTimezoneOffset(1388552400);
		var juneTimezoneOffset = getTimezoneOffset(1401595200);

		var savings = juneTimezoneOffset - januaryTimezoneOffset;

		for (var name in timezones) {
			if (timezones.hasOwnProperty(name)) {
				if (timezones[name].offset !== januaryTimezoneOffset) {
					continue;
				}

				if (timezones[name].savings !== savings) {
					continue;
				}

				if (timezones[name] === 0) {
					return name;
				}

				var beforeOffset = getTimezoneOffset(timezones[name].savingsStart - 1);
				var afterOffset = getTimezoneOffset(timezones[name].savingsStart);

				if (beforeOffset !== afterOffset) {
					return name;
				}
			}
		}

		return null;
	}
})(Date);
