describe('Teste de Adição de Novo Cliente', () => {
  beforeEach(() => {
    // Acessando a URL da página
    cy.visit('http://localhost:4200/new-customer');
  });



   it('Deve adicionar um novo cliente com sucesso', () => {
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
    
    
  });

  it('Deve exibir um erro se o nome não for preenchido', () => {
    // Deixa o campo de nome vazio
    cy.get('input[formControlName="name"]').clear();

    // Preenche o email
    cy.get('input[formControlName="email"]')
      .type('cliente.semnome@example.com')
      .should('have.value', 'cliente.semnome@example.com');

    // Submete o formulário
     cy.wait(1000); 
    // Submete o formulário
   

    // Verifica se a mensagem de erro "Nome é obrigatório" está visível
    cy.contains('Nome é obrigatório').should('be.visible');
  });

  it('Deve exibir um erro se o email não for válido', () => {
    // Preenche o nome
cy.get('input[formControlName="email"]').clear();
 cy.get('input[formControlName="email"]')
      .type('carlos.eduardoexample.com')
      .should('have.value', 'carlos.eduardoexample.com'); 
    // Preenche o email com um formato inválido
   
    cy.get('input[formControlName="name"]')
      .type('Carlos Eduardo')
      .should('have.value', 'Carlos Eduardo');

    cy.wait(1000); 
    // Submete o formulário
 

    // Verifica se a mensagem de erro "Email é obrigatório" está visível
    cy.contains('Email é obrigatório').should('be.visible');
  });

  it('Deve desabilitar o botão de salvar quando o formulário for inválido', () => {
    // Deixa o formulário inválido (sem preencher os campos)
    cy.get('button').should('be.disabled'); // Verifica se o botão de salvar está desabilitado
  });

  it('Deve habilitar o botão de salvar quando o formulário for válido', () => {
    // Preenche o nome e o email de forma válida
    cy.get('input[formControlName="name"]')
      .type('Maria Oliveira')
      .should('have.value', 'Maria Oliveira');
      
    cy.get('input[formControlName="email"]')
      .type('maria.oliveira@example.com')
      .should('have.value', 'maria.oliveira@example.com');

    // Verifica se o botão de salvar está habilitado
    cy.get('button').should('not.be.disabled');
  });
  
   
  
 
  it('Deve verificar se a lista contém 4 registros', () => {
    // Visita a página onde a lista está localizada
    cy.visit('http://localhost:4200/customers'); // Substitua pela URL correta

    // Aguarda a lista carregar (caso seja assíncrona)
    cy.get('table tbody tr', { timeout: 10000 }) // Garante que está acessando as linhas da tabela
      .should('have.length', 4); // Verifica se existem 4 linhas na tabela
  });
  
  it('Deve carregar a lista de clientes rapidamente', () => {
    const startTime = Date.now();

    // Visita a página
    cy.visit('http://localhost:4200/customers');

    // Aguarda o carregamento de um elemento essencial (exemplo: a tabela de clientes)
    cy.get('table tbody tr', { timeout: 10000 }).should('exist');

    // Calcula o tempo de carregamento
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Verifica se o tempo de carregamento é aceitável (e.g., menos de 2 segundos)
    expect(loadTime).to.be.lessThan(2000); // Ajuste o limite conforme necessário
    cy.log(`Tempo de carregamento: ${loadTime} ms`);
  });
  
});
