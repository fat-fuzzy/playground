// PLayground controls
const BTN_PLAY = '[data-cy="btn-play"]'
const BTN_STOP = '[data-cy="btn-stop"]'
const BTN_HANDLES = '[data-cy="btn-handles"]'
const DRUMROLL = '[data-cy="drumroll"]'
const OUTPUT = '[data-cy="output"]'
const CANVAS = '[data-cy="canvas"]'

// Animations menu
const NAV = '[data-cy="nav"]'
const BTN_RANDOM_RECTS = '[data-cy="random-rect"]'
const BTN_WITH_DRUMS = '[data-cy="random-rect-audio"]'
const BTN_2D_GEO = '[data-cy="2D"]'
const BTN_A_FEATURE = '[data-cy="poop"]'
const CONFETTI = '[data-cy="emoji-🥳"]'
const POOP = '[data-cy="emoji-💩"]'
const ANIMATION_RANDOM_RECTS = '🎰 Random'
const ANIMATION_WITH_DRUMS = '🥁 Audio'
const ANIMATION_2D_GEO = '📐 2D'
const ANIMATION_A_FEATURE = '💩 A Feature'

// Animation controls
const POSITION = '[data-cy="position"]'
const POSITION_X = '[data-cy="x-range"]'
const POSITION_Y = '[data-cy="y-range"]'
const rootUrl = '/'
export function visit() {
  cy.visit(rootUrl)
}

export function findAnimationsMenu() {
  cy.get(NAV).find(BTN_RANDOM_RECTS)
  cy.get(NAV).find(BTN_WITH_DRUMS)
  cy.get(NAV).find(BTN_2D_GEO)
  cy.get(NAV).find(BTN_A_FEATURE)
}

export function findBoundaries(maxX, maxY) {
  cy.get(POSITION_X).then(($position) => {
    expect($position).to.have.attr('max', maxX)
  })
  cy.get(POSITION_Y).then(($position) => {
    expect($position).to.have.attr('max', maxY)
  })
}

export function pressPlay() {
  cy.get(BTN_PLAY).click()
}

export function pressReset() {
  cy.get(BTN_STOP).click()
}

export function toggleHandles() {
  cy.get(BTN_HANDLES).click()
}

export function playAnimation(animation) {
  if (animation === ANIMATION_RANDOM_RECTS) {
    cy.get(BTN_RANDOM_RECTS).contains(ANIMATION_RANDOM_RECTS).click()
  }
  if (animation === ANIMATION_WITH_DRUMS) {
    cy.get(BTN_WITH_DRUMS).contains(ANIMATION_WITH_DRUMS).click()
  }
  if (animation === ANIMATION_2D_GEO) {
    cy.get(BTN_2D_GEO).contains(ANIMATION_2D_GEO).click()
  }
  if (animation === ANIMATION_A_FEATURE) {
    cy.get(BTN_A_FEATURE).contains(ANIMATION_2D_GEO).click()
  }
}

export function findTheConfetti() {
  cy.get(CONFETTI)
}

export function findThePoop() {
  cy.get(POOP)
}

export function listenToDrumroll() {
  cy.get(DRUMROLL)
  // TODO: test playback ?
}
