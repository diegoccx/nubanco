describe('Teste Básico', () => {
  it('Deve acessar a página inicial', () => {
    cy.visit('http://localhost:4200'); // Substitua pela URL da sua aplicação
    cy.contains('Novo Cliente').should('exist');
  });
});
