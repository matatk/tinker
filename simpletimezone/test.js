test("UTC Offsets", function() {
	var test_rec;
	for( var i = 0; i < test_utc_offsets.length; i++ ) {
		test_rec = test_utc_offsets[i];
		equal(
			test_rec.utc,
			stz.local_to_utc(
				test_rec.timezone,
				test_rec.local
			),
			"The UTC time for " + test_rec.local + "hrs in " 
				+ test_rec.timezone + " should be " + test_rec.utc + "."
		);
	}
});
