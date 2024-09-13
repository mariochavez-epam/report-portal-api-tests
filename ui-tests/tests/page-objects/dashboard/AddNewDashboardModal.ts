import { BasePage } from "../BasePage";

export default class AddNewDashboardModal extends BasePage {
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

  addNewModalLoadsProperly() {
    cy.get(this.selectors.mainWrapper).should('be.visible');
  }

  // Method to click on the add report button
  clickAddNewDashboard() {
    cy.get(this.selectors.modalFooterWrapper).contains('Add').click();
  }

  typeDashboardName(name){
    cy.get(this.selectors.inputDashboardName).clear().type(name).wait(1000)
    .type('{enter}');;
  }

  typeDashboardDescription(description){
    cy.get(this.selectors.inputDashboardDescription).clear().type(description).wait(1000)
    .type('{enter}');;
  }
}
