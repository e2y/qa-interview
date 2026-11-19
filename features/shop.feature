Feature: Buying a T-shirt
  As a shopper
  I want to choose a size and add a T-shirt to my cart
  So that I can place an order

  Background:
    Given I open the T-shirt shop

  Scenario: Add a T-shirt in a selected size
    When I add a Classic Tee in size "M" to the cart
    Then the cart should contain a tee in size "M"
    And the cart total should be "$20.00"

  Scenario: Require a size before adding a T-shirt
    When I try to add a tee without selecting a size
    Then I should be told "Choose a size before adding the shirt."
    And the cart total should be "$0.00"

  Scenario: Calculate the total for different sizes
    When I add a size "M" tee and then a size "L" tee
    Then the cart should contain 2 different sizes
    And the cart total should be "$40.00"

  Scenario: Check out with an item in the cart
    When I add a size "S" tee and check out
    Then I should be told "Order placed successfully."
    And the cart should be empty
