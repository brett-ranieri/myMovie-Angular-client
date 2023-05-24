import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];
  genre: any = '';
  director: any = '';

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

  openGenre(name: string, title: string): void {
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

  openDirector(name: string, title: string): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      this.director = resp;
      console.log(this.director);
      console.log('Bio', this.director.Bio);
      this.dialog.open(DirectorViewComponent, {
        data: {
          Title: title,
          Name: this.director.Name,
          Bio: this.director.Bio,
          BirthYear: this.director.Birth,
          DeathYear: this.director.Death,
        },
      });
      return this.director;
    });
  }
}
