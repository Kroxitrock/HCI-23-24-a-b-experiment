import { Component } from '@angular/core';
import { Item } from '../interfaces/item';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemCardComponent, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  items: Array<Item> = [];

  ngOnInit(): void {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        name: 'test',
        imageURL: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        isBig: Math.random() < 0.5,
      });
    }
    this.items = arr;
  }
}
