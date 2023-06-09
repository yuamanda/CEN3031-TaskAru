describe('signin', () => {
    it('Should not sign-in if no fields are entered', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[data-cy="Submit SignIn"]').click();
        cy.url().should('not.include', 'home');
    })

    it('Should go to signup page when signup link is clicked', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[data-cy="Go SignUp"]').click();
        cy.url().should('include', 'signup');
    })

    it('Should go to forgot password page when forgot password link is clicked', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[data-cy="Forgot Password"]').click();
        cy.url().should('include', 'forgotpassword');
    })

    it('Should successfully sign in', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[formControlName="email"]').type('testing@gmail.com', {force: true});
        cy.get('[formControlName="password"]').type('testing123', {force: true});
        cy.get('[data-cy="Submit SignIn"]').click();
        cy.url().should('include', 'home');
        cy.get('[data-cy="Sign In"]').should('not.exist');
        cy.get('[data-cy="Sign Up"]').should('not.exist');
        cy.get('[data-cy="Sign Out"]').should('exist');
    })

    it('Should successfully sign out', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[formControlName="email"]').type('testing@gmail.com', {force: true});
        cy.get('[formControlName="password"]').type('testing123', {force: true});
        cy.get('[data-cy="Submit SignIn"]').click();
        cy.url().should('include', 'home');
        cy.get('[data-cy="Sign In"]').should('not.exist');
        cy.get('[data-cy="Sign Up"]').should('not.exist');
        cy.get('[data-cy="Sign Out"]').should('exist');
        cy.get('[data-cy="Sign Out"]').click();
        cy.url().should('include', 'signin');
        cy.get('[data-cy="Sign In"]').should('exist');
        cy.get('[data-cy="Sign Up"]').should('exist');
        cy.get('[data-cy="Sign Out"]').should('not.exist');
    })

    it('Should successfully remember sign in', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[formControlName="email"]').type('testing@gmail.com', {force: true});
        cy.get('[formControlName="password"]').type('testing123', {force: true});
        cy.get('[data-cy="Remember Me"]').click();
        cy.get('[data-cy="Submit SignIn"]').click();
        cy.url().should('include', 'home');
        cy.get('[data-cy="Sign In"]').should('not.exist');
        cy.get('[data-cy="Sign Up"]').should('not.exist');
        cy.get('[data-cy="Sign Out"]').should('exist');
        cy.reload();
        cy.get('[data-cy="Sign In"]').should('not.exist');
        cy.get('[data-cy="Sign Up"]').should('not.exist');
        cy.get('[data-cy="Sign Out"]').should('exist');
    })

    it('Should successfully show notifications', () => {
        cy.visit('/')
        cy.get('[data-cy="Sign In"]').click();
        cy.url().should('includes', 'signin');
        cy.get('[formControlName="email"]').type('testing@gmail.com', {force: true});
        cy.get('[formControlName="password"]').type('testing123', {force: true});
        cy.get('[data-cy="Submit SignIn"]').click();
        cy.get('[data-cy="Notifications"]').click();
        cy.get('[data-cy="Notifications Bar"]').should('be.visible');
    })
})