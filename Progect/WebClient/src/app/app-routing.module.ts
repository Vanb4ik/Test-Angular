import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {ConstantsUrl} from "../Helper/ConstantsUrl";
import {AuthGuard} from "../services/Authentication/AuthGuard";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {HistoryPageComponent} from "./history-page/history-page.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {AnalyticsPageComponent} from "./analytics-page/analytics-page.component";
import {CategoriesFormComponent} from "./categories-page/categories-form/categories-form.component";
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';

const routes: Routes = [
  {
    path: "", component: AuthLayoutComponent, children: [
      {path: "", redirectTo: "/" + ConstantsUrl.LOGIN, pathMatch: "full"},
      {path: ConstantsUrl.LOGIN, component: LoginPageComponent},
      {path: ConstantsUrl.REGISTER, component: RegisterPageComponent}
    ]
  },
  {
    path: "", component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: ConstantsUrl.OVERVIEW, component: OverviewPageComponent},
      {path: ConstantsUrl.HISTORY, component: HistoryPageComponent},
      {
        path: ConstantsUrl.ORDER, component: OrderPageComponent, children: [
          { path: "", component: OrderCategoriesComponent },
          { path: ":id", component: OrderPositionsComponent }
        ]
      },
      {path: ConstantsUrl.CATEGORIES, component: CategoriesPageComponent},
      {path: `${ConstantsUrl.CATEGORIES}/:id`, component: CategoriesFormComponent},
      {path: ConstantsUrl.NEW_CATEGORIES, component: CategoriesFormComponent},
      {path: ConstantsUrl.ANALYTICS, component: AnalyticsPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
