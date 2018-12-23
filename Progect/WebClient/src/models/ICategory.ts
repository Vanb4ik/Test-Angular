import {IIdentifiable} from "./IIdentifiable";

export interface ICategory extends IIdentifiable {
  name: string;
  userId: string;
  imageSrc?: string;
}
