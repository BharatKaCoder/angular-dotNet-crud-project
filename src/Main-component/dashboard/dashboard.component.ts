import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { teamInfo } from '../../Constant/userInfo';
import { CtrophyHttpService } from '../../Services/ctrophy-http.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  displayedColumns: string[] = ['position', 'teamName', 'flag', 'champions', 'captain','detail'];
  imageUrl = "assets/images/"
  dataSource:any = [];

  constructor(private _ctrophyService: CtrophyHttpService) {
    this._ctrophyService.getTeamList().subscribe((result)=>{
      if(result) {
        const teamList: any = result?.result;
        this.dataSource = new MatTableDataSource<teamInfo>(teamList);
      }
    });
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
