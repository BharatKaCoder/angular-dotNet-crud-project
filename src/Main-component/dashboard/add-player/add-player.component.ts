import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CtrophyHttpService } from '../../../Services/ctrophy-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-player',
  imports: [CommonModule ,MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule, MatIconModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {
  teamList: any[] = [];
  selectedTeam:any;
  addPlayerForm: FormGroup = new FormGroup({
    playerName : new FormControl('',[Validators.required]),
    playerNumber : new FormControl('',[Validators.required]),
    role : new FormControl('',[Validators.required]),
    matches : new FormControl('',[Validators.required]),
    highestScore: new FormControl('',[Validators.required]),
    wickets: new FormControl('',[Validators.required]),
    team : new FormControl('',[Validators.required])
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private _cTrophyService:CtrophyHttpService,
    private _toaster:ToastrService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const getLocalData = sessionStorage.getItem("TeamList");
      if(getLocalData) {
        let ParsedData = JSON.parse(getLocalData);
        this.teamList = ParsedData;
      }
    }
  }

  savePlayerData() {
    if (this.addPlayerForm.value) {
      const filterTeamId:any = this.teamList.find((fil)=>fil.teamName === this.addPlayerForm.value.team);
      if (filterTeamId) {
        const payload:any = {
          Id: this.addPlayerForm.value.playerNumber,
          PlayerName: this.addPlayerForm.value.playerName,
          Role: this.addPlayerForm.value.role,
          Matches: this.addPlayerForm.value.matches,
          HighestScore: this.addPlayerForm.value.highestScore,
          Wickets: this.addPlayerForm.value.wickets,
          TeamId: filterTeamId.id,
        }
        this._cTrophyService.addPlayerApi(payload).toPromise()
        .then((resp:any)=>{
          if(resp) {
            this._toaster.success(resp.message);
            this.addPlayerForm.reset();
          }
        })
        .catch((error) => {
          console.error(error);
          this._toaster.error('Something went wrong!');
        });
        // this._cTrophyService.addPlayerApi(payload).subscribe((resp:any)=>{
        //   if(resp) {
        //     this._toaster.success(resp.message);
        //     this.addPlayerForm.reset();
        //   }         
        // });
      }
    }
  }

  ngOnDestroy() {
    if(this.teamList.length>0) {
      sessionStorage.removeItem('TeamList');
    }
  }
}
