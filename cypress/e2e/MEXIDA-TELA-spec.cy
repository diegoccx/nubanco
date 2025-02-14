describe('Teste de Adição de Novo Cliente', () => {
  beforeEach(() => {
    // Acessando a URL da página
    cy.visit('http://localhost:4200/new-customer');
  });



   it('Deve adicionar um novo cliente e logo em seguida excluir ele  com sucesso', () => {
   cy.scrollTo(0, 500) // Scroll the window 500px down
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
  
   it('Deve realizar um débito corretamente e atualizar o saldo', () => {
   cy.visit('http://localhost:4200/accounts');
   
    const accountId = '12345'; // Substitua pelo ID de uma conta válida
    const debitAmount = 100; // Valor a ser debitado

    // Preenche o número da conta no formulário de busca e pesquisa
    cy.get('input[formControlName="accountId"]').type('12345').should('have.value', '12345');
	cy.wait(1000); 
    cy.get('button').contains('Buscar').click();

    // Aguarda o carregamento das informações da conta
   // cy.get('div').contains(`Número da Conta : ${accountId}`).should('exist');
	


    // Captura o saldo inicial da conta
    cy.get('div')
      .contains('Saldo :')
      .next('label')
      .invoke('text')
      .then((initialBalanceText) => {
        const initialBalance = parseFloat(initialBalanceText.replace(',', ''));

        // Realiza a operação de débito
        cy.get('input[type="radio"][value="DEBIT"]').check();
        cy.get('input[formControlName="amount"]').type(debitAmount.toString());
        cy.get('input[formControlName="description"]').type('Teste de débito');
        cy.get('button').contains('SALVAR OPERAÇÃO').click();
		
		 cy.visit('http://localhost:4200/accounts');
		 
		 cy.get('input[formControlName="accountId"]').type('12345').should('have.value', '12345');
	cy.wait(1000); 
    cy.get('button').contains('Buscar').click();

        // Verifica se o saldo foi atualizado corretamente
        cy.get('div').contains('Saldo :').next('label').should(($updatedBalance) => {
          const updatedBalance = parseFloat($updatedBalance.text().replace(',', ''));
          expect(updatedBalance).to.equal(initialBalance - debitAmount);
		//  cy.log(`VALOR CORRETO AO REALIZAR O DÉBITO: ${initialBalance - debitAmount} `);
        });
		
        cy.log(`VALOR CORRETO AO REALIZAR O DÉBITO: ${initialBalance - debitAmount} `);
        // Opcional: Verifica se a nova operação aparece na lista
        cy.get('table tbody tr').first().within(() => {
          cy.get('td').eq(2).should('contain', 'DEBIT');
          cy.get('td').eq(3).should('contain', debitAmount.toFixed(2));
        });
		
		
      });
  });
  
  it('Deve exibir mensagem de erro ao tentar debitar mais do que o saldo', () => {
    const accountId = '12345'; // Conta existente no sistema
    const amount = 6000;      // Valor maior que o saldo atual
    const description = 'Teste de débito maior que o saldo';

    // Envia a requisição POST para a API
    cy.request({
      method: 'POST',
      url: 'http://localhost:8085/accounts/debit', // URL da API
      body: {
        accountId,
        amount,
        description,
      },
      failOnStatusCode: false, // Não falha no Cypress para erros 4xx/5xx
    }).then((response) => {
      // Verifica se o status retornado é 400
      expect(response.status).to.eq(400);

      // Verifica se a mensagem de erro é a esperada
      expect(response.body).to.eq('Saldo insuficiente');
	  cy.wait(1000);
	  
	  
	

    });
  });
  
 

 
  
});
