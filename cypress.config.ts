import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    watchForFileChanges: true,
    experimentalSessionAndOrigin: true,
    supportFile: "cypress/support/e2e.ts",
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
