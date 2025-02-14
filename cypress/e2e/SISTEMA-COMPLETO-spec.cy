describe('Teste de Adição de Novo Cliente', () => {
  beforeEach(() => {
    // Acessando a URL da página
    cy.visit('http://localhost:4200/new-customer');
  });



   it('Deve adicionar um novo cliente e logo em seguida excluir ele  com sucesso', () => {
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
  cy.get('button').contains('Salvar').click();


    // Espera o processo de submit
    cy.wait(1000); // Ajuste o tempo conforme necessário
	
	

 cy.visit('http://localhost:4200/customers');
	 
	  cy.contains('Carlos Eduardo222').should('be.visible');
  cy.contains('carlos.eduardo@example.com').should('be.visible');
    cy.wait(1000);
	
 cy.visit('http://localhost:4200/customers');
    // Localiza a última linha da tabela e o botão de exclusão
     cy.get('table tbody tr:last-child').within(() => {
      // Captura os detalhes do cliente para verificar depois da exclusão
     

      // Clica no botão de exclusão
      cy.get('button.btn-danger').click();
    });

cy.visit('http://localhost:4200/customers');   
cy.wait(1000);
    cy.contains('Carlos Eduardo222').should('not.exist'); 
	 cy.contains('carlos.eduardo@example.com').should('not.exist'); 
	
	
  });
  
 

 
  
});
