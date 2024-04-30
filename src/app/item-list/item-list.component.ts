import { Component } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExperimentService } from '../services/experiment.service';
import { ItemSize } from '../interfaces/item-size';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    ItemCardComponent,
    CommonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  selctedItem?: Item;
  items: Array<Item> = [];
  isBig: boolean = false;
  progress = 0;

  constructor(
    private itemService: ItemService,
    private experimentService: ExperimentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((jsonItems) => {
      this.experimentService.startExperiment();
      this.resetExperiment(jsonItems);
    });
  }

  itemClicked(clickedItem: Item) {
    if (clickedItem !== this.selctedItem) {
      this.experimentService.logError(clickedItem.name);
      this.snackBar.open('Incorrect', '', {
        duration: 2000,
        panelClass: ['incorrect-snackbar'],
      });
      return;
    }

    const finished = this.experimentService.finishTask();
    this.snackBar.open('Correct', '', {
      duration: 2000,
      panelClass: ['correct-snackbar'],
    });

    if (finished) {
      this.router.navigate(['/thank-you']);
      return;
    }

    this.resetExperiment(this.items);
  }

  private resetExperiment(items: Array<Item>) {
    this.progress =
      ((this.experimentService.getLastExperimentResult().taskResults.length +
        1) /
        6.0) *
      100;
    this.shuffle(items);
    this.handleSelectedItem(items);
    const task = this.experimentService.startTask(this.selctedItem!.name);
    this.isBig = task.itemSize === ItemSize.Big ? true : false;
    this.handleItems(items);
    this.scrollToTop();
  }

  private scrollToTop() {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }

  private shuffle(items: Array<Item>): void {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  private handleItems(items: Array<Item>): void {
    items.forEach((item: Item) => (item.isBig = this.isBig));
    this.items = items;
  }

  private handleSelectedItem(items: Array<Item>): void {
    this.selctedItem = items[Math.floor(Math.random() * (items.length - 1))];
  }
}
