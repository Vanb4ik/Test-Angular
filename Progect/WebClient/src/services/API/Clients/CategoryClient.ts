import {Injectable} from "@angular/core";
import {CrudApiClient} from "../CrudApiClient";
import {IDataByPars} from "../UrlParser";
import {IOwner} from "../../../models/IOwner";
import {ICategory} from "../../../models/ICategory";
import {IAPIResponse} from "../../../models/IAPIResponse";

@Injectable({
  providedIn: 'root'
})
export class CategoryClient extends CrudApiClient<ICategory> {

  readonly deleteDataInfo: IDataByPars;
  readonly updateDataInfo: IDataByPars;
  readonly createDataInfo: IDataByPars;

  getAllCategory(): Promise<IAPIResponse> {
    const data_ = {
      url: "category/getAll",
    };

    return this.getJSON(data_)
  }

  getCategoryById(catId: string): Promise<IAPIResponse>{
    //debugger
    const data_ = {
      url: "category/{catId}",
      data:{
        catId,
      }
    };

    return this.getJSON(data_)
  }

  create(category: ICategory, image?: File=null): Promise<IAPIResponse> {
    const data_ = {
      url: "category/upload"
    };

    const data:any = {rawCategory: JSON.stringify(category), image};


    return this.postFormData(data_, data)
  }

  update(category: ICategory, image?: File): Promise<IAPIResponse> {
    const data_ = {
      url: "category/upload"
    };

    return this.postFormData(data_, {category,  image})
  };
}
