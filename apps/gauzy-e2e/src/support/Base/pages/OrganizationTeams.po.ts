import {
	verifyElementIsVisible,
	clickButtonByIndex,
	clickButton,
	clearField,
	enterInput,
	clickKeyboardBtnByKeycode,
	waitElementToHide,
	verifyText,
	verifyTextNotExisting
} from '../utils/util';
import { OrganizationTeamsPage } from '../pageobjects/OrganizationTeamsPageObject';

export const gridBtnExists = () => {
	verifyElementIsVisible(OrganizationTeamsPage.gridButtonCss);
};

export const gridBtnClick = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.gridButtonCss, index);
};

export const addTeamButtonVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.addTeamButtonCss);
};

export const clickAddTeamButton = () => {
	clickButton(OrganizationTeamsPage.addTeamButtonCss);
};

export const nameInputVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.teamNameInputCss);
};

export const enterNameInputData = (data) => {
	clearField(OrganizationTeamsPage.teamNameInputCss);
	enterInput(OrganizationTeamsPage.teamNameInputCss, data);
};

export const tagsMultiSelectVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.tagsSelectCss);
};

export const clickTagsMultiSelect = () => {
	clickButton(OrganizationTeamsPage.tagsSelectCss);
};

export const selectTagsFromDropdown = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.tagsSelectOptionCss, index);
};

export const employeeDropdownVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.employeeMultiSelectCss);
};

export const clickEmployeeDropdown = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.employeeMultiSelectCss, index);
};

export const selectEmployeeFromDropdown = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.selectDropdownOptionCss, index);
};

export const managerDropdownVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.managerMultiSelectCss);
};

export const clickManagerDropdown = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.managerMultiSelectCss, index);
};

export const selectManagerFromDropdown = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.selectDropdownOptionCss, index);
};

export const clickKeyboardButtonByKeyCode = (keycode) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const clickCardBody = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.cardBodyCss, index);
};

export const saveButtonVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.saveButtonCss);
};

export const clickSaveButton = () => {
	clickButton(OrganizationTeamsPage.saveButtonCss);
};

export const tableRowVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.selectTableRowCss);
};

export const selectTableRow = (index) => {
	clickButtonByIndex(OrganizationTeamsPage.selectTableRowCss, index);
};

export const editButtonVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.editButtonCss);
};

export const clickEditButton = () => {
	clickButton(OrganizationTeamsPage.editButtonCss);
};

export const deleteButtonVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.deleteButtonCss);
};

export const clickDeleteButton = () => {
	clickButton(OrganizationTeamsPage.deleteButtonCss);
};

export const confirmDeleteButtonVisible = () => {
	verifyElementIsVisible(OrganizationTeamsPage.confirmDeleteButtonCss);
};

export const clickConfirmDeleteButton = () => {
	clickButton(OrganizationTeamsPage.confirmDeleteButtonCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(OrganizationTeamsPage.toastrMessageCss);
};

export const verifyTeamExists = (text) => {
	verifyText(OrganizationTeamsPage.verifyTeamCss, text);
};

export const verifyTeamIsDeleted = (text) => {
	verifyTextNotExisting(OrganizationTeamsPage.verifyTeamCss, text);
};
