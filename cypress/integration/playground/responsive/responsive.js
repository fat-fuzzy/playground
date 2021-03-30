import {defineParameterType, And, Then, Before} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../../pages/playground-page'

let devices 
let layouts 

defineParameterType({
  name: 'device',
  regexp:  /'([^']*)'/,
  transformer: (n) => n,
});

Before(function () {
  cy.fixture('layouts').then(function(l) {
    layouts = l.layouts
  })
  cy.fixture('devices').then(function(d) {
    devices = d.devices
  })
})

When(`I'm using a(n) {device}`, function(device) {
  const currentDevice = devices.find(({name})=> name === device)
  if(currentDevice) {
    const currentLayout = layouts.find(({name}) => name === currentDevice.layout)
    const [width, height] = currentDevice.dimensions
    currentLayout.config.forEach((orientation) => {
      if(orientation === "portrait") {
        cy.viewport(width, height)
      }
      if(orientation === "landscape") {
        cy.viewport(height, width)
      }
      PlaygroundPage.visit()
    })
  } else {
    throw Error(`Device not found`)
  }
})

Then(/^I can see position inputs for X and Y$/, function () {
  PlaygroundPage.findBoundaries()
})

And(/^I can translate a rectangle in the canvas$/, () => {
  // TODO
})
