Feature: Playground

  Scenario: 📐 2D
    Given I'm in the Playground
    And I can select an Animation in the animations menu
    And I play the '📐 2D' animation
    Then I can see coordinates handles for X and Y
    And I can translate a rectangle in the canvas
