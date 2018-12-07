import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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

  form: FormGroup;
  isPassword = true;

  constructor(private fb: FormBuilder) {
    this.onClick = new EventEmitter<any>();
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }
  getErrorEmailMessage() {
    return this.form.get('email').hasError('required') ? 'Ви повинні ввести значення' :
      this.form.get('email').hasError('email') ? 'Невалідний email' :'';
  }

  getErrorPasswordMessage(){
    return this.form.get('password').hasError('required')? 'Ви повинні ввести значення' :
      this.form.get('password').errors['minlength']
      && this.form.get('password').errors['minlength']['requiredLength']? 'Пароль надто короткий':""
  }
  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
    this.onClick.emit(1);
  }

}
