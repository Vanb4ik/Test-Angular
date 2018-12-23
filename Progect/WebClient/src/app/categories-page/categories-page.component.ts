import {Component, OnInit} from '@angular/core';
import {BaseCrudModule} from "../../modules/BaseCrudModule";
import {ICrudApiClient} from "../../services/API/CrudApiClient";
import {IOwner} from "../../models/IOwner";
import {ICategory} from "../../models/ICategory";
import {CategoryClient} from "../../services/API/Clients/CategoryClient";
import {IAPIResponse} from "../../models/IAPIResponse";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent extends BaseCrudModule<ICategory> implements OnInit {
  protected readonly _rootApiClient: CategoryClient;


  constructor(readonly categoryClient: CategoryClient) {
    super();
    this._rootApiClient = this.categoryClient;
  }

  ngOnInit() {
    return this.getAllCategory()
  }

  protected data: ICategory[] = [];

  async getAllCategory() {

    try {
      const response: IAPIResponse<ICategory []> = await this.watchAsyncProcess(
        this._rootApiClient.getAllCategory()
      );
      this.data = response.payload;
    }
    catch (e) {
      console.dir(e)
    }

  }


}