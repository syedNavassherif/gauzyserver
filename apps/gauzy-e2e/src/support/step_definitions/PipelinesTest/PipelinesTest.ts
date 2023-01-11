import * as loginPage from '../../Base/pages/Login.po';
import { LoginPageData } from '../../Base/pagedata/LoginPageData';
import * as pipelinesPage from '../../Base/pages/Pipelines.po';
import { PipelinesPageData } from '../../Base/pagedata/PipelinesPageData';
import * as dashboardPage from '../../Base/pages/Dashboard.po';
import { CustomCommands } from '../../commands';
import * as logoutPage from '../../Base/pages/Logout.po';


import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps';

const pageLoadTimeout = Cypress.config('pageLoadTimeout');

// Login with email
Given('Login with default credentials and visit Sales pipelines page', () => {
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
	cy.visit('/#/pages/sales/pipelines', { timeout: pageLoadTimeout });
});

// Add new pipeline
And('User can see grid button', () => {
	pipelinesPage.gridBtnExists();
});

And('User can click on second grid button to change view', () => {
	pipelinesPage.gridBtnClick(1);
});

And('User can see add pipeline button', () => {
	pipelinesPage.addPipelineButtonVisible();
});

When('User click on add pipeline button', () => {
	pipelinesPage.clickAddPipelineButton();
});

Then('User can see name input field', () => {
	pipelinesPage.nameInputVisible();
});

And('User can enter pipeline name', () => {
	pipelinesPage.enterNameInputData(PipelinesPageData.pipelineName);
});

And('User can see description input field', () => {
	pipelinesPage.descriptionInputVisible();
});

And('User can enter pipeline description', () => {
	pipelinesPage.enterDescriptionInputData(
		PipelinesPageData.pipelineDescription
	);
});

When('User see stage add button', () =>{
	pipelinesPage.verifyStageButton();
});

Then('User click on stage button', () => {
	pipelinesPage.clickOnStageButton();
});

When('User see name input field', () => {
	pipelinesPage.verifyStageNameInput(PipelinesPageData.stageNameInputIndex);
});

Then('User enter stage name', () => {
	pipelinesPage.enterNameInputDataByIndex(PipelinesPageData.stageName, PipelinesPageData.stageNameInputIndex);
});

And('User can see create pipeline button', () => {
	pipelinesPage.createPipelineButtonVisible();
});

When('User click on create pipeline button', () => {
	pipelinesPage.clickCreatePipelineButton();
});

Then('Notification message will appear', () => {
	pipelinesPage.waitMessageToHide();
});

// Edit pipeline
When ('User see name input field search by first name', () => {
	pipelinesPage.verifyNamePlaceholder();
});
Then('User can enter name first name', () => {
	pipelinesPage.enterNamePlaceholder(PipelinesPageData.pipelineName);
});

And('User can see only the result', () => {
	pipelinesPage.verifySearchResult(PipelinesPageData.tableResult);
});

And('User can see pipelines table', () => {
	pipelinesPage.tableRowVisible();
});

When('User click on pipelines table row', () => {
	pipelinesPage.selectTableRow(0);
});

Then('User can see edit button', () => {
	pipelinesPage.editPipelineButtonVisible();
});

When('User click on edit button', () => {
	pipelinesPage.clickEditPipelineButton();
});

Then('User can see name input field again', () => {
	pipelinesPage.nameInputVisible();
});

And('User can enter new pipeline name', () => {
	pipelinesPage.enterNameInputDataByIndex(PipelinesPageData.editPipelineName,PipelinesPageData.nameInputIndex);
});

And('User can see description input field again', () => {
	pipelinesPage.descriptionInputVisible();
});

And('User can enter new pipeline description', () => {
	pipelinesPage.enterDescriptionInputDataByIndex(PipelinesPageData.pipelineDescription, PipelinesPageData.pipelineDescriptionIndex);
});

And('User can see update button', () => {
	pipelinesPage.updateButtonVisible();
});

When('User click on update button', () => {
	pipelinesPage.clickUpdateButton();
});

Then('Notification message will appear', () => {
	pipelinesPage.waitMessageToHide();
});

//Add pipeline deals
When ('User see name input field search', () => {
	pipelinesPage.verifyNamePlaceholder();
});
Then('User can enter name', () => {
	pipelinesPage.enterNamePlaceholder(PipelinesPageData.editPipelineName);
});

And('User can see only the result', () => {
	pipelinesPage.verifySearchResult(PipelinesPageData.tableResult);
});

When('User see view details button', () => {
	pipelinesPage.verifyDetailsButton()
});

Then('User can click view details button', () => {
	pipelinesPage.clickViewDetailsButton()
});

And('User can see add pipeline button again', () => {
	pipelinesPage.verifyAddDealButton();
});

When('User click on add pipeline button again', () => {
	pipelinesPage.clickAddDealButton();
});

Then('User can see title input field',() => {
	pipelinesPage.verifyTitleInput();
});

And('User enter title', () => {
	pipelinesPage.enterTitleInput(PipelinesPageData.titleInputData);
});

Then('User can see probability input', () => {
	pipelinesPage.verifyProbabilityInput()
});

And('User click on probability input', () => {
	pipelinesPage.clickOnProbabilityInput();
});

And('User click on option from dropdown', () => {
	pipelinesPage.clickDropdownOption(PipelinesPageData.dropdownOption);
});

Then('User can see create button',() => {
	pipelinesPage.verifyCreateButton();
});

And ('User click on create button', () => {
	pipelinesPage.clickOnCreateDealButton();
});

Then('Notification message will appear', () => {
	pipelinesPage.waitMessageToHide();
});

Then('User redirect to pipelines page', () => {
	CustomCommands.logout(dashboardPage, logoutPage, loginPage);
	CustomCommands.clearCookies();
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
	dashboardPage.verifyAccountingDashboardIfVisible();
	cy.visit('/#/pages/sales/pipelines', { timeout: pageLoadTimeout });
});



// Delete pipeline
And('User can see pipelines table again', () => {
	pipelinesPage.tableRowVisible();
});

When('User click on pipelines table row again', () => {
	pipelinesPage.selectTableRow(0);
});

Then('User can see delete button', () => {
	pipelinesPage.deleteButtonVisible();
});

When('User click on delete button', () => {
	pipelinesPage.clickDeleteButton();
});

Then('User can see confirm delete button', () => {
	pipelinesPage.confirmDeleteButtonVisible();
});

When('User click on confirm delete button', () => {
	pipelinesPage.clickConfirmDeleteButton();
});

Then('Notification message will appear', () => {
	pipelinesPage.waitMessageToHide();
});
