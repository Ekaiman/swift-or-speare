describe('Game flows', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://taylorswiftapi.herokuapp.com/get-all?album=fearless',
      {
        response: 200,
        fixture: 'swift-data.json'
      }
    )
  })

  it('Should be able to select 10 second ', () => {
    cy.visit('http://localhost:3000/')
      .get('.1')
      .contains('10 Seconds')
      .click()
      .get('.input1')
      .should('be.checked')
      .get('.input2')
      .should('not.be.checked')
      .get('.input3')
      .should('not.be.checked')
  })

  it('should be able to select 15 seconds', () => {
    cy.get('.2')
      .contains('15 Seconds')
      .click()
      .get('.input2')
      .should('be.checked')
      .get('.input1')
      .should('not.be.checked')
      .get('.input3')
      .should('not.be.checked')
  })

  it('should be able to select 20 seconds', () => {
    cy.get('.3')
      .contains('20 Seconds')
      .click()
      .get('.input3')
      .should('be.checked')
      .get('.input2')
      .should('not.be.checked')
      .get('.input1')
      .should('not.be.checked')
  })

  it('should not be able to click start game until a time has been selected', () => {
    cy.visit('http://localhost:3000/').get('.start-game').should('be.disabled')
  })

  it('should be able to start the game', () => {
    cy.get('.1')
      .contains('10 Seconds')
      .click()
      .get('.start-game')
      .should('not.be.disabled')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/game-begin')
  })

  it('should be able to click swift or speare', () => {
    cy.get('.swift-button').click().get('.speare-button').click()
  })

  it('should redirect to end game screen when timer is up', () => { 

    cy.wait(10000)
      .get('.game-over')
      .contains('Game over!')
    .get('.home-button')
  })

  it('should be able to redirect back to home', () => { 
    cy.get('.home-button')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/')
    
  })

  it('should have a back to home button if user visits wrong page without starting game', () => { 
    cy.visit('http://localhost:3000/game-begin')
      .get('p')
      .contains('Oops! You have to start on the home screen!')
      .get('.home-button')
      .contains('Back to Home')
  })

  it('should go back to home when button is clicked', () => { 
    cy.get('.home-button')
      .contains('Back to Home')
      .click()
      .url()
      .should('eq', 'http://localhost:3000/')
  })
})
