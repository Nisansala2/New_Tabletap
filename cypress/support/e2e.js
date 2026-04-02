// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import cypress-file-upload plugin
import 'cypress-file-upload'

// Ignore a known production React runtime error (#418) coming from the app.
// This keeps Cypress from failing due to an unrelated frontend exception.
Cypress.on('uncaught:exception', (err) => {
	if (err && err.message && err.message.includes('Minified React error #418')) {
		return false
	}
})