import {Component, OnInit} from '@angular/core';
import {BaseCrudModule} from "../../modules/BaseCrudModule";
import {ICategory} from "../../models/ICategory";
import {CategoryClient} from "../../services/API/Clients/CategoryClient";
import {IAPIResponse} from "../../models/IAPIResponse";
import {Router} from "@angular/router";
import {ConstantsUrl} from "../../Helper/ConstantsUrl";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent extends BaseCrudModule<ICategory> implements OnInit {
  protected readonly _rootApiClient: CategoryClient;

  constructor(readonly categoryClient: CategoryClient, readonly router: Router) {
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

  pushToNewCategoriesForm(){
    this.router.navigate([`/${ConstantsUrl.CATEGORIES}/${ConstantsUrl.NEW_CATEGORIES}`])
  }

}
