import {Then} from 'cypress-cucumber-preprocessor/steps'
import * as PlaygroundPage from '../../pages/playground-page'

Then(/^I can hear a drumroll$/, () => {
  PlaygroundPage.listenToDrumroll()
})
