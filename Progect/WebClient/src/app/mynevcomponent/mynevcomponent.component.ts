import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mynevcomponent',
  templateUrl: './mynevcomponent.component.html',
  styleUrls: ['./mynevcomponent.component.sass']
})
export class MynevcomponentComponent implements OnInit {

  private readonly time: string;
  private readonly someList: string[] = ["A", "B", "C"]
  private  isTrue: boolean = true;

  constructor() {

    setInterval(()=>{
      this.time = new Date().toLocaleString()
    },1000)
  }

  click(){
    this.isTrue = !this.isTrue
  }
  ngOnInit() {

  }

}
