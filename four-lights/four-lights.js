'use strict'
/* exported go goDay colour delay changeDemo changeSweep */

//
// TODO
//

// - goDay() starts with the current time (whatever it is)
// - disable all the UI first
// - current time should be toggle, not checkbox?
// - time sweep range


//
// Config
//

const demoCode = {
	'One loop': `
for (var i = 0; i < 256; i = i + 1) {
	colour(0, i, 0);
	delay(10);
}`,
	'One loop and another loop': `
for (var i = 0; i < 256; i = i + 1) {
	colour(0, i, 0);
	delay(10);
}

for (var i = 255; i > 0; i = i - 1) {
	colour(0, i, 0);
	delay(10);
}`,
	'Simple if': `
if (hour() < 12) {
	colour(255, 0, 0)
} else {
	colour(0, 0, 255)
}`
}

const defaultHour = 16
const defaultMinute = 42
let stepDelay = 10

const lights = document.getElementById('lights')
const codeInput = document.getElementById('code')
const sampleSelect = document.getElementById('demos')
const goButton = document.getElementById('run')
const goDayButton = document.getElementById('run-day')


//
// State
//

const steps = []
let stepIndex

// Keep track of the time that the code sees
let _hour
let _minute

function setTime(hour, minute) {
	_hour = hour
	_minute = minute
}

function setDefaultTime() {
	_hour = defaultHour
	_minute = defaultMinute
}

function updateLightsValue() {
	_displayCore(_hour, _minute)
}

function display(hour, minute) {
	_displayCore(hour, minute)
}

function _displayCore(hour, minute) {
	let hourString = String(hour)
	let minuteString = String(minute)
	if (hourString.length === 1) hourString = '0' + hourString
	if (minuteString.length === 1) minuteString = '0' + minuteString
	lights.value = hourString + minuteString
}


//
// Computing steps and playback
//

// Run the user code for the current time only
function go() {
	const codeToRun = codeInput.value
	disableRunButtons()
	steps.length = 0

	try {
		eval(codeToRun)  // create all the steps quickly
	} catch (error) {
		alert(error)
		enableRunButtons()
		return
	}

	playback()  // play back the results of the run slowly
}

// Run the user code for all times through the day
// TODO option to run it between certain times
function goDay() {
	const codeToRun = codeInput.value
	disableRunButtons()
	steps.length = 0

	// Check if the code will work
	try {
		eval(codeToRun)
	} catch (error) {
		alert(error)
		enableRunButtons()
		return
	}

	// Now actually run it
	for (let loopHour = 0; loopHour < 24; loopHour++) {
		for (let loopMinute = 0; loopMinute < 60; loopMinute++) {
			setTime(loopHour, loopMinute)
			// No need to update display
			try {
				eval(codeToRun)
			} catch (error) {
				alert(error)
				enableRunButtons()
				return
			}
		}
	}

	playback()  // play back the results of the run slowly
}


function playback() {
	stepIndex = 0
	playStep()
}

function playStep() {
	if (stepIndex < steps.length) {
		display(steps[stepIndex].hour, steps[stepIndex].minute)
		lights.style.color = steps[stepIndex].colour
		stepIndex++
		setTimeout(playStep, stepDelay)
	} else {
		enableRunButtons()
	}
}


//
// UI management
//

function disableRunButtons() {
	goButton.disabled = true
	goDayButton.disabled = true
}

function enableRunButtons() {
	goButton.disabled = false
	goDayButton.disabled = false
}

function changeDemo(select) {
	codeInput.value = select.value.slice(1)
}

function changeSweep(checkbox) {
	if (checkbox.checked) {
		const now = new Date()
		setTime(now.getHours(), now.getMinutes())
		updateLightsValue()
	} else {
		setDefaultTime()
		updateLightsValue()
	}
}


//
// Support for functions called directly by user code
//

// https://stackoverflow.com/a/5624139/1485308
function rgbToHex(r, g, b) {
	/* eslint-disable-next-line */
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


//
// Called directly user code
//

const hour = () => _hour      // eslint-disable-line no-unused-vars
const minute = () => _minute  // eslint-disable-line no-unused-vars

function colour(r, g, b) {
	const checks = {
		'Red': r,
		'Green': g,
		'Blue': b
	}

	for (const component in checks) {
		if (checks[component] === undefined) {
			throw Error(`${component} colour value not given.`)
		}

		if (!Number.isInteger(checks[component])) {
			throw Error(`${component} is not an integer.`)
		}

		if (checks[component] < 0) {
			throw Error(`${component} is negative `
				+ ` (${checks[component]}).`)
		}

		if (checks[component] > 255) {
			throw Error(`${component} is too big `
				+ ` (${checks[component]}).`)
		}
	}

	const hex = rgbToHex(r, g, b)

	steps.push({
		'hour': _hour,
		'minute': _minute,
		'colour': hex
	})
}

// This is called directly from the eval'd code
function delay(milliseconds) {
	if (milliseconds === undefined) {
		throw Error('Delay not given.')
	}

	if (!Number.isInteger(milliseconds)) {
		throw Error(`Delay ${milliseconds} is not an integer.`)
	}

	if (milliseconds < 0) {
		throw Error(`Delay ${milliseconds} is negative.`)
	}

	stepDelay = milliseconds
}


//
// Startup
//

function init() {
	for (const demo in demoCode) {
		sampleSelect.innerHTML +=
			`<option value="${demoCode[demo]}">${demo}</option>`
	}

	codeInput.value = demoCode['One loop'].slice(1)
	setDefaultTime()
	updateLightsValue()
}

init()
