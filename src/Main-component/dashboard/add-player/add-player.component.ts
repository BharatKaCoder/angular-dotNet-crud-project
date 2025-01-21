import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { playerData } from '../../../Constant/userInfo';
import { RouterLink } from '@angular/router';

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
    team : new FormControl('',[Validators.required])
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
        const payload:playerData = {
          Id: this.addPlayerForm.value.playerNumber,
          PlayerName: this.addPlayerForm.value.playerName,
          Role: this.addPlayerForm.value.role,
          Matches: this.addPlayerForm.value.matches,
          HighestScore: this.addPlayerForm.value.highestScore,
          TeamId: filterTeamId.id,
        }
        console.log(payload);
      }
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('TeamList');
  }
}
