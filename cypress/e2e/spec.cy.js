describe('TODOMvc App', () => {

  // Teste 1 – Verifica se a aplicação abre corretamente
  it('Verifica se app está abrindo', () => {
    cy.visit('');
  });

  // Teste 2 – Adiciona uma tarefa e verifica se ela foi inserida corretamente
  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  // Teste 3 – Adiciona uma tarefa e depois a remove
  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  // Teste 4 – Filtra tarefas completas e ativas
  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    // Filtro "Ativos"
    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    // Filtro "Completos"
    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    // Filtro "Todos"
    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  // Teste 5 – Adiciona várias tarefas e verifica a contagem
  it('Adiciona múltiplas tarefas e verifica a contagem', () => {
    cy.visit('');

    const tarefas = ['Comprar leite', 'Estudar Cypress', 'Enviar pull request'];

    tarefas.forEach((tarefa) => {
      cy.get('[data-cy=todo-input]').type(`${tarefa}{enter}`);
    });

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', tarefas.length);
  });

  // Teste 6 – Marca uma tarefa como concluída e verifica a classe
  it('Marca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa para concluir{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  });

  // Teste 7 – Limpa todas as tarefas concluídas
  it('Limpa tarefas concluídas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa concluída{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=clear-completed-btn]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

});
