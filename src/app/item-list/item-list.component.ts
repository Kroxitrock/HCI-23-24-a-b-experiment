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
  items: Array<Item> = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((jsonItems) => {
      const isBig = Math.random() < 0.5;
      jsonItems.forEach((item: Item) => (item.isBig = isBig));
      this.items = jsonItems;
    });
  }
}
