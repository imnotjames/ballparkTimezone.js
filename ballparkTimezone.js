/**
 * All this does is add a Date.getTimezone() which makes
 *  a guess at the timezone.  That's all.  Uses [some] Olson
 *  zone data.  Works mostly.
 */
(function(Date) {
	//  "OFFSET:DST_AMOUNT:DST_START": "TIMEZONE_ID
	var timezones = {
		"-39600:0:0":"Pacific/Midway",
		"-36000:3600:1331467200":"America/Adak",
		"-36000:0:0":"Pacific/Honolulu",
		"-34200:0:0":"Pacific/Marquesas",
		"-32400:3600:1331463600":"America/Juneau",
		"-32400:0:0":"Pacific/Gambier",
		"-28800:3600:1333274400":"America/Santa_Isabel",
		"-28800:3600:1331460000":"America/Los_Angeles",
		"-28800:0:0":"America/Metlakatla",
		"-25200:3600:1333270800":"America/Chihuahua",
		"-25200:3600:1331456400":"America/Denver",
		"-25200:0:0":"America/Phoenix",
		"-21600:3600:1333267200":"America/Mexico_City",
		"-21600:3600:1331452800":"America/Chicago",
		"-21600:0:0":"America/Guatemala",
		"-18000:3600:1331449200":"America/New_York",
		"-18000:3600:1331442000":"America/Havana",
		"-18000:0:0":"America/Cayman",
		"-18000:-3600:1331434800":"Pacific/Easter",
		"-16200:0:0":"America/Caracas",
		"-14400:3600:1331445600":"Atlantic/Bermuda",
		"-14400:0:0":"America/Puerto_Rico",
		"-12600:3600:1331443800":"America/St_Johns",
		"-10800:3600:1332637200":"America/Godthab",
		"-10800:3600:1331442000":"America/Miquelon",
		"-10800:0:0":"America/Fortaleza",
		"-10800:-3600:1334466000":"Atlantic/Stanley",
		"-10800:-3600:1333854000":"America/Asuncion",
		"-10800:-3600:1331434800":"America/Santiago",
		"-10800:-3600:1330225200":"America/Campo_Grande",
		"-7200:0:0":"America/Noronha",
		"-7200:-3600:1331438400":"America/Montevideo",
		"-7200:-3600:1330221600":"America/Bahia",
		"-3600:3600:1332637200":"America/Scoresbysund",
		"-3600:0:0":"Atlantic/Cape_Verde",
		"0:0:0":"UTC",
		"0:3600:1332637200":"Europe/London",
		"3600:0:0":"Africa/Algiers",
		"3600:3600:1332637200":"Europe/Stockholm",
		"7200:-3600:1333238400":"Africa/Windhoek",
		"7200:0:0":"Africa/Cairo",
		"7200:3600:1332626400":"Asia/Beirut",
		"7200:3600:1332637200":"Europe/Kiev",
		"7200:3600:1333058400":"Asia/Amman",
		"7200:3600:1333065600":"Asia/Jerusalem",
		"7200:3600:1333663200":"Asia/Damascus",
		"10800:0:0":"Africa/Nairobi",
		"12600:3600:1332275400":"Asia/Tehran",
		"14400:0:0":"Asia/Dubai",
		"14400:3600:1332626400":"Asia/Yerevan",
		"14400:3600:1332633600":"Asia/Baku",
		"16200:0:0":"Asia/Kabul",
		"18000:0:0":"Asia/Karachi",
		"19800:0:0":"Asia/Colombo",
		"20700:0:0":"Asia/Kathmandu",
		"21600:0:0":"Asia/Dhaka",
		"23400:0:0":"Asia/Rangoon",
		"25200:0:0":"Asia/Bangkok",
		"28800:0:0":"Asia/Hong_Kong",
		"31500:0:0":"Australia/Eucla",
		"32400:0:0":"Asia/Tokyo",
		"34200:0:0":"Australia/Darwin",
		"36000:0:0":"Australia/Brisbane",
		"37800:-3600:1333211400":"Australia/Broken_Hill",
		"39600:-1800:1333206000":"Australia/Lord_Howe",
		"39600:-3600:1333209600":"Australia/Sydney",
		"39600:0:0":"Pacific/Pohnpei",
		"41400:0:0":"Pacific/Norfolk",
		"43200:0:0":"Asia/Anadyr",
		"46800:-3600:1327154400":"Pacific/Fiji",
		"46800:-3600:1333202400":"Antarctica/South_Pole",
		"46800:0:0":"Pacific/Enderbury",
		"49500:-3600:1333202400":"Pacific/Chatham",
		"50400:-3600:1333202400":"Pacific/Apia",
		"50400:0:0":"Pacific/Kiritimati",
	};

	var getTimezoneOffset = function(timestamp) {
		var d = new Date();

		d.setTime(timestamp * 1000);

		return d.getTimezoneOffset() * -60;
	};

	Date.prototype.getTimezone = function() {
		var januaryTimezoneOffset = getTimezoneOffset(1388552400);
		var juneTimezoneOffset = getTimezoneOffset(1401595200);

		var savingsOffset = juneTimezoneOffset - januaryTimezoneOffset;

		var tzKey = januaryTimezoneOffset + ':' + savingsOffset;

		for (var a in timezones) {
			if (timezones.hasOwnProperty(a)) {
				if (a.indexOf(tzKey) != 0)
					continue;

				var tzInfo = a.split(':');

				if (tzInfo[1] == 0)
					return timezones[a];

				var beforeOffset = getTimezoneOffset(parseInt(tzInfo[2]) - 1);
				var afterOffset = getTimezoneOffset(parseInt(tzInfo[2]));

				if (beforeOffset !== afterOffset)
					return timezones[a];
			}
		}

		return null;
	}
})(Date);
