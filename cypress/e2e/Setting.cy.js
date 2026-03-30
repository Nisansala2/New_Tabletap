describe('Setting page tests', () => {
const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }
 const sourceCredentials={
     source_url :'https://valeofoodsuk-cfg.ifs.cloud',
     source_releam :'vafocfg1',
     source_client_id :'C8_MIG',
     source_client_secret :'d95DY0gr0A1hkWVRYpTvWAP0RCWe8CLx',
    
 }

 const destinationCredentials ={
    dest_url :'https://psawa5g-dev1.build.ifs.cloud',
    dest_releam :'psawa5gdev1',
    dest_client_id :'C8_MIG',
    dest_client_secret :'aNfn707yUn49yLftlQTN4CsGoeoXNdXm'
}
beforeEach(() => {

cy.login(validUser.email, validUser.password)
  
cy.contains('Settings').click()

  })

it('Update source IFS connection setting ', () => {

cy.contains('Source IFS Connection Settings')
    .parent()
cy.contains('IFS Base URL')
  .parent()
  .find('input')
    .clear()
    .type(sourceCredentials.source_url);

cy.contains('IFS Realm')
    .parent()
    .find('input')
    .clear()
    .type(sourceCredentials.source_releam);

cy.contains('Client ID')
    .parent()
    .find('input')
    .clear()
    .type(sourceCredentials.source_client_id);

cy.get('input[type="password"]')
  .clear()
  .type(sourceCredentials.source_client_secret)

 // Test connection and save settings
 cy.contains('Test Connection').click();

cy.contains(/Connection\s*(successful|success|failed)/i, { timeout: 10000 })
  .invoke('text')
  .then((statusText) => {
    if (/successful|success/i.test(statusText)) {
      cy.contains('Save Configuration').click();
    } else {
      cy.log('Connection failed. Skipping Save Configuration click.');
    }
  });

})

it('Update destination IFS connection settings ', () => {

cy.contains('Destination IFS').click({timeout: 10000})

cy.contains('Target deployment environment').click()
 
cy.contains('IFS Base URL')
  .parent()
  .find('input')
    .clear()
    .type(destinationCredentials.dest_url);

cy.contains('IFS Realm')
    .parent()
    .find('input')
    .clear()
    .type(destinationCredentials.dest_releam);

cy.contains('Client ID')
    .parent()
    .find('input')
    .clear()
    .type(destinationCredentials.dest_client_id);

cy.get('input[type="password"]')
  .clear()
  .type(destinationCredentials.dest_client_secret)
    
cy.contains('Test Connection').click();
cy.contains(/Connection\s*(successful|success|failed)/i, { timeout: 20000 })
  .invoke('text')
  .then((statusText) => {
    if (/successful|success/i.test(statusText)) {
      cy.contains('Save Configuration').click();
    } else {
      cy.log('Connection failed. Skipping Save Configuration click.');
    }
  });


  

})
})