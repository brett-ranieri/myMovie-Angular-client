import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  toProfile(): void {
    this.router.navigate(['users']);
  }

  logoutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have been succesfully logged out.', 'OK', {
      duration: 3000,
    });
    this.router.navigate(['welcome']);
  }
}
