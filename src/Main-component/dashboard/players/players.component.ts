import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CtrophyHttpService } from '../../../Services/ctrophy-http.service';
import { playerData } from '../../../Constant/userInfo';
import { PlayerDetailsPopupComponent } from './player-details-popup/player-details-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-players',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent {
  playerId: any;
  displayedColumns: string[] = [
    'playerNumber',
    'playerName',
    'role',
    'matches',
    'highestScore',
    'wickets',
    'detail',
    'action',
  ];
  dataSource: any = [];
  teamName: string = '';
  readonly dialog = inject(MatDialog);

  constructor(
    private _ctrophyService: CtrophyHttpService,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params) => {
      this.playerId = params['id'];
      this.teamName = params['team'].toUpperCase();
    });
  }

  ngOnInit(): void {
    this._ctrophyService.getPlayerList().subscribe((res) => {
      if (res && res.result) {
        const getPlayerList: any = res.result;
        const TeamWiseList = getPlayerList.filter(
          (filter: any) => filter.teamId.toString() === this.playerId
        );
        this.dataSource = new MatTableDataSource<playerData>(TeamWiseList);
      }
    });
  }

  edit(element: any) {}

  onDelete(element: any) {}

  viewDetails() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PlayerDetailsPopupComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
      }
    });
  }
}

