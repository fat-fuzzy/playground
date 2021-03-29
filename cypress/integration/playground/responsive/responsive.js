import {defineParameterType, And, Then, Before} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../../pages/playground-page'

let maxX 
let maxY
let devices 
let cssLayouts 
let cssValues 

defineParameterType({
  name: 'device',
  regexp:  /'([^']*)'/,
  transformer: (n) => n,
});

Before(function () {
  // "this" points at the test context object
  cy.fixture('css-values').then(function(c) {
    // "this" is still the test context object
    cssValues = c.layout
  })
  cy.fixture('css-layouts').then(function(c) {
    cssLayouts = c.layouts
  })
  cy.fixture('devices').then(function(d) {
    devices = d.devices
  })
})

When(`I'm using a(n) {device}`, function(device) {
  const currentDevice = devices.find(({name})=> name === device)
  if(currentDevice) {
    const selectedLayout = cssLayouts.find(({name}) => name === currentDevice.layout)
    const width = currentDevice.dimensions[0]
    const height = currentDevice.dimensions[1]
    selectedLayout.config.forEach(({orientation, valuesX, valuesY}) => {
      let tmpX
      let tmpY
      if(orientation === "portrait") {
        cy.viewport(width, height)
        tmpX = width
        tmpY = height
      }
      if(orientation === "landscape") {
        cy.viewport(height, width)
        tmpX = height
        tmpY = width
      }
      maxX = valuesX.reduce((x, valueName) => {
        const cssProp = cssValues.find(({name}) => name === valueName)
        return x - cssProp.value
      }, tmpX)
      maxY = valuesY.reduce((y, valueName) => {
        const cssProp = cssValues.find(({name}) => name === valueName)
        return y - cssProp.value
      }, tmpY)
      PlaygroundPage.visit()
    })
  } else {
    throw Error(`Device not found`)
  }
})

Then(/^I can see position inputs for X and Y$/, function () {
  PlaygroundPage.findBoundaries(maxX, maxY)
})

And(/^I can translate a rectangle in the canvas$/, () => {
  // TODO
})
