import {And} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../../pages/playground-page'

And(/^I play the '🎰 Random' animation$/, () => {
  PlaygroundPage.playAnimation('🎰 Random')
})
