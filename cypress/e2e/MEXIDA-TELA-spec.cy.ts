describe('Teste de Adição de Novo Cliente', () => {
  beforeEach(() => {
    // Acessando a URL da página
    cy.visit('http://localhost:4200/new-customer');
  });



   it('Deve adicionar um novo cliente e logo em seguida excluir ele  com sucesso', () => {
  // cy.scrollTo(0, 500) // Scroll the window 500px down
  // cy.scrollTo(500, 0) // Scroll the window 500px down
  
  // Preenche o nome
    cy.get('input[formControlName="name"]')
      .type('Carlos Eduardo222')
      .should('have.value', 'Carlos Eduardo222'); // Verifica se o nome foi preenchido corretamente

    // Preenche o email
    cy.get('input[formControlName="email"]')
      .type('carlos.eduardo@example.com')
      .should('have.value', 'carlos.eduardo@example.com'); // Verifica se o email foi preenchido corretamente
  cy.wait(1000); 
    // Submete o formulário
  
  });
  
 

 
  
});
