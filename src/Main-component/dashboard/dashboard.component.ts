import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PeriodicElement } from '../../Constant/userInfo';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  displayedColumns: string[] = ['position', 'teamName','champions', 'captain', 'flag','detail'];

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'India', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Australia', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'England', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'South Africa', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'New Zealand', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Pakistan', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Afghanistan', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Bangladesh', weight: 15.9994, symbol: 'O'}
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
