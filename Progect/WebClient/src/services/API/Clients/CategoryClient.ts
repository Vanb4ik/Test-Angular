import {Injectable} from "@angular/core";
import {CrudApiClient} from "../CrudApiClient";
import {IDataByPars} from "../UrlParser";
import {ICategory} from "../../../models/ICategory";
import {IAPIResponse} from "../../../models/IAPIResponse";

@Injectable({
  providedIn: 'root'
})
export class CategoryClient extends CrudApiClient<ICategory> {

  readonly deleteDataInfo: IDataByPars = {
    url: "category/{categoryId}",
    data: {},
  };

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

  create(category: ICategory, image?: File): Promise<IAPIResponse> {
    const data_ = {
      url: "category/upload"
    };
    const data:any = {rawCategory: JSON.stringify(category), image};
    
    return this.postFormData(data_, data)
  }

  delete(category: ICategory) {
    this.deleteDataInfo.data["categoryId"] = category.id;
    return super.delete(category)
  }
}
