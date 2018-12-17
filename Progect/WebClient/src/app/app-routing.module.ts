import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {ConstantsUrl} from "../Helper/ConstantsUrl";
import {AuthGuard} from "../services/Authentication/AuthGuard";

const routes: Routes = [
  {path:"", component: AuthLayoutComponent, children:[
      {path: "", redirectTo:"/"+ConstantsUrl.LOGIN, pathMatch:"full"},
      {path:ConstantsUrl.LOGIN, component: LoginPageComponent},
      {path:ConstantsUrl.REGISTER, component: RegisterPageComponent}
    ]
  },
  {path:"", component: SiteLayoutComponent, canActivate:[AuthGuard], children:[

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
