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

  cancle(){
    this.dialogRef.close();
  }

}
