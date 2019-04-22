import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { IPosition } from 'src/models/IPosition';
import { ICrudApiClient } from 'src/services/API/CrudApiClient';
import { MatTableDataSource, MatPaginator, PageEvent, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-page-dialog',
  templateUrl: './order-page-dialog.component.html',
  styleUrls: ['./order-page-dialog.component.scss']
})
export class OrderPageDialogComponent extends BaseCrudModule<IPosition> implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  protected _rootApiClient: ICrudApiClient<IPosition>; 
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  constructor(public dialogRef: MatDialogRef<OrderPageDialogComponent>) {
    super();
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'options'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  changePAginatorHandler(event: PageEvent) {
    console.dir(event)
    this.dataSource.data = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
    ]
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitPosition() {
    debugger
    //const { form, } = this;
    //const updatePosition: IPosition = { ...this.data, name: form.value.name, cost: form.value.cost }
    //this.submitPositionHandler(updatePosition)
  }
  async deletePosition(e: Event, element: any) {
    e.stopPropagation();
    console.dir(element)
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
];

