/// <reference types="cypress" />

context('Skeleton - e2e', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2020, 6, 1), ['Date']);
    cy.visit('/');
  });

  it('has the global window object', () => {
    cy.window().should('have.property', 'top');
  });

  it('has the document object', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });
});
