import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {BaseApiClient} from "../../services/API/BaseApiClient";
import {BaseCrudModule, IStateBase} from "../../modules/BaseCrudModule";
import {IOwner} from "../../models/IOwner";
import {ICrudApiClient} from "../../services/API/CrudApiClient";
import {OwnerClient} from "../../services/API/Clients/OwnerClient";
import {IAccountWindowFormData} from "../shared/account-window/account-window.component";
import {HelperConst} from "../../Helper/HelperConst";
import {AuthService, IIdentityResponse} from "../../services/Authentication/Auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseCrudModule<IOwner, IStateBase> implements OnInit {

  protected readonly _rootApiClient: OwnerClient;

  constructor(
    private ownerClient: OwnerClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this._rootApiClient = this.ownerClient;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      }
      else if (params['accsessDenied']) {

      }
    })
  }

  async getAccessToken(e: IAccountWindowFormData): Promise<IIdentityResponse> {

    this.isLoading = true;

    const newOwner: IOwner = {
      id: HelperConst.EMPTY_ID,
      passwordHash: e.password,
      email: e.email
    };
    try {
      return await this._rootApiClient.getAccessToken(newOwner);
    }
    finally {
      this.isLoading = false
    }
  }

  async handleOnClick(e: IAccountWindowFormData) {
    const response: IIdentityResponse = await this.getAccessToken(e);
    AuthService.provider(response)
  }


}
