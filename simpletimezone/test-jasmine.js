describe('SimpleTimezone', function() {
	it('matches timezones by abbreviation or name', function() {
		var test_rec;
		for( var i = 0; i < test_matches.length; i++ ) {
			test_rec = test_matches[i];
			expect(SimpleTimezone.matching_time_zones(test_rec.input))
				.toEqual(test_rec.matches);
		}
	});

	it("gets the UTC offsets correct", function() {
		var test_rec;
		for( var i = 0; i < test_utc_offsets.length; i++ ) {
			test_rec = test_utc_offsets[i];
			expect(
				SimpleTimezone.local_to_utc(test_rec.timezone, test_rec.local))
				.toBe(test_rec.utc);
		}
	});
});
