describe("BookBug Navigation", () => {

  it("Loads homepage and navigates to Cart", () => {
    cy.visit("/");
    cy.contains("Cart").click();
    cy.url().should("include", "/cart");
  });

  it("Goes to Home from Header link", () => {
    
    cy.contains("Home").click();

    cy.url().should("eq", "http://localhost:5173/");
  });

  it("Sign Up link always navigates to Step 1", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.url().should("include", "/register/step-1");
  });
});
