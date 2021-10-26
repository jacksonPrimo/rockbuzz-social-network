/// <reference types="cypress" />

describe('Feed', ()=>{
  it('search bar', ()=>{
    cy.visit('http://localhost:3000/feed')
    cy.get('[id=search]').type('publication name').type('{enter}')
  })
})