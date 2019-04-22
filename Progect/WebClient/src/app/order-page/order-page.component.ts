import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ConstantsUrl } from 'src/Helper/ConstantsUrl';
import { MatDialog } from '@angular/material';
import { OrderPageDialogComponent } from './order-page-dialog/order-page-dialog.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  private rootOrderUrl = "/" + ConstantsUrl.ORDER;
  private isRoot: boolean;

  constructor(private router: Router, private dialog: MatDialog, ) {

  }

  private checkUrl() {
    this.isRoot = this.router.url == this.rootOrderUrl;
  }

  ngOnInit() {
    this.checkUrl();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkUrl();
      }
    })
  }

  openOrderDialog() {
    const dialogRef = this.dialog.open(OrderPageDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
}
