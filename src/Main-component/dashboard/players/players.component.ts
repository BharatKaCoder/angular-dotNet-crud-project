import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CtrophyHttpService } from '../../../Services/ctrophy-http.service';
import { playerData } from '../../../Constant/userInfo';

@Component({
  selector: 'app-players',
  imports: [MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, RouterModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  playerId:any;
  constructor(private _ctrophyService: CtrophyHttpService, private _route: ActivatedRoute) {
    this._route.queryParams.subscribe(params => {
      this.playerId = params['id'];
    });
  }
  displayedColumns: string[] = ['playerNumber', 'playerName', 'role', 'matches', 'highestScore','wickets', 'detail'];
  dataSource:any = [];

  ngOnInit(): void {
    this._ctrophyService.getPlayerList().subscribe((res)=>{
      if(res && res.result) {
          const getPlayerList:any = res.result;
          const TeamWiseList = getPlayerList.filter((filter:any)=>filter.teamId.toString() === this.playerId);
          this.dataSource = new MatTableDataSource<playerData>(TeamWiseList);
        }
      })
    }
  }

