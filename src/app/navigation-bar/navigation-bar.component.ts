import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
/**
 * Class that provides simple UI at the top of the screen in both movie and users views.
 * Allows users to navigate through different pages.
 */
export class NavigationBarComponent {
  constructor(public router: Router, public snackBar: MatSnackBar) {}
  /**
   * Navigates to the movies view
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  /**
   * Navigates to the users view
   */
  toProfile(): void {
    this.router.navigate(['users']);
  }
  /**
   * Logs out user
   * Does so by clearing local storage and then navigating back to the welcome page.
   */
  logoutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have been succesfully logged out.', 'OK', {
      duration: 3000,
    });
    this.router.navigate(['welcome']);
  }
}
