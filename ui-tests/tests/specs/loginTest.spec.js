import DashboardPage from "../page-objects/dashboard/DashboardPage.ts";
import  LoginPage  from "../page-objects/login/LoginPage.ts";
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Login Page UI Tests', () => {
    
    beforeEach(() => {
      // Runs before each test in this blockloginPage = new LoginPage();
      loginPage.navigateToLoginPage() // Navigate to the login page
    });

      
    it('should display an error message for invalid credentials', () => {
        loginPage.login('defaultsUserNotValid', 'invalidPassword');
        loginPage.isErrorMessageDisplayed();
        //let notificationContainerText = loginPage.getNotificationContainerMessage();

      // Verify error message is displayed
      loginPage.getNotificationContainerMessage()
        .should('contain', 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials');
    });
  
    it('should successfully log in with valid credentials', () => {
      // Enter valid credentials
      loginPage.login('default', '1q2w3e')
      loginPage.isSuccessfulLoginMessageDisplayed();
      dashboardPage.isDashboardPageLoaded();
    });
  
    xit('should log out successfully', () => {
      // Log in first
      cy.get('input[name="login"]').type('validUsername');
      cy.get('input[name="password"]').type('validPassword');
      cy.get('button[class*="loginForm__login-button"]').click();
  
      // Click on the user avatar to open the user menu
      cy.get('[class*="userBlock__avatar-wrapper"]').click();
  
      // Click the logout button
      cy.get('button:contains("Logout")').click();
  
      // Verify user is redirected to the login page
      cy.url().should('include', '/#login');
      cy.get('input[name="login"]').should('be.visible');
    });
  });
  