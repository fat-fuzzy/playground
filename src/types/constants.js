export const uiState = {
  DEFAULT: 'default',
  FOCUS: 'focus',
  HOVER: 'hover',
  ACTIVE: 'active',
  SUCCESS: 'success',
  ERROR: 'error',
}

// TODO : use typescript for these things
// export type playgroundState = uiState.DEFAULT | uiState.SUCCESS | uiState.ERROR
export const size = {
  LG: 'LG',
  SM: 'SM',
}
export const emojis = {
  splash: {
    default: '🥁', // 🥁 drums
    success: '✨', // ✨ sparkles
    error: '👻', // 👻 ghost
  },
  animate: {
    default: '⚡️', // ⚡️ lightning
    success: '🙌', // 🙌 raised hands
    error: '🌧', // 🌧 cloud with rain
    active: '💥', // 💥 fire spark
  },
  success: {
    tada: '🎉', // 🎉 party-popper
    star: '🌟', // 🌟 glowing star
    balloon: '🎈', // 🎈 balloon
    partyFace: '🥳', // 🥳 party-face
    confettiBall: '🎊', // 🎊 confetti-ball
  },
  error: {
    poop: '💩', // 💩 poop
    // typeScript: '🍱', // 🍱 bento box
    // lint: '🚨', // 🚨 rotating beacon
  },
  refresh: {
    default: '🧽', // 🧽 sponge
  },
}

export const cursor = {
  default:
    'url(\'data:image/svg+xml;utf8,<svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="font-size: 30px;"><text y="25" >⚡️</text></svg>\'), auto', // ⚡️ lightning
  success:
    'url(\'data:image/svg+xml;utf8,<svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="font-size: 30px;"><text y="25" >🙌</text></svg>\'), auto', // 🙌 raised hands
  error:
    'url(\'data:image/svg+xml;utf8,<svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="font-size: 30px;"><text y="25" >🌧</text></svg>\'), auto', // 🌧 cloud with rain
  active:
    'url(\'data:image/svg+xml;utf8,<svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="font-size: 30px;"><text y="25" >💥</text></svg>\'), auto', // 💥 fire spark
}
