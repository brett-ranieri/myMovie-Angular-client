import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css'],
})
export class UserUpdateFormComponent implements OnInit {
  submittedData: any = {};
  @Input() updatedUserData = {
    Username: '',
    Password: '',
    Name: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  //Reviews data and creates new object containing only key/value pairs that were changed. Then will use new object to edit User, allowing use to only edit desired fields and not require all fields be changed.
  reviewData(): void {
    const oldData = this.updatedUserData;
    if (oldData.Username) {
      this.submittedData.Username = oldData.Username;
    }
    if (oldData.Password) {
      this.submittedData.Username = oldData.Password;
    }
    if (oldData.Name) {
      this.submittedData.Name = oldData.Name;
    }
    if (oldData.Email) {
      this.submittedData.Email = oldData.Email;
    }
    if (oldData.Birthday) {
      this.submittedData.Birthday = oldData.Birthday;
    }
    console.log(this.submittedData);
  }

  updateUser(): void {
    this.reviewData();
    this.fetchApiData.editUser(this.submittedData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('User updated successfully!', 'OK', {
          duration: 3000,
        });
        //routes to movies page to force reload of user info on next visit of user-page
        this.router.navigate(['movies']);
        //if username changed, sets new username to local storage to allow other components to function with updated info
        if (this.updatedUserData.Username) {
          localStorage.setItem('username', this.updatedUserData.Username);
        }
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
