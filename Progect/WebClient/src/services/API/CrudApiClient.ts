import {BaseApiClient as BaseApiclient} from "./BaseApiClient";
import {IIdentifiable} from "../../models/IIdentifiable";
import {IDataByPars, UrlParser} from "./UrlParser";
import {IAPIResponse} from "../../models/IAPIResponse";

export interface ICrudApiClient<T extends IIdentifiable> {
  create(item: T): Promise<IAPIResponse>
  update(item: T): Promise<IAPIResponse>
  delete(item: IIdentifiable): Promise<IAPIResponse>
}

export abstract class CrudApiClient<T extends IIdentifiable> extends BaseApiclient implements ICrudApiClient<T> {

  abstract readonly createDataInfo: IDataByPars;
  abstract readonly updateDataInfo: IDataByPars;
  abstract readonly deleteDataInfo: IDataByPars;

  create(item: T): Promise<any> {
    return this.postJSON(this.createDataInfo, item)
  }

  update(item: T): Promise<any> {
    return this.putJSON(this.updateDataInfo, item)
  };

  delete(item: IIdentifiable): Promise<any> {
    return this.deleteJSON(this.deleteDataInfo, item)
  };
}

