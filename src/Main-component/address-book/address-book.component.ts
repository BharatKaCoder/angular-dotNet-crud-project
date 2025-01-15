import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IUserRegistration, tableData } from '../../Constant/userInfo';
import { CommonServiceService } from '../../Services/common-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { toArray } from 'rxjs';

@Component({
  selector: 'app-address-book',
  imports: [CommonModule],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})

export class AddressBookComponent {

  dataSource: IUserRegistration[] = [];
  
  constructor(private _commonService : CommonServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

  }
  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      const localStrValue:any = localStorage.getItem('localRegistration');
      const parsedValue = JSON.parse(localStrValue)
      this.dataSource = parsedValue;
    }
  }
}
