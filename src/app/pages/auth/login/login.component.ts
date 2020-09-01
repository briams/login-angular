import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;

  private isValidEmail = /\S+@\S+.\S+/;

  // private $suscriptions: Subscription[] = [];
  private $suscription: Subscription = new Subscription();

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private authSvc: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.$suscription.unsubscribe();
    // this.$suscriptions.forEach(sub => sub.unsubscribe());
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    // this.$suscriptions.push(
    this.$suscription.add(
      this.authSvc.login(formValue).subscribe(res => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  isValidField(field: string) {
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid
    );
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'you must enter a value';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'Not a valid email';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `this field must be longer than ${minLength} characters`;
    }
    return message;
  }

}
