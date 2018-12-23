import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccountWindowFormData} from "../shared/account-window/account-window.component";
import {BaseCrudModule} from "../../modules/BaseCrudModule";
import {IOwner} from "../../models/IOwner";
import {ICrudApiClient} from "../../services/API/CrudApiClient";
import {OwnerClient} from "../../services/API/Clients/OwnerClient";
import {HelperConst} from "../../Helper/HelperConst";
import {Router} from "@angular/router";
import {ConstantsUrl} from "../../Helper/ConstantsUrl";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent extends BaseCrudModule<IOwner> implements OnInit, OnDestroy {

  protected readonly _rootApiClient: OwnerClient;

  constructor(
    ownerClient: OwnerClient,
    private router: Router
  ) {
    super();
    this._rootApiClient = ownerClient;
  }

  ngOnInit() {
  }

  async handleOnClick(e: IAccountWindowFormData) {
    console.log(e);
    if (!e) {
      throw Error("RegisterPageComponent. Invalid form data")
    }

    const newOwner: IOwner = {
      id: HelperConst.EMPTY_ID,
      passwordHash: e.password,
      email: e.email
    };


    await this.create(newOwner)
      .then(() => {
        this.router.navigate([ConstantsUrl.LOGIN], {
          queryParams: {
            registered: true,
          },
        });
      })
  }

  ngOnDestroy(): void {

  }

}
