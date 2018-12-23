import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {ConstantsUrl} from "../../../../Helper/ConstantsUrl";
import {AuthService} from "../../../../services/Authentication/Auth.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

  links = [
    {url:`/${ConstantsUrl.OVERVIEW}`, name: "Огляд"},
    {url:`/${ConstantsUrl.HISTORY}`, name: "Історія"},
    {url:`/${ConstantsUrl.ORDER}`, name: "Додати замовлення"},
    {url:`/${ConstantsUrl.CATEGORIES}`, name: "Асортимент"},
    {url:`/${ConstantsUrl.ANALYTICS}`, name: "Аналітика"},
  ];

  logout(e: Event){
    e.preventDefault();
    AuthService.redirectByLogin()
  }
}
