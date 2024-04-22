import { Component } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemCardComponent, CommonModule, MatGridListModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  selctedItem?: Item;
  items: Array<Item> = [];
  isBig: boolean = false;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((jsonItems) => {
      this.shuffle(jsonItems);
      this.isBig = Math.random() < 0.5;
      this.handleItems(jsonItems);
    });
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
    this.handleSelectedItem();
  }

  private handleSelectedItem(): void {
    this.selctedItem =
      this.items[Math.floor(Math.random() * (this.items.length - 1))];
  }
}
