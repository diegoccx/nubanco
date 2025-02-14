describe('Testar Salvar Cliente', () => {
  it('Deve salvar um novo cliente', () => {
    // Dados do cliente a ser salvo
    const customerData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    // Realizando a requisição POST
    cy.request({
      method: 'POST',
      url: 'http://localhost:8085/customers', // URL da API
      headers: {
        'Content-Type': 'application/json'
      },
      body: customerData // Corpo da requisição
    }).then((response) => {
      // Verificando se o status da resposta é 201 (Created)
      expect(response.status).to.eq(201);

      // Verificando se a resposta contém os dados corretos
      expect(response.body).to.have.property('name', customerData.name);
      expect(response.body).to.have.property('email', customerData.email);
    });
  });
});
