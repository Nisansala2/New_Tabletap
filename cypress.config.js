const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  projectId: 'eraj8g',
  allowCypressEnv: false,
 
  e2e: {
    chromeWebSecurity: false, // ✅ disable browser security
 
    setupNodeEvents(on, config) {
      // ✅ ignore SSL certificate errors
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
 
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--ignore-certificate-errors');
          launchOptions.args.push('--ignore-ssl-errors');
          launchOptions.args.push('--allow-insecure-localhost');
        }
 
        // ✅ Firefox support
        if (browser.name === 'firefox') {
          launchOptions.preferences['network.stricttransportsecurity.preloadlist'] = false;
          launchOptions.preferences['security.cert_pinning.enforcement_level'] = 0;
        }
 
        return launchOptions;
      });
    },
  },
});