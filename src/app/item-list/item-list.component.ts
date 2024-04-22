import { Component } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  selctedItem?: Item;
  items: Array<Item> = [];
  isBig: boolean = false;

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
      this.snackBar.open('Fail', 'Done');
      return;
    }

    const finished = this.experimentService.finishTask();
    this.snackBar.open('Success', 'Done');

    if (finished) {
      this.router.navigate(['/thank-you']);
      return;
    }

    this.resetExperiment(this.items);
  }

  private resetExperiment(items: Array<Item>) {
    this.shuffle(items);
    this.handleSelectedItem(items);
    const task = this.experimentService.startTask(this.selctedItem!.name);
    this.isBig = task.itemSize === ItemSize.Big ? true : false;
    this.handleItems(items);
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
