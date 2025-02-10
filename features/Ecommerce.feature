Feature: Validate Ecommerce Website

  Scenario: Placing the order
    Given a login to Ecommerce website with credentials "anshika@gmail.com" and "Iamking@000"
    When Add "zara" to cart
    Then Verify "zara" is displayed in the cart
    When Enter valid details, "anshika@gmail.com" and place order
    Then Verify order in present history of orders
