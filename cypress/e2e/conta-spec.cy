describe('Teste de Débito', () => {
  beforeEach(() => {
    // Acessa a página inicial das contas
    cy.visit('http://localhost:4200/accounts');
  });

  it('Deve realizar um débito corretamente e atualizar o saldo', () => {
    const accountId = '12345'; // Substitua pelo ID de uma conta válida
    const debitAmount = 100; // Valor a ser debitado

    // Preenche o número da conta no formulário de busca e pesquisa
    cy.get('input[formControlName="accountId"]').type(accountId);
    cy.get('button').contains('Buscar').click();

    // Aguarda o carregamento das informações da conta
    cy.get('div').contains(`Número da Conta : ${accountId}`).should('exist');

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

        // Verifica se o saldo foi atualizado corretamente
        cy.get('div').contains('Saldo :').next('label').should(($updatedBalance) => {
          const updatedBalance = parseFloat($updatedBalance.text().replace(',', ''));
          expect(updatedBalance).to.equal(initialBalance - debitAmount);
        });

        // Opcional: Verifica se a nova operação aparece na lista
        cy.get('table tbody tr').first().within(() => {
          cy.get('td').eq(2).should('contain', 'DEBIT');
          cy.get('td').eq(3).should('contain', debitAmount.toFixed(2));
        });
      });
  });
});
