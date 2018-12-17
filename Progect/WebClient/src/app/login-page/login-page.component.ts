import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {Messager} from "../../Helper/Messager";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      }
      else if (params['accsessDenied']){

      }
    })
  }

  handleOnClick(e) {
    /*alert("Handled: " + e)*/

  }

}
