#!/usr/bin/env python
# vim: set fileencoding=utf-8:
import string
import itertools
import json
from webscraping import download, xpath, common


def normalise(data):
	"""Create a lower-case, no-spaces, no-parentheses version of data"""
	return data \
		.lower() \
		.translate(None, "(),[]123456789'\".") \
		.translate(string.maketrans(' ', '-'))


def extract_offset(data):
	"""Get the numerical offset of the timezone from UTC"""
	parity = 0
	data = data.decode('utf-8')

	if data == 'UTC':
		return 0
	
	# it's an offset of some type; is it positive?
	if data[3] == '+':
		parity = 1
	else:
		parity = -1
	
	# Strip the leading "UTC" and parity indicator
	data = data[4:]

	# Convert the offset to a number for parity processing
	# If there is a n+half-hour offset, remove it from the string,
	# then re-add numerically.
	if ':' in data:
		data = data[:-3]
		data = int(data) + 0.5
	else:
		data = int(data)

	return parity * data


def main():
	"""Convert the table of timezone data to a JavaScript array of records"""
	D = download.Download()
	html = D.get('http://en.wikipedia.org/wiki/List_of_time_zone_abbreviations')
	cells = xpath.search(html, '//table[2]//td')
	fields = ['abbreviation', 'name', 'offset']

	records = {}  # store the complete records collection
	temp_rec = {}  # build up a record as we go
	temp_rec_abbr = ''
	temp_rec_id = ''
	complete = False  # when a record is complete, it can be added to the store

	for field, cell in zip(itertools.cycle(fields), cells):
		if field == 'abbreviation':
			temp_rec_abbr = cell.lower()
			#cell = quote(cell)
		elif field == 'name':
			cell = common.remove_tags(cell)
			#cell = quote(cell)
			temp_rec_id = temp_rec_abbr + '-' + normalise(cell)
		elif field == 'offset':
			cell = extract_offset(common.remove_tags(cell))
			complete = True
		else:
			raise Exception('ERROR: unknown field "' + field + '"')

		temp_rec[field] = cell

		if complete:
			records[temp_rec_id] = temp_rec
			complete = False
			temp_rec = {}
			temp_rec_id = ''
			temp_rec_abbr = ''
	
	print json.dumps(
		records,
		ensure_ascii = False,
		sort_keys = True,
		indent = 4
	)


if __name__ == '__main__':
	main()
