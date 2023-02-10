import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: any = {
    userId: null,
    username: null,
    email: null,
    password: null,
    roles: []
  };
  mode:any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userRoles:any;
  message: String = "";

  constructor(private authService: AuthService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any, 
  private userService: UserService) {
    
    if(data.mode =='edit'){
        let selectedRoles = data.data.roles.map((item: any) =>{
          return item.id
        })
        let allRoles = data.roles.map((item: any) => {
          return {id: item.id, name: item.name, selectedRoles:selectedRoles.includes(item.id)};
        })
        this.userRoles = allRoles;
      this.form = {
        userId: data.data.id,
        username: data.data.username,
        email: data.data.email,
        password: "",
        roles: []
       }
    }else{
      let allRoles = data.roles.map((item: any) => {
        return {id: item.id, name: item.name, selectedRoles:false};
      })
      this.userRoles = allRoles;
    }

   this.mode = data.mode;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { userId, username, email, password, roles } = this.form;

    if(this.mode == 'edit'){
      this.userService.updateUser(userId, username, email, password, roles).subscribe(
        data => {
          this.message = data.message;
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      )
    }else{
      this.userService.saveUser(username, email, password, roles).subscribe(
        data => {
          this.message = data.message;
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }

  closeBtn(): void{
    this.dialog.closeAll();
    location.reload();
  }

  onCheckboxChange(event:any){
    if(event.target.checked){
      this.form.roles.push(parseInt(event.target.value))
    }else{
      this.form.roles = this.form.roles.filter((item: any) => {
        return item != event.target.value;
      });
    }
  }
}
