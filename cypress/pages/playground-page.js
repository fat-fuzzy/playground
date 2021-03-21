// PLayground controls
const BTN_PLAY = '[data-cy="btn-play"]'
const BTN_RESET = '[data-cy="btn-reset"]'
const BTN_REFRESH = '[data-cy="btn-refresh"]'
const DRUMROLL = '[data-cy="drumroll"]'
const OUTPUT = '[data-cy="output"]'
// const CANVAS = '[data-cy="canvas"]'

// Animations menu
const ANIMATIONS_MENU = '[data-cy="animations-menu"]'
const BTN_RANDOM_RECTS = '[data-cy="random-rect"]'
const BTN_WITH_DRUMS = '[data-cy="random-rect-audio"]'
const BTN_2D_GEO = '[data-cy="2D-geometry"]'
const CONFETTI = '[data-cy="emoji-🥳"]'
const POOP = '[data-cy="emoji-💩"]'
const ANIMATION_RANDOM_RECTS = 'Random rectangles'
const ANIMATION_WITH_DRUMS = '... with drums'
const ANIMATION_2D_GEO = '2D geometry'

// Animation controls
const POSITION = '[data-cy="position"]'
const COORD_X = '[data-cy="x-range"]'
const COORD_Y = '[data-cy="y-range"]'
const rootUrl = '/'
export function visit() {
  cy.visit(rootUrl)
}

export function findAnimationsMenu() {
  cy.get(ANIMATIONS_MENU).find(BTN_RANDOM_RECTS)
  cy.get(ANIMATIONS_MENU).find(BTN_WITH_DRUMS)
  cy.get(ANIMATIONS_MENU).find(BTN_2D_GEO)
}

export function findPosition() {
  cy.get(POSITION).then(() => {
    // max values for iphone 6/7 viewport for now (375 x 677px)
    const maxX =  337.46 // TODO : fix value: should match canvas width (test on resize ?)
    const maxY =  287.2 // TODO : fix value: should match canvas width (test on resize ?)
    cy.get(COORD_X).then(($coord) => {
      expect($coord).to.have.attr('max', maxX)
    })
    cy.get(COORD_Y).then(($coord) => {
      expect($coord).to.have.attr('max', maxY)
    })
  })
}

export function pressPlay() {
  cy.get(BTN_PLAY).click()
}

export function pressReset() {
  cy.get(BTN_RESET).click()
}

export function pressRefresh() {
  cy.get(BTN_REFRESH).click()
}

export function playAnimation(animation) {
  if (animation === ANIMATION_RANDOM_RECTS) {
    cy.get(BTN_RANDOM_RECTS).contains(ANIMATION_RANDOM_RECTS).click().wait(5000)
  }
  if (animation === ANIMATION_WITH_DRUMS) {
    cy.get(BTN_WITH_DRUMS).contains(ANIMATION_WITH_DRUMS).click().wait(5000)
  }
  if (animation === ANIMATION_2D_GEO) {
    cy.get(BTN_2D_GEO).contains(ANIMATION_2D_GEO).click()
  }
}

export function findTheConfetti() {
  cy.wait(5000).get(CONFETTI)
}

export function findThePoop() {
  cy.get(POOP)
}

export function listenToDrumroll() {
  cy.get(DRUMROLL)
  // TODO: test playback ?
}
