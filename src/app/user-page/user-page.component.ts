import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
/**
 * Class that displays user info and gives user an opportunity to edit information
 */
export class UserPageComponent {
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }
  /**
   * Calls getUser() from fetch-api-data.service.ts
   * @returns Object containing key:value pairs of all saved user information
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }
  /**
   * Opens dialog that displays form for user to update information
   */
  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px',
    });
  }
  /**
   * Opens dialog that gives user option to delete their account
   */
  openDeleteUserDialog(): void {
    this.dialog.open(DeleteUserComponent, {
      width: '280px',
    });
  }
}
