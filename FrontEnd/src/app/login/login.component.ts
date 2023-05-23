import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  submitted: boolean = false
  userData: any;
  resultloader: boolean = false;
  loaderTimeout: any;
  errorMessage: string;
  showError: boolean = false;
  isAuthor: boolean = false;
  userName: string;

  loginFormForUserName: string;

  loginFormForUserNameCount: string = localStorage.getItem('loginFormForUserNameCount') || '0';

  constructor(private service: LoginService, private router: Router, private common: CommonService) { }

  ngOnInit(): void {
    //this.userName = this.getUserName();
    //this.isAuthor = JSON.parse(sessionStorage.getItem('author'));
    //this.checkUserisValid()
  }
  //   getUserName(): any {
  //     let data = localStorage.getItem('userData');
  //     let userInfo = (data) ? JSON.parse(data) : null;
  //     return userInfo.LoginName;
  // }


  loginForm = new FormGroup({
    loginName: new FormControl('', [Validators.required]),
    loginPassword: new FormControl('', [Validators.required]),
  })

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched();
      alert("Invalid Credentials");
      return;
    } else {
      this.checkUserisValid();

      let count = 0;
      setInterval(() => {
        count++;
        if (this.resultloader = false) {

        }
      }, 2000);
    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control.invalid && (control.touched || this.submitted);
  }

  markAllFieldsAsTouched() {
    Object.keys(this.loginForm.controls).forEach(fieldName => {
      this.loginForm.controls[fieldName].markAsTouched();

    });

  }

  get f() { return this.loginForm.controls; }

  async checkUserisValid() {

    if (this.loginForm.valid) {
      let formValue = this.loginForm.value;
      let httpParams = new HttpParams().append("emailId", formValue.loginName).append("loginPassword", formValue.loginPassword);
      sessionStorage.setItem("email", formValue.loginName);
      sessionStorage.setItem("loginPassword", formValue.loginPassword);

      this.loaderTimeout = setTimeout(() => {
        this.resultloader = true;
      }, 1000);


      try {
        const res = await this.service.GetUserData(httpParams).toPromise();
        console.log(res)
        clearTimeout(this.loaderTimeout);

        if (res.Status == 1) {

          this.resultloader = false;
          this.userData = res;
          if (this.userData.PermissionName.toLowerCase() == "edit") {
            sessionStorage.setItem("author", "true");
          }
          console.log(this.userData)
          sessionStorage.setItem("userData", JSON.stringify(this.userData));
          this.loginForm.reset();
          
          if (formValue.loginPassword == "Sow@123") 
          {
            //debugger
            console.log(formValue.loginPassword)
            this.router.navigate(["/ChangePassword"]);
          }
          else {
            this.router.navigate(["/dashboard"]);
          }
        }
        else if (res.Status == 0 && (res.FailureAttempts >= 1 && res.FailureAttempts < 3)) {
          this.errorMessage = "Invalid Credentials. You are left with " + (3 - res.FailureAttempts) + " more attempt";

        }
        else if (res.Status == 0 && res.FailureAttempts >= 3) {
          this.errorMessage = "Your Account is Locked.";
        }


      }
      catch (err) {
        console.log(err)
        // Clear the timeout when the request is done
        clearTimeout(this.loaderTimeout);
        this.resultloader = true;
        if (err.status === 0) {
          this.router.navigate(["/server-down"]);
          this.showError = true;
        }
        else {
          this.errorMessage = "Username or Password is Incorrect";
          console.log(this.errorMessage)
        }
      }

    }
  }
}

