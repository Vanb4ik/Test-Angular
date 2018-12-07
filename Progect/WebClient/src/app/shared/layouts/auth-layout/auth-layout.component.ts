import { Component, OnInit } from '@angular/core';
import {ConstantsUrl} from "../../../../Helper/ConstantsUrl";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  private loginPageLink: string = "/"+ConstantsUrl.LOGIN;
  private registerPageLink: string ="/"+ConstantsUrl.REGISTER;

  constructor() { }

  ngOnInit() {
  }

}
