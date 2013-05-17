// Cope with running either in-browser or on node
try {
	var exports = window
} catch(e) {
	//
}

// Matching zone information
exports.test_matches = [
	{
		input: "xyz",
		matches: {}
	},
	{
		input: "XYZ",
		matches: {}
	},
	{
		input: "pdt",
		matches: {
			"pdt-pacific-daylight-time-north-america": {
				"abbreviation": "PDT", 
				"name": "Pacific Daylight Time (North America)", 
				"offset": -7
			}, 
		}
	},
	{
		input: "PDT",
		matches: {
			"pdt-pacific-daylight-time-north-america": {
				"abbreviation": "PDT", 
				"name": "Pacific Daylight Time (North America)", 
				"offset": -7
			}, 
		}
	},
	{
		input: "gmt",
		matches: {
			"gmt-greenwich-mean-time": {
				"abbreviation": "GMT", 
				"name": "Greenwich Mean Time", 
				"offset": 0
			}, 
		}
	},
	{
		input: "GMT",
		matches: {
			"gmt-greenwich-mean-time": {
				"abbreviation": "GMT", 
				"name": "Greenwich Mean Time", 
				"offset": 0
			}, 
		}
	},
	{
		input: "est",
		matches: {
		    "aest-australian-eastern-standard-time": {
		        "abbreviation": "AEST", 
		        "name": "Australian Eastern Standard Time", 
		        "offset": 10
		    }, 
		    "awdt-australian-western-daylight-time": {
		        "abbreviation": "AWDT", 
		        "name": "Australian Western Daylight Time", 
		        "offset": 9
		    }, 
		    "awst-australian-western-standard-time": {
		        "abbreviation": "AWST", 
		        "name": "Australian Western Standard Time", 
		        "offset": 8
		    }, 
		    "cest-central-european-summer-time-cf-haec": {
		        "abbreviation": "CEST", 
		        "name": "Central European Summer Time (Cf. HAEC)", 
		        "offset": 2
		    }, 
		    "cwst-central-western-standard-time-australia": {
		        "abbreviation": "CWST", 
		        "name": "Central Western Standard Time (Australia)", 
		        "offset": 8.5
		    }, 
		    "eest-eastern-european-summer-time": {
		        "abbreviation": "EEST", 
		        "name": "Eastern European Summer Time", 
		        "offset": 3
		    }, 
		    "est-eastern-standard-time-australia": {
		        "abbreviation": "EST", 
		        "name": "Eastern Standard Time (Australia)", 
		        "offset": 10
		    }, 
		    "est-eastern-standard-time-north-america": {
		        "abbreviation": "EST", 
		        "name": "Eastern Standard Time (North America)", 
		        "offset": -5
		    }, 
		    "haec-heure-avancée-deurope-centrale-francised-name-for-cest": {
		        "abbreviation": "HAEC", 
		        "name": "Heure Avancée d'Europe Centrale francised name for CEST", 
		        "offset": 2
		    }, 
		    "mest-middle-european-saving-time-same-zone-as-cest": {
		        "abbreviation": "MEST", 
		        "name": "Middle European Saving Time Same zone as CEST", 
		        "offset": 2
		    }, 
		    "tlt-timor-leste-time": {
		        "abbreviation": "TLT", 
		        "name": "Timor Leste Time", 
		        "offset": 9
		    }, 
		    "wast-west-africa-summer-time": {
		        "abbreviation": "WAST", 
		        "name": "West Africa Summer Time", 
		        "offset": 2
		    }, 
		    "wat-west-africa-time": {
		        "abbreviation": "WAT", 
		        "name": "West Africa Time", 
		        "offset": 1
		    }, 
		    "wedt-western-european-daylight-time": {
		        "abbreviation": "WEDT", 
		        "name": "Western European Daylight Time", 
		        "offset": 1
		    }, 
		    "west-western-european-summer-time": {
		        "abbreviation": "WEST", 
		        "name": "Western European Summer Time", 
		        "offset": 1
		    }, 
		    "wet-western-european-time": {
		        "abbreviation": "WET", 
		        "name": "Western European Time", 
		        "offset": 0
		    }, 
		    "wst-western-standard-time": {
		        "abbreviation": "WST", 
		        "name": "Western Standard Time", 
		        "offset": 8
		    }, 
		}
	}
]


// UTC offsets; thanks to my colleague Anne Scallan for providing these
exports.test_utc_offsets = [
	{
		timezone: "est-eastern-standard-time-north-america",
		local: 8,
		utc: 13
	},
	{
		timezone: "est-eastern-standard-time-north-america",
		local: 9,
		utc: 14
	},
	{
		timezone: "est-eastern-standard-time-north-america",
		local: 10,
		utc: 15
	},
	{
		timezone: "est-eastern-standard-time-north-america",
		local: 11,
		utc: 16
	},
	{
		timezone: "est-eastern-standard-time-north-america",
		local: 12,
		utc: 17
	},

	{
		timezone: "cst-central-standard-time-north-america",
		local: 8,
		utc: 14
	},
	{
		timezone: "cst-central-standard-time-north-america",
		local: 9,
		utc: 15
	},
	{
		timezone: "cst-central-standard-time-north-america",
		local: 10,
		utc: 16
	},
	{
		timezone: "cst-central-standard-time-north-america",
		local: 11,
		utc: 17
	},
	{
		timezone: "cst-central-standard-time-north-america",
		local: 12,
		utc: 18
	},

	{
		timezone: "mst-mountain-standard-time-north-america",
		local: 8,
		utc: 15
	},
	{
		timezone: "mst-mountain-standard-time-north-america",
		local: 9,
		utc: 16
	},
	{
		timezone: "mst-mountain-standard-time-north-america",
		local: 10,
		utc: 17
	},
	{
		timezone: "mst-mountain-standard-time-north-america",
		local: 11,
		utc: 18
	},
	{
		timezone: "mst-mountain-standard-time-north-america",
		local: 12,
		utc: 19
	},

	{
		timezone: "pst-pacific-standard-time-north-america",
		local: 8,
		utc: 16
	},
	{
		timezone: "pst-pacific-standard-time-north-america",
		local: 9,
		utc: 17
	},
	{
		timezone: "pst-pacific-standard-time-north-america",
		local: 10,
		utc: 18
	},
	{
		timezone: "pst-pacific-standard-time-north-america",
		local: 11,
		utc: 19
	},
	{
		timezone: "pst-pacific-standard-time-north-america",
		local: 12,
		utc: 20
	}
];
