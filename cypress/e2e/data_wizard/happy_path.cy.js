describe('Data wizard functionality- Happy Path', () => {

  const validUser = {
   email: 'rohana@example.com',
   password: 'hefnu6-veDvez-domcen'
  }
  const File = {
    csvfilname :'supplierInfo1.csv',
    excelfilname :'customerInfo_sample.xlsx',
    germanlanguagefilename :'German_Sample_Data.xlsx'

  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
  cy.contains('Data Wizard').click()
    
})

it ('should load data wizard page and import csv file', () => {
  //load data wizard page
  cy.get('input[type="file"]').attachFile(File.csvfilname);
  cy.wait(2000) 
  cy.get('button').contains('Initialize & Start Import').click()
  // Wait for import process to complete
  cy.contains('Stop', { timeout: 120000 }).should('exist')
  cy.contains('Stop', { timeout: 120000 }).should('not.exist')
  cy.contains('Button').contains('Go to Table').should('be.visible')
  cy.contains('Button').contains('Go to Table').click()
  
  })
  
it ('should load data wizard page and import excel file', () => {
  //load data wizard page
  cy.get('input[type="file"]').attachFile(File.excelfilname);
  cy.wait(2000) 
  cy.get('button').contains('Initialize & Start Import').click()
  // Wait for import process to complete
  cy.contains('Stop', { timeout: 120000 }).should('exist')
  cy.contains('Stop', { timeout: 120000 }).should('not.exist')
  cy.contains('Button').contains('Go to Table').should('be.visible')
  cy.contains('Button').contains('Go to Table').click()
  
})

it('Should load data wizard page and import German language file', () => {
  cy.get('input[type="file"]').attachFile(File.germanlanguagefilename);
  cy.wait(2000) 
  cy.get('button').contains('Initialize & Start Import').click()
  // Wait for import process to complete
  cy.contains('Stop', { timeout: 120000 }).should('exist')
  cy.contains('Stop', { timeout: 120000 }).should('not.exist')
  cy.contains('Button').contains('Go to Table').should('be.visible')
  cy.contains('Button').contains('Go to Table').click()
  
  
})
})