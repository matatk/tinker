(function() {
	"use strict";
	var OffsetGetter = (function() {
		function OffsetGetter() {
			// Nothing to see here; move along.
		}

		OffsetGetter.prototype.get = function() {
			// Get the JSON time zone offset data
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "time-zone-offsets.json", false);
			xhr.send();
			if( xhr.status === 200 ) {
				return JSON.parse(xhr.responseText);
			} else {
				alert("There was an error loading the time zone data; sorry!");
				return {};
			}
		};

		return OffsetGetter;
	})();

	var SimpleTimezone = (function() {
		function SimpleTimezone(offsets) {
			this._offsets = offsets;
		}

		SimpleTimezone.prototype.matching_time_zones = function(str) {
			var out = {};
			var find = str.toLowerCase();
			for( var tz_id in this._offsets ) {
				var tz_record = this._offsets[tz_id];
				for( var property in tz_record ) {
					if( typeof(tz_record[property]) === 'string' &&
					tz_record[property].toLowerCase().indexOf(find) !== -1 ) {
						out[tz_id] = tz_record;
						break;  // no need to search further within this zone
					}
				}
			}
			return out;
		};

		SimpleTimezone.prototype.local_to_utc = function(tz, hour) {
			return hour - this._offsets[tz].offset;
		};

		return SimpleTimezone;
	})();

	this['SimpleTimezone'] = new SimpleTimezone(new OffsetGetter().get());
}).call(this);
