import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
/**
 * Class that allows user to delete account
 */
export class DeleteUserComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}
  /**
   * Calls deleteUser() from fetch-api-data.service.ts
   *
   * Confirms that account has been deleted, clears local storage, and navigates user back to welcome page.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      (result) => {
        console.log(result);
        localStorage.clear();
        this.dialogRef.close();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account has been deleted.', 'OK', {
          duration: 3000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
  /**
   * Closes dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
