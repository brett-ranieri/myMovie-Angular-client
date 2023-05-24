import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];
  genre: any = '';
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    console.log(localStorage.getItem('userId'));
  }
  openUserPageDialog(): void {
    this.dialog.open(UserPageComponent, {
      width: '500px',
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getGenre(name: string, title: string): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      this.genre = resp;
      console.log(this.genre);
      this.dialog.open(GenreViewComponent, {
        data: {
          Title: title,
          Name: this.genre.Name,
          Description: this.genre.Description,
        },
      });
      return this.genre;
    });
  }
}
