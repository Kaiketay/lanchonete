describe('fluxo de compra', () => {
  it('adiciona item e finaliza', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Adicionar').first().click();
    cy.get('#cartButton').click();
    cy.contains('Finalizar Pedido').click();
    cy.contains('Pedido realizado');
  });
});
