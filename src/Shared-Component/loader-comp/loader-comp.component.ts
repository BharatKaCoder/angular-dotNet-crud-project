import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonServiceService } from '../../Services/common-service.service';

@Component({
  selector: 'app-loader-comp',
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader-comp.component.html',
  styleUrl: './loader-comp.component.css'
})
export class LoaderCompComponent {

  showLoader:boolean = false;
  constructor(private _commonService: CommonServiceService) { }
  ngOnInit() { 
    this._commonService.loaderStatus.subscribe((status:any)=>{
      this.showLoader = status;
    });
  }
}
