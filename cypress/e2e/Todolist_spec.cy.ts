const generateRandomString = (length: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const testMail = `${generateRandomString(5)}@test.test`;
const testPassword = generateRandomString(8);
const testName = generateRandomString(5);

describe('Signup And Signin Test', () => {
  // this cause many unnecessary accounts in DB. Better to use Docker to reset in the future.
  it('Signup process', () => {
    cy.intercept('/signup').as('signupAccount');
    cy.visit(`/signup`);
    cy.get('.signup-mail-input').type(testMail);
    cy.get('.signup-name-input').type(testName);
    cy.get('.signup-password-input').type(testPassword);
    cy.get('.signup-button').click();
    cy.wait('@signupAccount').its('response.statusCode').should('eq', 201);
  });

  it('Signin process', () => {
    cy.intercept('/login').as('signinAccount');
    cy.visit('/signin');
    cy.get('.signin-mail-input').type(testMail);
    cy.get('.signin-password-input').type(testPassword);
    cy.get('.signin-button').click();
    cy.wait('@signinAccount').its('response.statusCode').should('eq', 200);
  });
});

describe('Todo Test', () => {
  beforeEach(() => {
    cy.intercept('/login').as('signinAccount');
    cy.visit('/signin');
    cy.get('.signin-mail-input').type(testMail);
    cy.get('.signin-password-input').type(testPassword);
    cy.get('.signin-button').click();
    cy.wait('@signinAccount');
  });

  it('Create Todo', () => {
    cy.intercept('/create').as('createTodo');
    cy.get('.todo-input input').type('test todo');
    cy.get('.todo-input button').click();
    cy.get('@createTodo').then(() => {
      cy.get('.todo-card-content')
        .first()
        .invoke('text')
        .should('equal', 'test todo');
    });
  });

  it('Check Todo', () => {
    cy.intercept('/todo/*').as('updateTodo');
    cy.get('.todo-card').first().click();
    cy.get('@updateTodo').then(() => {
      cy.get('.todo-card .checked').first().should('exist');
    });
  });

  it('Delete Todo', () => {
    cy.intercept('/todo/*').as('deleteTodo');
    cy.get('.todo-card-delete-button').first().click();
    cy.get('@deleteTodo').then(() => {
      cy.get('.todo-card').should('not.exist');
    });
  });
});
