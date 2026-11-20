@happy-path
Feature: Buying a T-shirt
  As a shopper
  I want to choose a size and add T-shirts to my cart
  So that I can place an order

  Background:
    Given I open the T-shirt shop

  Scenario: Open the shop
    Then the shop title should be "Classic Tee Shop"

  Scenario: See the product name
    Then the product name should be "Classic Tee"

  Scenario: See the product description
    Then the product description should be "Everyday cotton T-shirt"

  Scenario: See the product price
    Then the product price should be "$20.00"

  Scenario: See size S as an option
    Then size "S" should be available

  Scenario: See size M as an option
    Then size "M" should be available

  Scenario: See size L as an option
    Then size "L" should be available

  Scenario: See size XL as an option
    Then size "XL" should be available

  Scenario: Add a size S tee to the cart
    When I add a Classic Tee in size "S" to the cart
    Then the cart should contain a tee in size "S"

  Scenario: Add a size M tee to the cart
    When I add a Classic Tee in size "M" to the cart
    Then the cart should contain a tee in size "M"

  Scenario: Add a size L tee to the cart
    When I add a Classic Tee in size "L" to the cart
    Then the cart should contain a tee in size "L"

  Scenario: Add a size XL tee to the cart
    When I add a Classic Tee in size "XL" to the cart
    Then the cart should contain a tee in size "XL"

  Scenario: Show quantity one for a newly added tee
    When I add a Classic Tee in size "M" to the cart
    Then the cart should show quantity 1 for size "M"

  Scenario: Calculate the total for one tee
    When I add a Classic Tee in size "M" to the cart
    Then the cart total should be "$20.00"

  Scenario: Group two tees of the same size on one cart line
    When I add 2 tees in size "M"
    Then the cart should contain 1 different size line
    And the cart should show quantity 2 for size "M"

  Scenario: Calculate the total for two tees of the same size
    When I add 2 tees in size "M"
    Then the cart total should be "$40.00"

  Scenario: Group three tees of the same size on one cart line
    When I add 3 tees in size "M"
    Then the cart should contain 1 different size line
    And the cart should show quantity 3 for size "M"

  Scenario: Calculate the total for three tees of the same size
    When I add 3 tees in size "M"
    Then the cart total should be "$60.00"

  Scenario: Keep different sizes on separate cart lines
    When I add a size "M" tee and then a size "L" tee
    Then the cart should contain 2 different size lines
    And the cart should contain a tee in size "M"
    And the cart should contain a tee in size "L"

  Scenario: Calculate the total across two sizes
    When I add a size "M" tee and then a size "L" tee
    Then the cart total should be "$40.00"

  Scenario: Add one tee in every available size
    When I add one tee in each size
    Then the cart should contain 4 different size lines

  Scenario: Calculate the total for every available size
    When I add one tee in each size
    Then the cart total should be "$80.00"

  Scenario: Group repeated and different sizes correctly
    When I add 2 tees in size "M" and 1 tee in size "L"
    Then the cart should contain 2 different size lines
    And the cart should show quantity 2 for size "M"
    And the cart should show quantity 1 for size "L"

  Scenario: Calculate the total for repeated and different sizes
    When I add 2 tees in size "M" and 1 tee in size "L"
    Then the cart total should be "$60.00"

  Scenario: Check out with tees in every size
    When I add one tee in each size
    And I check out
    Then I should be told "Order placed successfully."
    And the cart should be empty
