
describe('Main Dashboard ', () => {

const validUser = {

    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  beforeEach(() => {

   cy.login(validUser.email, validUser.password)
  })

it('View dashboard status ', () => {
cy.intercept('GET', '/api/dashboard').as('getDashboard')
cy.visit('/dashboard')
cy.wait('@getDashboard').its('response.statusCode').should('eq', 200)
})
})