import { ItemSize } from './item-size';

export interface TaskResult {
  itemName: string;
  itemSize: ItemSize;
  startTime: number;
  endTime?: number;
  errors: Array<string>;
}
