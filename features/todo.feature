Feature: Managing a simple task list
  As a user
  I want to add and complete tasks
  So that I can keep track of small things to do

  Background:
    Given I open the Todo app

  Scenario: Add a task
    When I add the task "Buy milk"
    Then I should see the task "Buy milk"
    And the task "Buy milk" should not be complete

  Scenario: Complete a task
    Given I add the task "Read a book"
    When I mark the task "Read a book" complete
    Then the task "Read a book" should be complete

  Scenario: Reject a blank task
    When I submit a blank task
    Then I should be told "Enter a task name."
    And the task list should be empty
