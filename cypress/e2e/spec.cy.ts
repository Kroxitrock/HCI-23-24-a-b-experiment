import { DataEntry } from '../model/data-entry';

const clickOnItem = (time: number | undefined) => {
  cy.wait(time!);

  cy.get('h1')
    .contains('Item: ')
    .then((task) => {
      // Leave only the name of the object
      const taskName = task.text().substring(5);
      cy.get('app-item-card').contains(taskName).click({ force: true });
    });
};

const conductExperiment = (
  smallDesignTimes: Array<number>,
  bigDesignTimes: Array<number>
) => {
  cy.get('button > span').contains('Start Experiment').click({ force: true });

  for (let i = 0; i < 6; i++) {
    cy.get('mat-card').then((card) => {
      if (card.hasClass('big-card')) {
        clickOnItem(bigDesignTimes.pop());
      } else {
        clickOnItem(smallDesignTimes.pop());
      }
    });
  }

  cy.get('button > span').contains('Return to start').click({ force: true });
};

describe('Experiment Testing', () => {
  it('completes experiment', () => {
    cy.visit('https://kroxitrock.github.io/HCI-23-24-a-b-experiment/');
    cy.fixture('ab_experiment_sample_data').then((data) => {
      const bigDesignTimes: Array<number> = [];
      const smallDesignTimes: Array<number> = [];

      data.forEach((speed: DataEntry) => {
        if (speed.design_size === 'big_design') {
          bigDesignTimes.push(speed.time_needed * 1000);
        } else {
          smallDesignTimes.push(speed.time_needed * 1000);
        }
      });

      for (let i = 0; i < 10; i++) {
        conductExperiment(smallDesignTimes, bigDesignTimes);
      }

      cy.get('button > span')
        .contains('Download old results')
        .click({ force: true });
    });
  });
});
