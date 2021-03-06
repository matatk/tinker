'use strict'
/* exported analyse filter */

const LEAVE = 'leave'
const ELIDE_LONG = 'elide-long'
const ELIDE_ALL = 'elide-all'
const REMOVE = 'remove'

const PRETTY = {}
PRETTY[LEAVE] = 'Leave'
PRETTY[ELIDE_LONG] = 'Elide long'
PRETTY[ELIDE_ALL] = 'Elide all'
PRETTY[REMOVE] = 'Remove'

const PROTECTED_ATTRIBUTES = Object.freeze(['id', 'role'])

let ATTRIBUTES
let LONG_ATTRIBUTES

const exampleCode = `<div id="test" data-foo='bar'>
    <ul role="presentation" class="atestmenu" data-cat="spot">
        <li><a id='themenuitem1' href="#" onclick='javascript:alert("hello1");'>Menu item 1</a></li>
        <li><a id='themenuitem2' href="#" onclick='javascript:alert("hello2");'>Menu item 2</a></li>
        <li><a id='themenuitem3' href="#" onclick='javascript:alert("hello3");'>Menu item 3</a></li>
    </ul>
</div>`


//
// Analyse Stage
//

function analyse() {
	ATTRIBUTES = {}
	LONG_ATTRIBUTES = []
	analyseCleanControls()
	analyseFindAttributes()
	analyseMakeControls()
}

function analyseCleanControls() {
	// Remove all existing data rows from the table
	const container = document.getElementById('attribute-list-body')
	while( container.firstChild ) {
		container.removeChild(container.firstChild)
	}
}

function analyseFindAttributes() {
	// Find unique attributes (key-value pairs)
	const attributeRegEx = /([\w-]+|data-[\w-]+)=("[^"]+"|'[^']+')/g
	let match
	const code = getCodeElement()
	const limit = getQuotedLimit()
	let key
	let value

	while( match = attributeRegEx.exec(code.value) ) {
		key = match[1]
		value = match[2]

		// Just for convenience, record if this attribute has a long value
		if( value.length > limit ) {
			if( LONG_ATTRIBUTES.indexOf(key) === -1 ) {
				LONG_ATTRIBUTES.push(key)
			}
		}

		// Add the attribute to the attributes hash
		// ...initialisng the values list for this attribute if need be
		if( !(key in ATTRIBUTES)) {
			ATTRIBUTES[key] = []
		}
		// ...and only if this value hasn't been added before
		if( ATTRIBUTES[key].indexOf(value) === -1 ) {
			ATTRIBUTES[key].push(value)
		}
	}
}

function analyseMakeControls() {
	// Create and append controls for certain attributes
	const container = document.getElementById('attribute-list-body')

	for( const attribute of Object.keys(ATTRIBUTES).sort() ) {
		const row = document.createElement('tr')

		const name = document.createElement('td')
		const nameText = document.createTextNode(attribute)
		name.appendChild(nameText)
		row.appendChild(name)

		const leave = document.createElement('td')
		const leaveRadio = makeRadio(attribute, LEAVE)
		leave.appendChild(leaveRadio)
		row.appendChild(leave)

		const elideLong = document.createElement('td')
		if( LONG_ATTRIBUTES.indexOf(attribute) > -1 ) {
			const elideLongRadio = makeRadio(attribute, ELIDE_LONG)
			elideLong.appendChild(elideLongRadio)
		}
		row.appendChild(elideLong)

		const elideAll = document.createElement('td')
		const elideAllRadio = makeRadio(attribute, ELIDE_ALL)
		elideAll.appendChild(elideAllRadio)
		row.appendChild(elideAll)

		const remove = document.createElement('td')
		const removeRadio = makeRadio(attribute, REMOVE)
		remove.appendChild(removeRadio)
		row.appendChild(remove)

		container.appendChild(row)
	}
}

function makeRadio(attribute, mode) {
	const radio = document.createElement('input')
	radio.type = 'radio'
	if( isProtectedAttribute(attribute) ) {
		radio.checked = mode === LEAVE
	} else if( LONG_ATTRIBUTES.indexOf(attribute) > -1 ) {
		radio.checked = mode === ELIDE_LONG
	} else {
		radio.checked = mode === LEAVE
	}
	radio.name = attribute
	radio.value = mode
	radio.title = radioTitle(mode, attribute)
	return radio
}

function radioTitle(mode, attribute) {
	return PRETTY[mode] + ' ' + attribute + ' attributes'
}

function isProtectedAttribute(attribute) {
	if( PROTECTED_ATTRIBUTES.indexOf(attribute) > -1 ) {
		return document.getElementById('protect-' + attribute).checked
	}
	return false
}


//
// Filter Stage
//

function filter() {
	for( const attribute in ATTRIBUTES ) {
		if( ATTRIBUTES.hasOwnProperty(attribute) ) {
			const selector = 'input[name="' + attribute + '"]:checked'
			const choice = document.querySelector(selector).value
			filterCore(attribute, ATTRIBUTES[attribute], choice)
		}
	}
	analyse()
}

function filterCore(attribute, instances, mode) {
	const limit = getQuotedLimit()
	const code = getCodeElement()  // used by elide and remove

	for( let i = 0; i < instances.length; i++ ) {
		const instance = instances[i]

		switch( mode ) {
			case LEAVE:
				break

			case ELIDE_LONG:
				if( instance.length > limit ) {
					// drop down to elideAll
				} else {
					break
				}

			case ELIDE_ALL:
				code.value = elide(attribute, instance, code.value)
				break

			case REMOVE:
				code.value = remove(attribute, instance, code.value)
				break

			default:
				alert('filterCore error invalid mode: attr: ' + attribute + '; instance: ' + instance + '; mode: ' + mode)
		}
	}

	function elide(attribute, instance, text) {
		if( instance.indexOf('...') > -1 ) {
			return text
		}
		return replaceCore(attribute, instance, text, false)

	}

	function remove(attribute, instance, text) {
		return replaceCore(attribute, instance, text, true)
	}

	// Note: This looks for things in HTML attributes ONLY; it won't replace
	//       bare strings within the text (as it looks for a space before and
	//       after, or a space before and closing chevron after).
	function replaceCore(attribute, instance, text, remove) {
		const searchEnd = ' ' + attribute + '=' + instance + '>'
		const searchMiddle = ' ' + attribute + '=' + instance + ' '
		let output = text
		let replace

		if( remove ) {
			replace = ''
		} else {
			replace = ' ' + attribute + '="..."'
		}

		while( output.indexOf(searchEnd) > -1 ) {
			output = output.replace(searchEnd, replace + '>')
		}
		while( output.indexOf(searchMiddle) > -1 ) {
			output = output.replace(searchMiddle, replace + ' ')
		}

		return output
	}
}


//
// Utility Functions
//

function getCodeElement() {
	return document.getElementById('code')
}

function getSettingsControls() {
	return document.querySelectorAll('#settings input')
}

function getQuotedLimit() {
	const lenElide = document.getElementById('len_elide')
	const limit = parseInt(lenElide.value)
	return limit + 2
}


//
// Get going
//

document.addEventListener('DOMContentLoaded', function() {
	// Analyse the code whenever the code is changed
	getCodeElement().addEventListener('input', analyse)
	getCodeElement().value = exampleCode
	analyse()  // doesn't get called when .value is changed

	// Analyse the code whenever a setting is changed
	const elements = getSettingsControls()
	for (const element of elements) {
		element.addEventListener('click', analyse)
		// Safari doesn't fire 'change' until it loses focus
	}
})
