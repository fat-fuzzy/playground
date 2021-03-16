import {Given, And} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../pages/playground-page'

Given(/^I'm in the Playground$/, () => {
  PlaygroundPage.visit()
})

And(/^I can select an Animation in the animations menu$/, () => {
  PlaygroundPage.findAnimationsMenu()
})
