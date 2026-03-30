
describe('Main Dashboard ', () => {

const validUser = {

    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  beforeEach(() => {
  cy.intercept('GET', '**/api/dashboard*').as('getDashboard')

  cy.login(validUser.email, validUser.password)
  
  })

it('View dashboard status ', () => {
  cy.get('body').should('contain', 'Dashboard')
 

})
})