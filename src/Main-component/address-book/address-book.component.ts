import { ChangeDetectorRef, Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { IUserRegistration, tableData } from '../../Constant/userInfo';
import { CommonServiceService } from '../../Services/common-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../Services/http.service';

import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ShowdailogEditedUserComponent } from './showdailog-edited-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-book',
  imports: [CommonModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})

export class AddressBookComponent {

  dataSource: IUserRegistration[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private _commonService : CommonServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _httpService: HttpService,
    private _cd: ChangeDetectorRef,
    private _toastr: ToastrService
  ) {

  }
  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      this._httpService.getUserList().subscribe((users:any)=>{
        if(users) {
          this.dataSource = users.result;
        }
      });
    }
  }

  edit(Userid:any) {
    this._httpService.EditUserApi(Userid).subscribe((result)=>{
      if(result) {
        this.openDialog(result);
      }
    });
  }

  onDelete(id:any) {
    this._httpService.DeleteUserApi(id).subscribe((res)=>{
      this.ngOnInit();
      this._toastr.success(res.result);
      console.log(res);
    })
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ShowdailogEditedUserComponent, {
      data: {
        id : data.result.id,
        userName: data.result.userName,
        email: data.result.email,
        password: data.result.password,
        role: data.result.role,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');      
      if (result) {
        // Handle the updated user data here
        // For example, call a method to update the user in your service
        // this.updateUser(Userid, result);
      }
    });
  }
}
