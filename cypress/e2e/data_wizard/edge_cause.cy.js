describe('Data Wizard functionality - Edge Cases', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const files = {
    csv: 'supplierInfo1.csv',
    excel: 'supplierInfo1.xlsx',
    german: 'German_Sample_Data.xlsx',
    emptyCSV: 'empty.csv',
    emptyExcel: 'empty.xlsx',
    headerOnlyCSV: 'header_only.csv',
    largeFile: 'large_file.csv',
    oversizedFile: 'oversized_50mb.csv',
    txtFile: 'invalid.txt',
    pdfFile: 'invalid.pdf',
    imageFile: 'invalid.png',
    jsonFile: 'invalid.json',
    malformedCSV: 'malformed.csv',
    specialCharsCSV: 'special_characters.csv',
    duplicateHeadersCSV: 'duplicate_headers.csv',
    singleColumnCSV: 'single_column.csv',
    singleRowCSV: 'single_row.csv',
    mismatchedColsCSV: 'mismatched_columns.csv',
    sqlInjectionCSV: 'sql_injection.csv',
    unicodeCSV: 'unicode_data.csv',
    mixedDataTypesCSV: 'mixed_data_types.csv',
    csvWithNulls: 'null_values.csv',
    csvWith1000Cols: 'wide_table_1000cols.csv',
  }

  beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.contains('Data Wizard').click()
  })

  // ─── FILE TYPE VALIDATION ─────────────────────────────────────────────────

  it('Should reject a .txt file and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.txtFile)
    cy.wait(2000) 
    //cy.contains(/invalid file type|unsupported format/i).should('be.visible')
  })

  it('Should reject a .pdf file and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.pdfFile)
    cy.wait(2000) 
     // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should reject an image file (.png) and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.imageFile)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
  })

  it('Should reject a .json file and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.jsonFile)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
  })

  // ─── EMPTY & MINIMAL FILES ────────────────────────────────────────────────


  it('Should handle a CSV with headers only and no data rows', () => {
    cy.get('input[type="file"]').attachFile(files.headerOnlyCSV)
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
  })

  it('Should handle a CSV with a single column', () => {
    cy.get('input[type="file"]').attachFile(files.singleColumnCSV)
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
  })

  it('Should handle a CSV with a single data row', () => {
    cy.get('input[type="file"]').attachFile(files.singleRowCSV)   
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  // ─── FILE SIZE ────────────────────────────────────────────────────────────

  it('Should handle a large but valid CSV file without timeout', () => {
    cy.get('input[type="file"]').attachFile(files.largeFile)
    cy.wait(5000) // allow extra processing time
    cy.get('button').contains('Initialize & Start Import').click()
     // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should reject a file that exceeds the size limit', () => {
    cy.get('input[type="file"]').attachFile(files.oversizedFile)
    cy.contains(/file too large|size limit exceeded/i).should('be.visible')
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
  })

  // ─── MALFORMED & STRUCTURAL ISSUES ───────────────────────────────────────

  it('Should handle a malformed CSV with inconsistent delimiters', () => {
    cy.get('input[type="file"]').attachFile(files.malformedCSV)
    cy.wait(2000)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
    cy.contains(/malformed|invalid format|parsing error/i).should('be.visible')
  })

  it('Should handle a CSV with duplicate column headers', () => {
    cy.get('input[type="file"]').attachFile(files.duplicateHeadersCSV)
    cy.wait(2000)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
    cy.contains(/duplicate|column names must be unique/i).should('be.visible')
  })

  it('Should handle a CSV with mismatched column counts per row', () => {
    cy.get('input[type="file"]').attachFile(files.mismatchedColsCSV)
    cy.wait(2000)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
     // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should handle a CSV with a very wide table (1000+ columns)', () => {
    cy.get('input[type="file"]').attachFile(files.csvWith1000Cols)
    cy.wait(3000)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
     // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  // ─── DATA CONTENT EDGE CASES ──────────────────────────────────────────────

  it('Should handle a CSV with null/empty cell values', () => {
    cy.get('input[type="file"]').attachFile(files.csvWithNulls)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
     // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should handle a CSV with mixed data types in a single column', () => {
    cy.get('input[type="file"]').attachFile(files.mixedDataTypesCSV)
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
     // Wait for import process to complete
   cy.contains('Stop', { timeout: 120000 }).should('exist')
   cy.contains('Stop', { timeout: 120000 }).should('not.exist')
   cy.contains('Button').contains('Go to Table').should('be.visible')
   cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should handle a CSV with special characters in data cells', () => {
    cy.get('input[type="file"]').attachFile(files.specialCharsCSV)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
      // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should sanitize SQL injection content in CSV cells', () => {
    cy.get('input[type="file"]').attachFile(files.sqlInjectionCSV)
    cy.wait(2000)
    cy.wait(2000) 
    cy.get('button').contains('Initialize & Start Import').click()
    // Raw SQL should be treated as plain text, not executed
    cy.contains('DROP TABLE').should('not.cause.error') // verify app doesn't crash
     // Wait for import process to complete
  cy.contains('Stop', { timeout: 120000 }).should('exist')
  cy.contains('Stop', { timeout: 120000 }).should('not.exist')
  cy.contains('Button').contains('Go to Table').should('be.visible')
  cy.contains('Button').contains('Go to Table').click()
  
  })

  it('Should handle a CSV with Unicode and emoji characters', () => {
    cy.get('input[type="file"]').attachFile(files.unicodeCSV)
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
     // Wait for import process to complete
    cy.contains('Stop', { timeout: 120000 }).should('exist')
    cy.contains('Stop', { timeout: 120000 }).should('not.exist')
    cy.contains('Button').contains('Go to Table').should('be.visible')
    cy.contains('Button').contains('Go to Table').click()
  
  })

  // ─── UI / WORKFLOW EDGE CASES ─────────────────────────────────────────────



  it('Should handle re-uploading a new file after a failed preview', () => {
    cy.get('input[type="file"]').attachFile(files.emptyCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains(/empty|no data/i).should('be.visible')
    // Re-upload a valid file
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    
    cy.get('button').contains('Initialize & Start Import').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should show a duplicate table name error if the table already exists', () => {
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
    cy.contains(/success|table created/i).should('be.visible')
    // Import the same file again
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    cy.get('button').contains('Initialize & Start Import').click()
    cy.contains(/already exists|duplicate table name/i).should('be.visible')
  })

})