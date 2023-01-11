Feature: Add task
  Scenario: Login with email
    Given Login with default credentials
  Scenario: Add new tag
    Then User can add new tag
  Scenario: Add new employee
    And User can add new employee
  Scenario: Add new project
    And User can add new project
  Scenario: Add new task
    When User go to Tasks dashboard page
    Then User can see gird button
    And User can click on second grid button to change view
    And User can see Add task button
    When User click on Add task button
    Then User will see project dropdown
    When User click on project dropdown
    Then User can select project from dropdown options
    And User can see employee dropdown
    When User click on employee dropdown
    Then User can select employee from dropdown options
    And User can see title input field
    And User can add value for title
    And User can see due date input field
    And User can enter value for due date
    And User can see estimate days input field
    And User can enter value for estimate days
    And User can see estimate hours input field
    And User can add value for estimate hours
    And User can see estimate minutes input field
    And User can enter value for estimate minutes
    And User can task description input field
    And User can enter value for description
    And User can see save task button
    When User click on save task button
    Then Notification message will appear
    When User see title input field
    Then User enter title name
    And User can see only the results
    And User can verify task was created
    And User clear the search field
  Scenario: Duplicate task
    Then User can see table populated with tasks
    When User click on table first row
    Then Duplicate task button will become active
    When User click on duplicate task button
    Then User will see confirm action button
    When User click on confirm action button
    Then Notification message will appear
  Scenario: Edit task
    And User can see tasks table again
    When User select table first row
    Then Edit task button will become active
    When User click on edit task button
    Then User will see edit project dropdown
    When User click on edit project dropdown
    Then User can select new project from dropdown options
    And User can see edit title input field
    And User can add value for edit title
    And User can see edit due date input field
    And User can enter value for edit due date
    And User can see edit estimate days input field
    And User can enter value for estimate days edit
    And User can see edit estimate hours input field
    And User can add value for estimate hours edit
    And User can see edit estimate minutes input field
    And User can enter value for estimate minutes edit
    And User can task edit description input field
    And User can enter value for description edit
    And User can see save edited task button
    When User click on save edited task button
    Then Notification message will appear
    And User can verify task was edited
  Scenario: Delete task
    And User can see table for tasks
    When User click on first table row
    Then User can see duplicate or edit task button
    When User click on duplicate or edit task button
    Then User can see confirm button
    When User click on confirm button
    Then Notification message will appear
    And User can see tasks table again
    When User click on first table row
    Then Delete task button will become active
    When User click on delete task button
    Then User can see confirm delete button
    When User click on confirm delete button
    Then Notification message will appear
    And User can verify task was deleted
    When User click on first table row
    Then Delete button will become active again
    When User click on delete task button
    Then User will see confirm delete button again
    And User can click again on confirm delete task button