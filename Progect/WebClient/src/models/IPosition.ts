import {IIdentifiable} from "./IIdentifiable";

export interface IPosition extends IIdentifiable {
  name: string;
  userId: string;
  categoryId: string;
  cost: number;
}
