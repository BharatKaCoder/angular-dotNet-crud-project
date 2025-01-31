import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { teamInfo } from '../../Constant/userInfo';
import { CtrophyHttpService } from '../../Services/ctrophy-http.service';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { CommonServiceService } from '../../Services/common-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatDividerModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class DashboardComponent {

  displayedColumns: string[] = ['position', 'teamName', 'flag', 'champions', 'captain','detail'];
  imageUrl = "assets/images/"
  isSendData:boolean = false;
  dataSource:any = [];
  IsAdminUser:boolean = false;

  constructor(
    private _ctrophyService: CtrophyHttpService,
    private _commonService: CommonServiceService) {
    this._ctrophyService.getTeamList().subscribe((result)=>{
      if(result) {
        const teamList: any = result?.result;
        sessionStorage.setItem("TeamList",JSON.stringify(teamList));
        this.dataSource = new MatTableDataSource<teamInfo>(teamList);
        this._commonService.currentUserDetails.subscribe((data:any)=>{
          if(data) {
            this.IsAdminUser = (data.role === 'admin')? true : false;
          }
        });
      }
    });
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addPlayer() {
    this.isSendData = true;
  }
}
