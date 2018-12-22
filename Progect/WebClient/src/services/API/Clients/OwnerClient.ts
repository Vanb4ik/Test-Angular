import {IDataByPars} from "../UrlParser";
import {Injectable} from "@angular/core";
import {CrudApiClient} from "../CrudApiClient";
import {IOwner} from "../../../models/IOwner";
import {IIdentifiable} from "../../../models/IIdentifiable";


@Injectable({
  providedIn: 'root'
})
export class OwnerClient extends CrudApiClient<IOwner> {

  readonly createDataInfo: IDataByPars = {
    url: "user/owner"
  };
  readonly deleteDataInfo: IDataByPars;
  readonly updateDataInfo: IDataByPars;

  getAccessToken(user: IOwner): Promise<any> {
    const data_ = {
      url: "user/owner?{email}&{password}",
      data: {
        email: user.email,
        password: user.passwordHash,
      }
    };
    return this.getJSON(data_)
  }
}
