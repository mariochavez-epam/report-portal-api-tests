Feature: Login Functionality

  Scenario: Unsuccessful login with invalid credentials
    Given I am on the login page
    When I enter an invalid username and password
    And I click on the login button
    Then I should see an error message
    
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter a valid username and password
    And I click on the login button
    Then I should see a notification for succesfull login
    And I should be redirected to the dashboard page
