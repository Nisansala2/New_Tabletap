describe('Conversion List functionality- Happy Path', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const listName = 'cypress_conversion_list1'
  

const openOrCreateConversionList = (name) => {
    const findAndOpen = (attemptsLeft = 4) => {
      cy.get('body').then(($body) => {
        const existingItem = $body
          .find('*')
          .toArray()
          .find((el) => el.textContent && el.textContent.trim() === name)

        if (existingItem) {
          cy.wrap(existingItem).click()
          return
        }

        if (attemptsLeft > 0) {
          cy.wait(500)
          findAndOpen(attemptsLeft - 1)
          return
        }

        cy.contains('New Conversion List').click()
        cy.get('input[placeholder="New list name"]').clear().type(name)
        cy.contains('button', 'Save').click({timeout: 5000})
        // Wait for creating to finish and loading success
        cy.contains('button', /Creating|Saving/i, { timeout: 20000 }).should('not.exist')
        cy.contains(name, { timeout: 10000 }).should('be.visible')
      })
    }

    findAndOpen()
}
  
  beforeEach(() => {
  cy.login(validUser.email, validUser.password)
          
   cy.contains('Conversion List').click()
  
    
  });
  
  it('Create, Add values, export conversion list', () => {

  openOrCreateConversionList(listName)

  cy.contains(listName).should('be.visible')
  cy.wait(2000)

  cy.contains(listName).click()
  cy.contains('Add Value').click()
  cy.get('input[placeholder="Old Value"]')
    .clear()
    .type('ABC')
  cy.get('input[placeholder="New Value"]')
    .clear()
    .type('XYZ')

  cy.contains('button', 'Save').click()
     
  })

  it('Export conversion list', () => {
     cy.contains(listName).click()
    cy.contains('Export').click()
    cy.get('button').contains('Export').click()
  })


  it('Import conversion list', () => {
    cy.contains(listName).click()
    cy.contains('Import').click()
    const filePath = 'company_conversions.csv';
    cy.get('input[type="file"]').attachFile(filePath)
    cy.get('button').contains('Start Import').click()
  })

  it('Delete conversion list', () => {
    cy.contains(listName).click()
    cy.get('[title="Delete conversion list"]').click()
    cy.get('button').contains('Confirm deletion').click()
  })
  
})