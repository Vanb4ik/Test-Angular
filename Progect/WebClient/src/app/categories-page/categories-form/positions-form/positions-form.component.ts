import { Component, OnInit, Input, Inject } from '@angular/core';
import { IPosition } from 'src/models/IPosition';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { PositionClient } from 'src/services/API/Clients/PositionClient';
import { IAPIResponse } from 'src/models/IAPIResponse';
import { MatDialog, } from '@angular/material';
import { PositionModalDialogComponent } from './position-modal-dialog/position-modal-dialog.component';
import { HelperConst } from 'src/Helper/HelperConst';


@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent extends BaseCrudModule<IPosition> implements OnInit {
  protected _rootApiClient: PositionClient;
  @Input() categoryId: string;
  private positions: IPosition[] = [];

  constructor(private positionClient: PositionClient, public dialog: MatDialog) {
    super();
    this._rootApiClient = this.positionClient;
  }

  ngOnInit() {
    this.initData()
  }

  async initData() {
    const response: IAPIResponse<IPosition[]> = await this.watchAsyncProcess(
      this._rootApiClient.getAllByCategoryId(this.categoryId)
    );
    if (response.error) {
      return;
    }
    this.positions = response.payload
  }

  private getNewPosition(): IPosition {
    return {
      categoryId: this.categoryId,
      id: HelperConst.EMPTY_ID,
      userId: HelperConst.EMPTY_ID,
      cost: null,
      name: "",
    }
  }

  openPositionDialog(position?: IPosition) {
    const selectedPosition: IPosition = position ? position : this.getNewPosition()

    const dialogRef = this.dialog.open(PositionModalDialogComponent, {
      width: '600px',
      data: { ...selectedPosition }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.initData()
    });
  }
  
  async deletePosition(e: Event, position: IPosition) {
    e.stopPropagation();
    try {
      await this.delete(position);
      this.initData();
    } catch (e) {

    }
    
  }
}



