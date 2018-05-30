'use strict'
/* exported go goDay colour delay changeDemo changeSweep */


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
if (time < 1200) {
	colour(255, 0, 0)
} else {
	colour(0, 0, 255)
}`
}

const lights = document.getElementById('lights')
const codeInput = document.getElementById('code')
const sampleSelect = document.getElementById('demos')
const goButton = document.getElementById('run')
const goDayButton = document.getElementById('run-day')

const defaultLightsValue = '1642'


//
// State
//

const steps = []
let stepDelay = 10
let stepIndex

// Keep track of the time that the code sees
let hour
let minute


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
			hour = loopHour
			minute = loopMinute
			let time = String(hour) + minute
			if (time.length < 4) time = '0' + time
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
	console.log(stepIndex, steps[stepIndex])
	if (stepIndex <= steps.length) {
		// Padding
		// FIXME do this elsewhere
		if (time < 1000) {
			lights.value = '0'
		} else {
			lights.value = ''
		}
		lights.value += steps[stepIndex].time
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
		const hours = now.getHours()
		const minutes = now.getMinutes()
		const time = String(hours) + minutes
		lights.value = time
	} else {
		lights.value = defaultLightsValue
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
		'time': time,
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
	lights.value = defaultLightsValue
	// time = parseInt(defaultLightsValue)  // time as seen by the code
}

init()
