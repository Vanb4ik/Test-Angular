import {Injectable} from "@angular/core";
import {CrudApiClient} from "../CrudApiClient";
import {IDataByPars} from "../UrlParser";
import {ICategory} from "../../../models/ICategory";
import {IAPIResponse} from "../../../models/IAPIResponse";
import { IPosition } from 'src/models/IPosition';

@Injectable({
  providedIn: 'root'
})
export class PositionClient extends CrudApiClient<IPosition> {

  readonly deleteDataInfo: IDataByPars = {
    url: "position/{positionId}",
    data: {},
  };
  readonly updateDataInfo: IDataByPars;
  readonly createDataInfo: IDataByPars;

  getAllByCategoryId(categoryId: string) {
    const data_ = {
      url: "positions/getAll/{categoryId}",
      data: {
        categoryId,
      }
    }

    return this.getJSON(data_)
  }

  delete(category: IPosition) {
    this.deleteDataInfo.data["positionId"] = category.id;

    return super.delete(category)
  }
}
