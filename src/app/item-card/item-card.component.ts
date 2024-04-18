import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../interfaces/item';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input() item!: Item;
}
