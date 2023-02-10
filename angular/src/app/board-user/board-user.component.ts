import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../modal/add-user.component';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  users?: any;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>
  
  constructor(private userService: UserService, private eventBusService: EventBusService, public dialog: MatDialog) { }

  addBtn(): void {
    this.userService.getRoles().subscribe(
      roles =>{
        const dialogRef = this.dialog.open(AddUserComponent,{
          width: '640px',disableClose: true,
          data: {
            data: null,
            mode: 'add',
            roles: roles
          }
        });
      },
      err =>{
        this.users = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    );

}

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe(
      data => {
        this.users = data;
        console.log(this.users);
        console.log('-=-=-=-')
      },
      err => {
        this.users = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      }
    );
  }

  deleteBtn(id: any){
    if (confirm("Are you sure that you want to delete?") == true) {
      return this.userService.deleteUser(id).subscribe(
        data => {
          location.reload();
        },
        err => {
          this.users = err.error.message || err.error || err.message;
  
          if (err.status === 403)
            this.eventBusService.emit(new EventData('logout', null));
        }
      );
    } 
    return;    
  }

  editBtn(id: any){
    this.userService.getUser(id).subscribe(
      user => {
        this.userService.getRoles().subscribe(
          roles =>{
            const dialogRef = this.dialog.open(AddUserComponent,{
              width: '640px',disableClose: true,
              data: {
                data: user,
                mode: 'edit',
                roles: roles,
              }
            });
          },
          err =>{
            this.users = err.error.message || err.error || err.message;

            if (err.status === 403)
              this.eventBusService.emit(new EventData('logout', null));
          }
        );
      },
      err => {
        this.users = err.error.message || err.error || err.message;

        if (err.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
      });
  }
}
