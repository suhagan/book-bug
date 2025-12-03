describe("BookBug Registration Flow", () => {

  it("Navigates to Step 1 from the homepage", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.url().should("include", "/register/step-1");
    cy.contains("Step 1 – Personal Data");
  });

  it("Step 1: validates required fields", () => {
    cy.visit("/register/step-1");

    cy.contains("Next").should("be.disabled");

    cy.get('input#firstName').type("Suhagan");
    cy.get('input#lastName').type("Mostahid");
    cy.get('input#dateOfBirth').type("1986-12-24");
    cy.get('select#gender').select("Female");

    cy.contains("Next").should("not.be.disabled").click();
  });

  it("Step 2: fills contact info", () => {
    cy.visit("/register/step-2");
    cy.contains("Next").should("be.disabled");

    cy.get('input#email').type("suhagan.mostahid@gmail.com");
    cy.get('input#phone').type("0700866547");

    cy.contains("Next").should("not.be.disabled").click();
  });

  it("Step 3: fills address info", () => {
    cy.visit("/register/step-3");
    cy.contains("Next").should("be.disabled");

    cy.get('input#street').type("Redskapsvägen 10");
    cy.get('input#zipcode').type("16243");
    cy.get('input#city').type("Vällingby");

    cy.contains("Next").should("not.be.disabled").click();
  });

  it("Step 4: fills visit info", () => {
    cy.visit("/register/step-4");
    cy.contains("Next").should("be.disabled");

    cy.get('input#purpose').type("Reading and Buying");
    cy.get('input#dept').type("Novels");

    cy.contains("Next").should("not.be.disabled").click();
  });

  it("Step 5: submits and resets", () => {
    cy.visit("/register/step-5");

    cy.get('input[type="checkbox"]').check();

    cy.contains("Confirm & Submit").click();

    cy.contains("Thank you").should("exist");

    cy.wait(1500); // Wait for redirect

    cy.url().should("eq", "http://localhost:5173/");
  });
});
