
describe('create new teant', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const validtenant ={
    name: 'cypress test automation',
    schema: 'cypresstenant',
    key: 'cypresstenant'
  }
 
  beforeEach(() => {

 cy.visit('https://new.tabletap.lk/admin/tenants')
 cy.get('[name="email"]').type(validUser.email)
 cy.get('[name="password"]').type(validUser.password)
 cy.contains('button', 'Sign In to Console').click()

  })
  
it('create tenant ', () => {
  cy.contains('button', 'Add Tenant').should('be.visible').click()
  cy.contains('h2, h3, div', 'Add New Tenant').should('be.visible')

  const uniqueId = Date.now().toString().slice(-6)
  const tenantName = `${validtenant.name},${uniqueId}`
  const tenantKey = `cypressTenant`

  cy.contains('label', 'Tenant Name')
    .parent()
    .find('input')
    .clear()
    .type(tenantName)

  cy.contains('label', 'Tenant Key')
    .parent()
    .find('input')
    .clear()
    .type(tenantKey)

  cy.contains('label', 'Schema')
    .parent()
    .find('input')
    .clear()
    .type(tenantKey)

  cy.contains('button', 'Create Tenant').should('not.be.disabled').click()
  cy.contains('h2, h3, div', 'Add New Tenant').should('not.exist')
     
  })

})     
