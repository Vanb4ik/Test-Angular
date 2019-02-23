import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Paterns, } from 'src/Helper/Paterns';
import { IPosition } from 'src/models/IPosition';
import { BaseCrudModule } from 'src/modules/BaseCrudModule';
import { ICrudApiClient } from 'src/services/API/CrudApiClient';
import { PositionClient } from 'src/services/API/Clients/PositionClient';
import { HelperConst } from 'src/Helper/HelperConst';
import { IAPIResponse } from 'src/models/IAPIResponse';

@Component({
  selector: 'app-position-modal-dialog',
  templateUrl: './position-modal-dialog.component.html',
  styleUrls: ['./position-modal-dialog.component.scss']
})
export class PositionModalDialogComponent extends BaseCrudModule<IPosition> implements OnInit {

  protected _rootApiClient: ICrudApiClient<IPosition>;
  form: FormGroup;
  constructor(
    private positionClient: PositionClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PositionModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPosition) {
    super();
    this._rootApiClient = positionClient;
    this.form = fb.group({
      name: fb.control(data.name, [Validators.required]),
      cost: fb.control(data.cost, [Validators.required, Validators.pattern(Paterns.floatNotZero)])
    })
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitPosition() {
    debugger
    const { form, } = this;
    const updatePosition: IPosition = { ...this.data, name: form.value.name, cost: form.value.cost}
    this.submitPositionHandler(updatePosition)
  }

  async submitPositionHandler(position: IPosition) {
    const { form, } = this;
    form.disable();
    try {
      if (position.id == HelperConst.EMPTY_ID) {
        await this.create(position);
      }
      else {
        await this.update(position)
      }
      this.dialogRef.close()
    }
    catch (e) {}
    finally {
      form.enable();
    }
  }

  getNameErrorMessage() {
    if (this.form.get('name').hasError('required')) {
      return 'Ви повинні ввести значення';
    }

    return "";
  }

  getCostErrorMessage() {
    if (this.form.get('cost').hasError('required')) {
      return 'Ви повинні ввести значення';
    }

    return "Лише число не рівне 0";
  }
}
