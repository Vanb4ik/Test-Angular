import {Injectable} from "@angular/core";
import {CrudApiClient} from "../CrudApiClient";
import {IDataByPars} from "../UrlParser";
import { IPosition } from 'src/models/IPosition';

@Injectable({
  providedIn: 'root'
})
export class PositionClient extends CrudApiClient<IPosition> {

  readonly deleteDataInfo: IDataByPars = {
    url: "position/{positionId}",
    data: {},
  };

  readonly updateDataInfo: IDataByPars = {
    url: "position/{positionId}",
    data: {},
  };

  readonly createDataInfo: IDataByPars = {
    url: "position",
  };

  getAllByCategoryId(categoryId: string) {
    const data_ = {
      url: "position/GetAll/{categoryId}",
      data: {
        categoryId,
      }
    }

    return this.getJSON(data_)
  }

  update(position: IPosition) {
    this.updateDataInfo.data["positionId"] = position.id;

    return super.update(position);
  }

  delete(position: IPosition) {
    this.deleteDataInfo.data["positionId"] = position.id;

    return super.delete(position)
  }
}
