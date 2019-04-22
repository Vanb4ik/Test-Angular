import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { IPosition } from 'src/models/IPosition';
import { ICrudApiClient } from 'src/services/API/CrudApiClient';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionClient } from 'src/services/API/Clients/PositionClient';
import { IAPIResponse } from 'src/models/IAPIResponse';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent extends BaseCrudModule<IPosition> implements OnInit {
  public _rootApiClient: ICrudApiClient<IPosition>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  length = 25;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['name', 'price', 'count'];
  dataSource = new MatTableDataSource<IPosition>([]);

  constructor(protected route: ActivatedRoute, private readonly _positionClient: PositionClient) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.route.params.subscribe((params: Params) => {
      const catId = params['id'];
      if (catId) {
        this.initData(catId)
      }
    })
  }
  
  initData(categoryId: string) {
    console.dir(categoryId)
    this._positionClient.getAllByCategoryId(categoryId)
      .then((response: IAPIResponse<IPosition[]>) => {
        if (response.error) {
          return
        }
        this.dataSource.data = response.payload;
      })
  }

  changePaginatorHandler(event: PageEvent) {
    console.dir(event)
    this.dataSource.data = [
      //{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      //{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
    ]
  }
  
}
