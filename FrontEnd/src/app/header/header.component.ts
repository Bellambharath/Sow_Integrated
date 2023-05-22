import { Component, EventEmitter, OnInit, Output, ElementRef, Renderer2, HostListener } from "@angular/core";
import { CommonService } from "../common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  sow: boolean = false;
  candidatedetails: boolean = false;
  mapping: boolean = false;
  domain: boolean = false;
  technology: boolean = false;
  login: boolean = false;
  dashboard: boolean = false;
  header: boolean = false;
  solist: boolean = false;
  candidatelist: boolean = false;

  public isChecked = false;
  registration: boolean = false;
  @Output() eventChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  managePw: boolean = false;
  managePw1: boolean = false;
  showMoreItems: boolean = false;
  ChangePW: boolean = false;
  Username: string = "";
  isAuthor: boolean = false;
  constructor(private commonServ: CommonService, private elementRef: ElementRef,
    private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {

    //  document.addEventListener('click', this.closeNavbarOnClickPage.bind(this));

    this.isAuthor = JSON.parse(sessionStorage.getItem("author"));
    this.Username = this.getUserName();
    this.loggedIn();
  }

  @HostListener('window:resize', ['$event'])
  resizeHandler(event: any) {
    
    if(((window.innerWidth <= 768)==true)&&this.isChecked==true)
    {
      console.log("inside check")
     this.MenuClose();
      
    }
    
  }

  MenuClose() {
    const closeElement: HTMLElement = this.elementRef.nativeElement.querySelector("#navbartoggler");

    if (closeElement) {
      closeElement.click();
    }
  }
  

  update() {
    console.log("in update",this.isChecked)
    this.isChecked = !this.isChecked;
    this.eventChange.emit(this.isChecked);
    console.log("menu");
  }

  logOut() {
    this.header = false;
    this.setAllDefaults();
    sessionStorage.clear();

    console.log(sessionStorage.getItem("toggle"))
    this.router.navigate(['/login'])
    //location.reload();
  }
  loggedIn() {
    this.commonServ.HeaderContent.subscribe((data) => {
      if (!data) {
        this.isChecked = false;
        this.eventChange.emit(this.isChecked);
      }
    });
    this.commonServ.loadMessage.subscribe((data) => {
      if (data) {
        if (
          sessionStorage.getItem("userData") != null ||
          sessionStorage.getItem("userData") != undefined
        ) {
          this.dashboard = true;
          this.login = true;
          this.header = true;
          let data = sessionStorage.getItem("userData");
          let resData = data ? JSON.parse(data) : null;

          let ScreenNames = resData.ScreenNames.split(",");
          console.log(ScreenNames);

          if (sessionStorage.getItem("toggle") == null ||
            sessionStorage.getItem("toggle") == undefined) {

            for (let i = 0; i < ScreenNames.length; i++) {
              if (ScreenNames[i].toLowerCase() == "sow") {
                this.sow = true;
              }
              else if (ScreenNames[i].toLowerCase() == "candidatedetails") {
                this.candidatedetails = true;
              }
              else if (ScreenNames[i].toLowerCase() == "mapping") {
                this.mapping = true;
              }
              else if (ScreenNames[i].toLowerCase() == "domain") {
                this.domain = true;
              }
              else if (ScreenNames[i].toLowerCase() == "technology") {
                this.technology = true;
              }
              else if (ScreenNames[i].toLowerCase() == "registration") {
                this.registration = true;
              }
              else if (ScreenNames[i].toLowerCase() == "changepassword") {
                this.ChangePW = true;
              }
              else if (ScreenNames[i].toLowerCase() == "solist") {
                this.solist = true;
              }
              else if (ScreenNames[i].toLowerCase() == "candidatelist") {
                this.candidatelist = true;
              }
            }
            let obj = {
              sow: this.sow,
              candidatedetails: this.candidatedetails,
              mapping: this.mapping,
              domain: this.domain,
              technology: this.technology,
              registration: this.registration,
              changepassword: this.ChangePW,
              solist: this.solist,
              candidatelist: this.candidatelist
            };
            sessionStorage.setItem("toggle", JSON.stringify(obj));

          }



          if (
            sessionStorage.getItem("toggle") != null ||
            sessionStorage.getItem("toggle") != undefined
          ) {

            let obj = sessionStorage.getItem("toggle");
            let objData = obj ? JSON.parse(obj) : null;
            console.log(objData);
            for (let key of Object.keys(objData)) {
              if (key == "sow") {
                this.sow = objData.sow;
              }
              if (key.toLowerCase() == "candidatedetails") {
                this.candidatedetails = objData.candidatedetails;
              }
              if (key.toLowerCase() == "mapping") {
                this.mapping = objData.mapping;
              }
              if (key.toLowerCase() == "domain") {
                this.domain = objData.domain;
              }
              if (key.toLowerCase() == "technology") {
                this.technology = objData.technology;
              }
              if (key.toLowerCase() == "registration") {
                this.registration = objData.registration;
              }

              if (key.toLowerCase() == "changepassword") {
                this.ChangePW = objData.changepassword;
              }
              if (key.toLowerCase() == "solist") {
                this.solist = objData.solist;
              }
              if (key.toLowerCase() == "candidatelist") {
                this.candidatelist = objData.candidatelist;
              }
              console.log(key)
            }
          }

        }
      }
    });
  }

  setAllDefaults() {
    this.sow = false;
    this.candidatedetails = false;
    this.mapping = false;
    this.domain = false;
    this.technology = false;
    this.login = false;
    this.dashboard = false;
    this.registration = false;
    this.ChangePW = false;
    this.solist = false;
    this.candidatelist = false;
  }
  CloseManagePassword()
  {
    this.managePw=false;
  }
  managePassword() {
    console.log("managePassword")
    this.managePw = !this.managePw;
    this.managePw1 = false;
    console.log(this.managePw);
  }
  managePassword1() {
    this.managePw = false;
    
    this.managePw1 = !this.managePw1;


    console.log("pw-after", this.managePw1)
    console.log(this.ChangePW)
  }

  closeMenuBox() {
    this.isChecked = false;
  }

  handleClick() {
    this.closeMenuBox();
  }
  getUserName(): any {
    let data = sessionStorage.getItem("userData");
    let userInfo = data ? JSON.parse(data) : null;
    return userInfo.LoginName;
  }
  toggleMore() {
    this.showMoreItems = !this.showMoreItems;
  }
  toggleclose()
  {
    this.showMoreItems=false;
  }
}
