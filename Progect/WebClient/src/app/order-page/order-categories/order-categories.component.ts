import { Component, OnInit } from '@angular/core';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { CategoryClient } from 'src/services/API/Clients/CategoryClient';
import { ICategory } from 'src/models/ICategory';
import { IAPIResponse } from 'src/models/IAPIResponse';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent extends BaseCrudModule<ICategory> implements OnInit {
  protected _rootApiClient: CategoryClient;

  data: ICategory[] = [];
  constructor(private categoryClient: CategoryClient) {
    super();

    this._rootApiClient = categoryClient;
  }

  ngOnInit() {
    this.initData()
  }

  async initData() {

    const response: IAPIResponse = await this.watchAsyncProcess(
      this._rootApiClient.getAllCategory()
    )
    if (response.error) {
      return;
    }
    this.data = response.payload
  }
}
