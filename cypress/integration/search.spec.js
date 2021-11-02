/// <reference types="cypress" />

describe('Search', ()=>{
  it('should search a user in search bar and navigate to search page', ()=>{
    cy.visit('http://localhost:3000/feed')
    cy.get('[data-test-id="search"]').type('scott').type('{enter}')
  })
  it('should search a user in search bar and obtain two results', ()=>{
    cy.visit('http://localhost:3000/feed')
    cy.get('[data-test-id="search"]').type('a').type('{enter}')
    cy.get('[data-test-id="search-result"]').should('have.length', 2)
  })
  it('should search search results empty', ()=>{
    cy.visit('http://localhost:3000/feed')
    cy.get('[data-test-id="search"]').type('10000').type('{enter}')
    cy.get('[data-test-id="not-result"]')
  })
})