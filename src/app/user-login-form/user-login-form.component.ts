import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
/**
 * Modal that is opened from the Welcome Page.
 * Form contains inputs for username* and password*
 *
 * *indicates a required field
 *
 * If user provides accurate credentials they will be logged in and navigated to movies page.
 *
 * *API will provide a token after login that will be stored in local storage and used for all subsequent API calls.
 *
 */
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Calls userLogin() from fetch-api-data.service.ts
   *
   * Data provided by user in form fields sent as object. Object returned from API with token, which is stored in local storage.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user._id);
        this.dialogRef.close();
        this.router.navigate(['movies']);
        this.snackBar.open('Logged in', 'OK', {
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
