Feature: Playground

  @e2e-test
  Scenario: 🎰 Random
    Given I'm in the Playground
    And I can select an Animation in the animations menu
    And I play the '🎰 Random' animation
    Then I can see the confetti
