/// <reference types="cypress" />

describe('Search', ()=>{
  it('should redirect to feed', ()=>{
    cy.visit('http://localhost:3000/')
  })
  it('should load feed', ()=>{
    cy.visit('http://localhost:3000/feed')
  })
  it('should load feed', ()=>{
    cy.visit('http://localhost:3000/feed')
  })
  it('should load search', ()=>{
    cy.visit('http://localhost:3000/search')
  })
  it('should load profile', ()=>{
    cy.visit('http://localhost:3000/profile/@jack_primo')
  })
  it('should redirect from profile to feed because nickName is empty', ()=>{
    cy.visit('http://localhost:3000/profile/')
  })
})