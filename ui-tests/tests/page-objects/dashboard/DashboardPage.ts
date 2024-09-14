import { BasePage } from "../BasePage";

export default class DashboardPage extends BasePage {
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
      notificationDashboardAdded: ".notification-transition-enter-done"
    };
  }

  // Method to verify if the dashboard page is loaded
  isDashboardPageLoaded() {
    cy.get(this.selectors.mainPageWrapper).should('be.visible');
  }



  isDasbhoardAddedProperly() {
    cy.get(this.selectors.notificationDashboardAdded).contains('Dashboard has been added').should('be.visible');
  }


  addNewModalLoadsProperly() {
    cy.get('[class*="modalContent__modal-content"]').should('be.visible');
  }

  // Method to click on the add report button
  clickAddReportButton() {
    cy.get(this.selectors.addReportButton).click();
  }

  clickAddNewDashboardButton() {
    cy.get(this.selectors.addDashboardButton).click();
  }


  searchDashboardByName(name){
    cy.get(this.selectors.searchByNameInput).clear().type(name).wait(1000)
    .type('{enter}');;
  }
}
