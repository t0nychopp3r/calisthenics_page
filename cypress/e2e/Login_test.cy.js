describe("Calisthenics Switzerland Login Test", () => {
  beforeEach(() => {
    cy.visit("https://calisthenics-page.vercel.app/")
  })

  it("Should login with the test user defined", () => {
    cy.fixture("login-data.json").then((loginData) => {
      const user = loginData.users.find(user => user.username === "dennis.bilang@hotmail.com");

      // Get the current date
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day}`;
      
      cy.contains('Profile').click()

      // Login
      cy.get(':nth-child(2) > .inputField').type((user.username))
      cy.get(':nth-child(3) > .inputField').type((user.password))
      cy.get('.button').click()

      //Update Profile
      cy.get('#username').clear().type('Testuser_edit')
      cy.get(':nth-child(4) > .button').click()
      cy.get('#username').clear().type('Testuser')
      cy.get(':nth-child(4) > .button').click()

      //Change to workout logger and add Workout
      cy.contains('Your Journey').click()
      cy.get('[placeholder="Workout Name"]').type('Test Workout Cypress')
      cy.get('[placeholder="Street Park"]').type('Chur')
      cy.get('.date-input').clear().type(formattedDate)
      cy.get('.notes-input').type('Test Workout Cypress')
      cy.get('.satisfaction-input').type('7')
      cy.get('.button_table_green').click()

      //Edit Workout
      cy.get('[data-label="Satisfaction"] > .table_input').first().clear().type('8')
      cy.get('tr > .form-workouts > .button_table_green').first().click()
      // must be deleted that the test can be run again
      cy.get('.button_table_red').click()
    })
  })
})
