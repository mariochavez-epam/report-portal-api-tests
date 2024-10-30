const BasePage = require("../BasePage.js");

const { $, browser } = require('webdriverio');

/**
 * Subpage containing specific selectors and methods for a specific page
 */
class DashboardPage extends BasePage {
  selectors;

  constructor() {
    super();
    // Selectors for elements on the dashboard page
    this.selectors = {
      mainPageWrapper: '[class*="pageSwitcher__pageSwitcher"]',
      reportList: '#reportList',
      reportItems: '.report-item',
      addReportButton: '#addReportButton',
      logoutButton: '#logoutButton',
      searchByNameInput: '[placeholder="Search by name"]',
      addDashboardButton: '[class*="addDashboardButton__add"] button',
      notificationDashboardAdded: ".notification-transition-enter-done",
      deleteButton: '[class*="icon__icon-delete"]'
    };
  }

  async isDashboardPageLoaded() {
    return await $(this.selectors.mainPageWrapper).isDisplayed();
  }

  async isDashboardAddedProperly() {
    return $(this.selectors.notificationDashboardAdded).getText().includes('Dashboard has been added');
  }

  async isDashboardDeletedProperly() {
    return $(this.selectors.notificationDashboardAdded).getText().includes('Dashboard has been deleted');
  }

  async addNewModalLoadsProperly() {
    return $('[class*="modalContent__modal-content"]').isDisplayed();
  }

  async clickAddReportButton() {
    await $(this.selectors.addReportButton).click();
  }

  async clickAddNewDashboardButton() {
    await $(this.selectors.addDashboardButton).click();
  }

  async clickFirstDeleteButton() {
    const deleteButtons = await $$(this.selectors.deleteButton);
    await deleteButtons[0].click();
  }

  async searchDashboardByName(name) {
    const searchInput = await $(this.selectors.searchByNameInput);
    await searchInput.setValue(name);
    await browser.pause(1000); // Wait for potential debounce or API calls
    await browser.keys('Enter'); // 'Enter' key action
  }
}

module.exports = new DashboardPage();