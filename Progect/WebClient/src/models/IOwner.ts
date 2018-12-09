import {IIdentifiable} from "./IIdentifiable";

export interface IOwner extends IIdentifiable{
  email: string
  passwordHash: string
}
