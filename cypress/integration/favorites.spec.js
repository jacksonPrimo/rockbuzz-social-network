/// <reference types="cypress" />

describe('Search', ()=>{
  it('should search a user in search bar and navigate to search page', ()=>{
    cy.visit('http://localhost:3000/feed')
    cy.get('[data-test-id="tweet-button-favorite"]').first().click()
    cy.get('[data-test-id="link-to-my-profile"]').click()
    cy.get('[data-test-id="favorite-option"]').click()
    cy.get('[data-test-id="favorite"]').should('have.length', 1)
  })
})