import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { playerData } from '../../../../Constant/userInfo';

@Component({
  selector: 'app-player-details-popup',
  imports: [
    MatCardModule, MatButtonModule, MatDialogActions, MatDialogContent
  ],
  templateUrl: './player-details-popup.component.html',
  styleUrl: './player-details-popup.component.css'
})
export class PlayerDetailsPopupComponent {

  readonly dialogRef = inject(MatDialogRef<PlayerDetailsPopupComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  player = {
    name: 'MS Dhoni',
    playerId: '7',
    position: 'Batsman',
    age: 36,
    height: 170,
    weight: 72,
    nationality: 'Indian',
    imageUrl: 'assets/profile-picture.png' ,
    biography: 'MS Dhoni is one of the greatest cricketer of all time, known for his hitting, vision, and wicket keeping abilities.'
};


  cancle(){
    this.dialogRef.close();
  }

}
