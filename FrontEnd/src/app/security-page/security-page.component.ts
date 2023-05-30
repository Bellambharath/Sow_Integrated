import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SecurityserviceService } from '../services/securityservice.service';

@Component({
  selector: 'app-security-page',
  templateUrl: './security-page.component.html',
  styleUrls: ['./security-page.component.css']
})
export class SecurityPageComponent implements OnInit {
  answer:any[]=[];
  questions:any[]=[];
  resultloader:boolean=false;
  submitted:boolean=false;
  constructor(private service:SecurityserviceService,private route:Router) { }
  
  SecurityForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    this.service.getAllQuestions().subscribe(result=>{
      this.questions=result;
      // console.log(result)
    })
    let userInfo=JSON.parse(sessionStorage.getItem('userData'));
    debugger;
    let httpParams=new HttpParams().append("loginid",userInfo.LoginId)
    this.service.GetAnswerById(httpParams).subscribe((data)=>{
      this.answer=data;
    })
  }
  get f() { return this.SecurityForm.controls; }
 
  onSubmit(){
    this.submitted = true;
    if (this.SecurityForm.invalid) {
      return;
    }
    
  }

  toValidate(){
    let formValue=this.SecurityForm.value;
    let userInfo=JSON.parse(sessionStorage.getItem('userData'));
    let params= new HttpParams().append("LoginName",userInfo.LoginName).append("QuestionId",formValue.question).append("Answer",formValue.answer);
    this.service.getValidateSecurityQnA(params).subscribe((res)=>{
      let msg=JSON.parse(res);
      if(msg=="Details are correct"){
        this.route.navigate(['/dashboard']);
      }
      else{
        alert(msg);
      }
    });
  }

  toCreate(){
    let userInfo=JSON.parse(sessionStorage.getItem('userData'));
    let formValue=this.SecurityForm.value;
    let data={
      answerId:0,
      loginId:userInfo.LoginId,
      questionId: formValue.question,
      answer: formValue.answer,
      type: 'post'
    }
    this.service.postAnswer(data).subscribe((res)=>{
      alert('Security Question and Answer Set');
      // this.route.navigate(["/registration"]);
    })
    
  }
  toUpdate(){
    let userInfo=JSON.parse(sessionStorage.getItem('userData'));
    let formValue=this.SecurityForm.value;
    let ans=this.answer[0];
    let data={
      answerId:ans.answerId,
      loginId:userInfo.LoginId,
      questionId: formValue.question,
      answer: formValue.answer,
      type: 'update'
    }
    this.service.postAnswer(data).subscribe((res)=>{
      alert('Security Question and Answer Set');
    })
  }
}

