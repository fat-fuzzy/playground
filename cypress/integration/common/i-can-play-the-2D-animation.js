import {And} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../pages/playground-page'

And(/^I play the '📐 2D' animation$/, () => {
  PlaygroundPage.findAnimationsMenu()
  PlaygroundPage.playAnimation('📐 2D')
})
