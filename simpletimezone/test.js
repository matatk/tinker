test("Matching timezones by abbreviation or name", function() {
	var test_rec;
	for( var i = 0; i < test_matches.length; i++ ) {
		test_rec = test_matches[i];
		deepEqual(
			stz.matching_time_zones(test_rec.input),
			test_rec.matches,
			"Check " + Object.keys(test_rec.matches).length
				+ " expected matches for: '" + test_rec.input + "'."
		);
	}
});

test("UTC Offsets", function() {
	var test_rec;
	for( var i = 0; i < test_utc_offsets.length; i++ ) {
		test_rec = test_utc_offsets[i];
		equal(
			stz.local_to_utc(
				test_rec.timezone,
				test_rec.local
			),
			test_rec.utc,
			"The UTC time for " + test_rec.local + "hrs in " 
				+ test_rec.timezone + " should be " + test_rec.utc + "."
		);
	}
});
