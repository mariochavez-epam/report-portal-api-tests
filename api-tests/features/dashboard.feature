Feature: Dashboard Tests

  Scenario: User is able to create a dashboard within POST request
    Given I have random data to create a dashboard
    When I create the dashboard
    Then the dashboard should be successfully created
    And I should receive a status code of 201
    And the response should contain valid data for post New dashboard response
  
  @test-002
  Scenario: User is able to get a created dashboard within GET request
    Given I have an existing dashboard
    When I request the dashboard
    Then I should receive a status code of 200
    And the dashboard should contain valid data

  @test-004
  Scenario: User is able to add a widget to a dashboard within PUT request
    Given I have an existing dashboard and widget data
    When I add a widget to the dashboard
    Then the widget should be successfully added
    And I should receive a status code of 200

  @test-006
  Scenario: User is able to remove a dashboard within DELETE request
    Given I have a dashboard to delete
    When I delete the dashboard
    Then the dashboard should be successfully deleted
    And I should receive a confirmation message
