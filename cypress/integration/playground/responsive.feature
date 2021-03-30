Feature: Is Responsive

  @responsive
  Scenario Outline: Device: <device>
    When I'm using a '<device>'
    #  And I can access every item in the menu
    And I play the '📐 2D' animation
    Then I can see position inputs for X and Y
    And I can translate a rectangle in the canvas
    #  And I can scale a geometry in the canvas
    #  And I can rotate a geometry in the canvas
    #  And I can toggle the controls
    #  But I can't press play
    #  Then If I press stop
    #  Then I can't toggle the controls
    #  But I can press play
    #  And I can toggle the controls

    Examples:
      | device                  |
      | Galaxy s5 - Android 5.0 |
      | Galaxy s9 - Android 7.0 |
      | iPad Pro 10.5           |
      | iPad Pro 12.9           |
      | Galaxy s9 - Android 7.0 |
      | iPad Pro 12.9           |
      | iPhone 6/7/8 - iOS11    |
      | iPhone 6/7/8 - iOS11+   |
      | iPhone-X/XS - iOS12     |
      | Kindle Fire HDX Linux   |
      | Square Matrix           |
