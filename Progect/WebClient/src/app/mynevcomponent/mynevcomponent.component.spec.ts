import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MynevcomponentComponent } from './mynevcomponent.component';

describe('MynevcomponentComponent', () => {
  let component: MynevcomponentComponent;
  let fixture: ComponentFixture<MynevcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MynevcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MynevcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
