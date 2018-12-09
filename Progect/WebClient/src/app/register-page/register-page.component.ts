import { Component, OnInit } from '@angular/core';
import {IAccountWindowFormData} from "../shared/account-window/account-window.component";
import {BaseCrudModule, IStateBase} from "../../modules/BaseCrudModule";
import {IOwner} from "../../models/IOwner";
import {ICrudApiClient} from "../../services/API/CrudApiClient";
import {OwnerClient} from "../../services/API/Clients/OwnerClient";
import {HelperConst} from "../../Helper/HelperConst";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent extends BaseCrudModule<IOwner, IStateBase> implements OnInit  {

  protected readonly _rootApiClient: ICrudApiClient<IOwner>;

  constructor(ownerClient: OwnerClient) {
    super();
    this._rootApiClient = ownerClient;
  }

  ngOnInit() {
  }

  async handleOnClick(e:IAccountWindowFormData) {
    console.log(e);
    if(!e){
      throw Error("Invalid form data")
    }

    const newOwner: IOwner = {
      id: HelperConst.EMPTY_ID,
      passwordHash: e.password,
      email: e.email
    };

    await this._rootApiClient.create(newOwner)
      .then(() => window.alert("ownerCreate"))
  }

}
