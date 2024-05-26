describe('Experiment Testing', () => {
  it('completes experiment', () => {
    cy.visit('https://kroxitrock.github.io/HCI-23-24-a-b-experiment/');

    const conductExperiment = () => {
      cy.get('button > span')
        .contains('Start Experiment')
        .click({ force: true });

      for (let i = 0; i < 6; i++) {
        cy.get('h1')
          .contains('Item: ')
          .then((task) => {
            // Leave only the name of the object
            const taskName = task.text().substring(5);
            cy.get('app-item-card').contains(taskName).click({ force: true });
          });
      }

      cy.get('button > span')
        .contains('Return to start')
        .click({ force: true });
    };
  });
});
