Feature: Authorization & Authentication

  Scenario: Sign in with existing credentials
    Given I have valid existing credentials
    When I attempt to sign in
    Then I should receive a status code of 200
    And the response should contain valid authentication data

  Scenario: Sign in with non-existing credentials
    Given I have non-existing credentials
    When I attempt to sign in
    Then I should receive a status code of 400
    And the error message should be "You do not have enough permissions. Bad credentials"
