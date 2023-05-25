import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  user: any = {};
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log('from func', this.user);
      return this.user;
    });
  }

  // getUserInfo(): void {
  //   this.fetchApiData.getAllUsers().subscribe((resp: any) => {
  //     const userId = localStorage.getItem('userId');
  //     console.log(userId);
  //     var allUsers: any[] = resp;
  //     var thisUser: any = {};
  //     console.log('from func', allUsers);
  //     thisUser = allUsers.filter((user) => {
  //       console.log(user);
  //       user._id = userId;
  //     });
  //     console.log('this user', thisUser);
  //     return this.user;
  //   });
  // }
}
