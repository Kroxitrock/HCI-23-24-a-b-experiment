import { Component } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemCardComponent, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  selctedItem?: Item;
  items: Array<Item> = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((jsonItems) => {
      for (let i = jsonItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [jsonItems[i], jsonItems[j]] = [jsonItems[j], jsonItems[i]];
      }
      const isBig = Math.random() < 0.5;
      jsonItems.forEach((item: Item) => (item.isBig = isBig));
      this.selctedItem =
        jsonItems[Math.floor(Math.random() * (jsonItems.length - 1))];
      this.items = jsonItems;
    });
  }
}
