import {BaseApiClient as BaseApiclient} from "./BaseApiClient";
import {IIdentifiable} from "../../models/IIdentifiable";
import {IDataByPars, UrlParser} from "./UrlParser";

export interface ICrudApiClient<T extends IIdentifiable> {
  create(item: T): Promise<T>
  update(item: T): Promise<T>
  delete(item: IIdentifiable): Promise<T>
}

export abstract class CrudApiClient<T extends IIdentifiable> extends BaseApiclient implements ICrudApiClient<T> {

  abstract readonly createDataInfo: IDataByPars;
  abstract readonly updateDataInfo: IDataByPars;
  abstract readonly deleteDataInfo: IDataByPars;

  create(item: T): Promise<T> {
    return this.postJSON(this.createDataInfo, item)
  }

  update(item: T): Promise<T> {
    return this.putJSON(this.updateDataInfo, item)
  };

  delete(item: IIdentifiable): Promise<T> {
    return this.deleteJSON(this.deleteDataInfo, item)
  };
}

