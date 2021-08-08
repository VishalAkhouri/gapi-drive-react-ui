describe('GAPI Signin', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    })

    it('should show signin page', () => {
        cy.get('h1').should(
            'contain',
            'Authorise Google Drive access'
          )
    });

    it('should show signin button initially', () => {
        cy.get('button').should(
            'contain',
            'Sign In (Using Google OAuth2)'
          )
    });

});
