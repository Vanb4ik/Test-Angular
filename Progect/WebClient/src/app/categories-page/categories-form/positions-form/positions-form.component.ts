import { Component, OnInit, Input } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { IPosition } from 'src/models/IPosition';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { PositionClient } from 'src/services/API/Clients/PositionClient';
import { ICategory } from 'src/models/ICategory';
import { IAPIResponse } from 'src/models/IAPIResponse';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent extends BaseCrudModule<IPosition> implements OnInit {
  protected _rootApiClient: PositionClient;
  @Input() categoryId: string;
  private data: IPosition[] = [];

  constructor(private positionClient: PositionClient) {
    super();
    this._rootApiClient = this.positionClient;
  }

  ngOnInit() {
    //this.initData()
  }

  async initData() {
   const response: IAPIResponse<IPosition[]> =  await this.watchAsyncProcess(
      this._rootApiClient.getAllByCategoryId(this.categoryId)
    );

    if (response.error) {
      return;
    }

    this.data = response.payload
  }
}
