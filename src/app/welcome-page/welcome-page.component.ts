import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
/**
 * Default view if user navigates to URL and is not logged in.
 * Displays a welcome message, a log in button, and a register button
 */
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Opens user registration modal, provides form for user to sign up.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens login modal, rovides input field for username and password for user to sign in.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
