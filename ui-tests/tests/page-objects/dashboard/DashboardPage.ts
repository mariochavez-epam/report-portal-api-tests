import { BasePage } from "../BasePage";

export default class DashboardPage extends BasePage {
  selectors: { mainPageWrapper: string; reportList: string; reportItems: string; addReportButton: string; logoutButton: string; searchByNameInput: string; };
  constructor() {
    super();
    // Selectors for elements on the dashboard page
    this.selectors = {
      mainPageWrapper: '[class*="pageSwitcher__pageSwitcher"]',
      reportList: '#reportList',
      reportItems: '.report-item',
      addReportButton: '#addReportButton',
      logoutButton: '#logoutButton',
      searchByNameInput: '[placeholder="Search by name"]'
    };
  }

  // Method to verify if the dashboard page is loaded
  isDashboardPageLoaded() {
    cy.get(this.selectors.mainPageWrapper).should('be.visible');
  }

  // Method to click on the add report button
  clickAddReportButton() {
    cy.get(this.selectors.addReportButton).click();
  }

  // Method to get the list of reports displayed
  getReports() {
    return cy.get(this.selectors.reportItems);
  }

  // Method to logout from the application
  logout() {
    cy.get(this.selectors.logoutButton).click();
  }

  // Method to navigate to a specific report
  navigateToReport(reportId) {
    const reportSelector = `#report-${reportId}`; // Example selector for specific report
    cy.get(reportSelector).click();
  }

  searchDashboardByName(name){
    cy.get(this.selectors.searchByNameInput).clear().type(name).wait(3000)
    .type('{enter}');;
  }
}
