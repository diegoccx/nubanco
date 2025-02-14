describe('Teste de Débito', () => {
  beforeEach(() => {
    // Acessa a página inicial das contas
    cy.visit('http://localhost:4200/accounts');
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
