import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/models/ICategory';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { ICrudApiClient } from 'src/services/API/CrudApiClient';
import { CategoryClient } from 'src/services/API/Clients/CategoryClient';
import { IAPIResponse } from 'src/models/IAPIResponse';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent extends BaseCrudModule<ICategory> implements OnInit {
    protected _rootApiClient:CategoryClient;

  data: ICategory[] = [];
  constructor(private categoryClient: CategoryClient) {
    super();

    this._rootApiClient = categoryClient;
  }

  ngOnInit() {
    this.initData()
  }

  async initData() {

   const response:IAPIResponse = await this.watchAsyncProcess(
      this._rootApiClient.getAllCategory()
    )
    if (response.error) {
      return;
    }
    this.data = response.payload
  }
}
