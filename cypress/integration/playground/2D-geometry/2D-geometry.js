import {And, Then} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../../pages/playground-page'

And(/^I play the '2D geometry' animation$/, () => {
  PlaygroundPage.playAnimation('2D geometry')
})

Then(/^I can see coordinates handles for X and Y$/, () => {
  PlaygroundPage.findPosition()
})

And(/^I can translate a rectangle in the canvas$/, () => {
  // TODO
})
