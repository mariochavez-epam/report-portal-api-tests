import { BasePage } from "../BasePage";

export default class DeleteDashboardModal extends BasePage {
  selectors;
  constructor() {
    super();
    // Selectors for elements on the dashboard page
    this.selectors = {
      mainWrapper: '[class*="modalContent__modal-content"]',
      inputDashboardName: 'input[placeholder="Enter dashboard name"]',
      inputDashboardDescription: 'textarea[placeholder="Enter dashboard description"]',
      modalFooterWrapper: '[class*="modalFooter__modal-footer"]'
    };
  }

  deleteDashboardModalLoadsProperly() {
    cy.get(this.selectors.mainWrapper).should('be.visible');
  }

  // Method to click on the add report button
  clickDeleteDashboard() {
    cy.get(this.selectors.modalFooterWrapper).contains('Delete').click();
  }

}
