import { Injectable } from '@angular/core';
import { ExperimentResult } from '../interfaces/experiment-result';
import { TaskResult } from '../interfaces/task-result';
import { ItemSize } from '../interfaces/item-size';

@Injectable({
  providedIn: 'root',
})
export class ExperimentService {
  private experimentResults: Array<ExperimentResult> = [];
  constructor() {
    const stringExperimentResults = localStorage.getItem('experimentResults');
    console.log(stringExperimentResults);

    if (stringExperimentResults) {
      this.experimentResults = JSON.parse(stringExperimentResults);
    }
  }

  public startExperiment() {
    this.experimentResults.push({ taskResults: [] });
  }

  public startTask(itemName: string): TaskResult {
    const taskResult = {
      itemName,
      itemSize: this.generateRandomItemSize(),
      startTime: Date.now(),
      errors: [],
    };
    this.getLastExperimentResult().taskResults.push(taskResult);

    return taskResult;
  }

  private generateRandomItemSize(): ItemSize {
    let bigItems = 0;
    let smallItems = 0;
    this.getLastExperimentResult().taskResults.forEach((taskResult) => {
      if (taskResult.itemSize === ItemSize.Big) {
        bigItems++;
      } else {
        smallItems++;
      }
    });

    if (bigItems == 5) {
      return ItemSize.Small;
    }

    if (smallItems == 5) {
      return ItemSize.Big;
    }

    return Math.random() < 0.5 ? ItemSize.Small : ItemSize.Big;
  }

  public logError(itemName: string) {
    this.getLastTaskResult().errors.push(itemName);
  }

  public finishTask(): boolean {
    this.getLastTaskResult().endTime = Date.now();
    console.log(JSON.stringify(this.getLastTaskResult()));

    // TODO: Change to 10
    const taskFinished = this.getLastExperimentResult().taskResults.length == 2;

    if (taskFinished) {
      this.saveExperimentResult();
    }

    return taskFinished;
  }

  private saveExperimentResult() {
    localStorage.setItem(
      'experimentResults',
      JSON.stringify(this.experimentResults)
    );
  }

  private getLastTaskResult(): TaskResult {
    const taskResults = this.getLastExperimentResult().taskResults;
    return taskResults[taskResults.length - 1];
  }

  private getLastExperimentResult(): ExperimentResult {
    return this.experimentResults[this.experimentResults.length - 1];
  }
}
