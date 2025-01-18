import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IUserRegistration, tableData } from '../../Constant/userInfo';
import { CommonServiceService } from '../../Services/common-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { toArray } from 'rxjs';
import { HttpService } from '../../Services/http.service';

@Component({
  selector: 'app-address-book',
  imports: [CommonModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})

export class AddressBookComponent {

  dataSource: IUserRegistration[] = [];
  
  constructor(
    private _commonService : CommonServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _httpService: HttpService
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

  edit(value:any) {

  }

  onDelete(id:any) {
    this._httpService.DeleteUserApi(id).subscribe((res)=>{
      console.log(res);
    })
  }
}
