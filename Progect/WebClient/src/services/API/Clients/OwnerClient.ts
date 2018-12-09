
import {IDataByPars} from "../UrlParser";
import {Injectable} from "@angular/core";
import {CrudApiClient} from "../CrudApiClient";
import {IOwner} from "../../../models/IOwner";


@Injectable({
  providedIn:'root'
})
export class OwnerClient extends CrudApiClient<IOwner>{
  readonly createDataInfo: IDataByPars = {
    url:"user/owner"
  };
  readonly deleteDataInfo: IDataByPars;
  readonly updateDataInfo: IDataByPars;
}
