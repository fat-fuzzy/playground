import {And} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../../pages/playground-page'

And(/^I play the 'Random rectangles' animation$/, () => {
  PlaygroundPage.playAnimation('Random rectangles')
})
