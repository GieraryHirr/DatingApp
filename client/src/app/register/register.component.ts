import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); //remember, import from @angular/core

  //Property
  model: any = {};
  registerForm: FormGroup; //Reactive form

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm(); //initialize method when we initialize component
  }

  initializeForm() {
    this.registerForm = this.fb.group({ //using form builder
      //Form controls
      username: ['', Validators.required], //inside we giving a starting value
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]], //If we want addtwo validiators, it must be in array
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity(); //When password changes then we validity again confirmPassword
    })

  }

  //Custom validator to compare password and conformPassword
  matchValues(matchTo: string): ValidatorFn { //Return type of ValidatorFn
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // }, error =>{
    //   console.log(error);
    //   this.toastr.error(error.error);
    // })
  }

  cancel() {
    this.cancelRegister.emit(false); //emit false to parent
  }

}
