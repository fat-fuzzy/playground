import {writable, derived, readable} from 'svelte/store'

import * as constants from './types/constants.js'
import * as _animations from './libs/animations.js'

export const uiState = writable(constants.uiState.DEFAULT)

export const emojiFeedback = derived(uiState, ($uiState) => {
  return constants.emojis[$uiState] ? constants.emojis[$uiState] : []
})

// Use small cursor only for now
export const currentCursor = derived(uiState, ($uiState) => {
  if (Object.keys(constants.emojis.animate).includes($uiState)) {
    return constants.cursor[$uiState]
  }
})

export const animations = readable(_animations.animations)
export const currentAnimationId = writable('random-rect')
