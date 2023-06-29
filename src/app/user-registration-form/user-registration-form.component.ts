import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})

/**
 * Modal that is opened from the Welcome Page.
 * Form contains inputs for username*, password*, name*, email* and birthday.
 *
 * *indicates a required field
 *
 * If user is succesfully registered they will then be able to log in and browse movies page.
 *
 */
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Name: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Calls userRegistration() from fetch-api-data.service.ts
   *
   * Data provided by user in form fields sent as object. Object returned from API with additional information on user profile.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('User created successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
