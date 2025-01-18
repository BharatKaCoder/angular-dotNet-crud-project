import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IUserRegistration } from '../../Constant/userInfo';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../Services/http.service';
import { CommonServiceService } from '../../Services/common-service.service';

@Component({
  selector: 'app-showdailog-edited-user',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './showdailog-edited-user.component.html',
  // styleUrl: './showdailog-edited-user.component.css'
})
export class ShowdailogEditedUserComponent {
  readonly dialogRef = inject(MatDialogRef<ShowdailogEditedUserComponent>);
  readonly data = inject<IUserRegistration>(MAT_DIALOG_DATA);
  
  userForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    role: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(private fb: FormBuilder, private _httpService:HttpService, private _commonService: CommonServiceService) {
    // Initialize the form with injected data
    this.userForm = this.fb.group({
      userName: [this.data.userName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      password: [this.data.password, Validators.required],
      role: [this.data.role, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    if (this.userForm.valid) {
      this.userForm.value['id'] = this.data.id;
      this._httpService.UpdateUserApi(this.data.id, this.userForm.value).subscribe((res)=>{
        console.log(res);
      });
      this.dialogRef.close();
    }
  }
}
