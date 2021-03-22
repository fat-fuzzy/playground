// import {Then, And, Given} from 'cypress-cucumber-preprocessor/steps'
// import * as constants from '../../../../src/types/constants.js.js'

// const rootUrl = '/'
// const buttonPlay = '[data-cy="btn-play"]'
// const buttonRefresh = '[data-cy="btn-refresh"]'
// const output = '[data-cy="output"]'
// // const stacktrace = '[data-cy="stacktrace"]'
// // const feedback = '[data-cy="feedback"]'
// const animationMenu = '[data-cy="animation-menu"]'
// const animation = '[data-cy="L1-2"]'

// Given('I arrive on the playground for the first time', () => {
//   // TODO
//   cy.visit(rootUrl)
//   cy.get(buttonRefresh).click()
// })

// And('The animation is a success', () => {
//   cy.get(buttonPlay)
//     .click()
//     .then(() => {
//       cy.get(output).should('have.class', constants.uiState.SUCCESS)
//     })
// })

// describe('Play - success', () => {
//   // TODO : fix animation!
//   Then('I can see the confetti', () => {
//     // TODO
//   })
// })

// describe('Play - error', () => {
//   before(() => {
//     cy.get(buttonRefresh).click()
//     cy.log('Before Fresh play - error')
//   })

//   // TODO : mock error in animation to test that error UI outputs correctly (init scene, draw: unit tests there ?)
//   And('The animation has an error', () => {
//     // Fake invisibility of canvas element : test should fail with TypeError canvas not found
//     cy.get(buttonPlay)
//       .click()
//       .then(() => {
//         cy.get(output).should('have.class', constants.uiState.ERROR)
//       })
//   })
//   Then('I can see the poop', () => {
//     // TODO
//   })
//   And('I can see the error', () => {
//     cy.get(stacktrace).then(($stacktrace) => expect($stacktrace).to.be.visible)
//     cy.get(feedback).then(($feedback) => expect($feedback).to.be.visible)
//   })
// })

// describe('Animation menu', () => {
//   before(() => {
//     cy.get(buttonRefresh).click()
//     cy.log('Animation menu')
//   })

//   // TODO : mock error in animation to test that error UI outputs correctly (init scene, draw: unit tests there ?)
//   Then('I can select an animation', () => {
//     // Fake invisibility of canvas element : test should fail with TypeError canvas not found
//     cy.get(animationMenu)
//       .click()
//       .then(() => {
//         cy.get(animation)
//           .click()
//           .then(() => {
//             cy.get(output).should('have.class', constants.uiState.SUCCESS)
//           })
//       })
//   })
//   And('The animation is a success', () => {
//     cy.get(buttonPlay)
//       .click()
//       .then(() => {
//         cy.get(output).should('have.class', constants.uiState.SUCCESS)
//       })
//   })
// })
