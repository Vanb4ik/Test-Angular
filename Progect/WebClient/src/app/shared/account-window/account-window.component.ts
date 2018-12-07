import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-account-window',
  templateUrl: './account-window.component.html',
  styleUrls: ['./account-window.component.scss']
})
export class AccountWindowComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  okText: string;

  @Output()
  onClick: EventEmitter<any>;

  constructor() {
    this.onClick = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  handleOk() {
    this.onClick.emit(1);
  }

}
