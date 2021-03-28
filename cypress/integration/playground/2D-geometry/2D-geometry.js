import {And, Then} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../../pages/playground-page'

before(function () {
  // "this" points at the test context object
  cy.fixture('../fixtures/css-values.json').then((cssValues) => {
    // "this" is still the test context object
    this.cssValues = cssValues
  })
  cy.fixture('../fixtures/css-layouts.json').then((cssLayouts) => {
    this.cssLayouts = cssLayouts
  })
  cy.fixture('../fixtures/devices.json').then((devices) => {
    this.devices = devices
  })

  this.devices.forEach((device) => {
    const selectedLayout = this.cssLayouts.find(({name}) => name === device.layout)
    selectedLayout.config.forEach(({orientation, valuesX, valuesY}) => {
      let maxX = device.width
      let maxY = device.height
      if(orientation === "portrait") {
        cy.viewport(device.width, device.height)
      }
      if(orientation === "landscape") {
        cy.viewport(device.height, device.width)
        maxX = device.height
        maxY = device.width
      }
      valuesX.forEach((valueName) => {
        const cssProp = this.cssValues.layout.find(({name}) => name === valueName)
        maxX -= cssProp.value
      })
      valuesY.forEach((valueName) => {
        const cssProp = this.cssValues.layout.find(({name}) => name === valueName)
        maxY -= cssProp.value
      })
    })
  })

  PlaygroundPage.findBoundaries(maxX, maxY)
})

And(/^I play the '📐 2D' animation$/, () => {
  PlaygroundPage.playAnimation('📐 2D')
})

// TODO : change this: test that I can see handles in all layouts
Then(/^I can see coordinates handles for X and Y$/, () => {
  PlaygroundPage.findPosition()
})

And(/^I can translate a rectangle in the canvas$/, () => {
  // TODO
})
