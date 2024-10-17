Feature: Dashboard Tests
  
  @test-001
  Scenario: [Positive] User is able to create a dashboard within POST request
    Given I have random data to create a dashboard
    When I create the dashboard
    Then the dashboard should be successfully created
    And I should receive a status code of 201
    And the response should contain valid data for post New dashboard response

      
  @test-009
  Scenario: [Negative] User is not able to create a dashboard within POST request without name field
    Given I have random data to create a dashboard
    When I create the dashboard without name field
    Then I should receive a status code of 400
    And the dashboard error data should contain valid data
    And the error message should be as expected

  @test-010
  Scenario: [Negative] User is not able to create a dashboard within POST request that already exist
    Given I have an existing dashboard
    When I create the dashboard without name field
    Then I should receive a status code of 409
    And the dashboard error data should contain valid data
    And the error message should be as expected

  @test-002
  Scenario: [Positive] User is able to get a created dashboard within GET request
    Given I have an existing dashboard
    When I request the dashboard
    Then I should receive a status code of 200
    And the dashboard should contain valid data

  @test-007
  Scenario: [Negative] User get proper error message when getting a dashboard that do not exist
    Given I request a not existing dashboard
    Then I should receive a status code of 404
    And the dashboard error data should contain valid data
    And the error message should be as expected

 
  @test-004
  Scenario: [Positive] User is able to add a widget to a dashboard within PUT request
    Given I have an existing dashboard and widget data
    When I add a widget to the dashboard
    Then the widget should be successfully added
    And I should receive a status code of 200


  @test-011
  Scenario: [Negative] User is not able to add a widget to a not existing dashboard within PUT request
    Given I request a not existing dashboard
    When I add a widget to a not existing dashboard
    Then I should receive a status code of 404
    And the dashboard error data should contain valid data
    And the error message should be as expected

  @test-012
  Scenario: [Negative] User is not able to add a not existing widget to a existing dashboard within PUT request
    Given I request an existing dashboard
    When I add a not existing widget to an existing dashboard
    Then I should receive a status code of 404
    And the dashboard error data should contain valid data
    And the error message should be as expected

  @test-006
  Scenario: [Positive] User is able to remove a dashboard within DELETE request
    Given I have a dashboard to delete
    When I delete the dashboard
    Then the dashboard should be successfully deleted
    And I should receive a confirmation message

  @test-011
  Scenario: [Negative] User is not able to remove a dashboard that do not exist within DELETE request
    Given I request a not existing dashboard
    When I delete the dashboard that do not exist
    Then I should receive a status code of 404
    And the dashboard error data should contain valid data
    And the error message should be as expected
