before(() => {
  cy.log(
    "This will run once before all tests, you can use this to for example start up your server, if that's your thing",
  )

  const outputWidth = 667 // TODO : fix value: should match canvas width (test on resize ?)
  const outputHeight = 375 // TODO : fix value: should match canvas width (test on resize ?)
  cy.viewport(outputWidth, outputHeight)
})
