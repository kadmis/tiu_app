import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Credentials } from 'src/models/credentials';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormData: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    let controls: any = {
      'username':new FormControl("", [Validators.required]),
      'password':new FormControl("", [Validators.required])
    };
    
    this.loginFormData = new FormGroup(controls);
  }

  onSubmit(): void {
    let loginData = new Credentials();
    loginData.username = this.loginFormData.controls['username'].value;
    loginData.password = this.loginFormData.controls['password'].value;

    this.authService.login(loginData).subscribe(result=>{
      if(result.success) {
        localStorage.setItem('token',result.token);
        localStorage.setItem('roles',result.userRoles);
        localStorage.setItem('user-id', result.userId.toString());
        this.router.navigateByUrl('planets');
      }
      else {
        this.openSnackBar(result.message, 3000);
      }     
    });
  }

  getFormField(name: string) {
    return this.loginFormData.get(name);
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Ok', {duration: duration, verticalPosition: 'top'});
  }

}
