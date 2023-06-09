import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../services/change-password.service';
import { sequenceEqual } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  isAuthor: boolean = false;
  passwordsMatch = true;
  passwordMatchError: string;
  oldPasswordMatchWithNew = true;
  oldPasswordMatchWithNewError: string;
  userName: string;
  errorMessage: string;
  oldPasswordIsWrong: string;
  updatedSuccessfully: string;
  updatedSuccessfullyCounts: number[] = [];
  oldPasswordIsWrongCounts: number[] = [];
  prevUpdatedSuccessfullyCount: number = 0;
  prevOldPasswordIsWrongCount: number = 0;


  constructor(private service: ChangePasswordService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.getEmailId();
    this.isAuthor = JSON.parse(sessionStorage.getItem('author'));
  }
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{6,}$/


  // here the passwordPattern taken as 1./ is the begining of the string 2.(?=.*[ ]) is the assertion of the string pattern similarly rest of the pattern follows
  //3. .{6,} takes minimum length of the complete string and after , we can add maxlength

  passwordForm = new FormGroup({
    oldPw: new FormControl('', [Validators.required]),
    newPw: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPw: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required])

  })
  getEmailId(): any {
    let data = sessionStorage.getItem('userData');
    let userInfo = (data) ? JSON.parse(data) : null;
    return userInfo.EmailId;
  }

  get f() { return this.passwordForm.controls; }
  onSubmit() {

    this.submitted = true;

    this.passwordsMatch = this.f.newPw.value === this.f.confirmPw.value;
    this.oldPasswordMatchWithNew = this.f.oldPw.value !== this.f.newPw.value

    if (this.passwordForm.invalid) {
      this.markAllFieldsAsTouched();
      console.log("form is invalid")
      return;

    } else {
      this.onAdd();
    }

  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.passwordForm.get(fieldName);
    return control.invalid && (control.touched || this.submitted);
  }

  markAllFieldsAsTouched() {
    Object.keys(this.passwordForm.controls).forEach(fieldName => {
      this.passwordForm.controls[fieldName].markAsTouched();
    });
  }

  onAdd() {
    let formValue = this.passwordForm.value;
    let obj = {
      emailId: formValue.userName,
      oldPassword: formValue.oldPw,
      newPassword: formValue.newPw,
    };

    if (!this.passwordsMatch) {
      console.log("password does not match");
      this.passwordMatchError = " **Confirm Password does not match with the New Password";
      return;
    }

    if (!this.oldPasswordMatchWithNew) {
      console.log("old and new passwords are matched");
      this.oldPasswordMatchWithNewError = "**Old Password and New Password should not be the same";
      return;
    }

    if (this.passwordForm.valid) {
      this.service.UpdatePasswordData(obj).subscribe(
        (response) => {
          alert(response);
          if (response === "New Password updated successfully") {
            this.passwordForm.reset();
            this.router.navigate(["/dashboard"]);
          }
          
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      this.errorMessage = "Invalid Credentials";
      alert(this.errorMessage);
    }
  }
}
