import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SummaryViewComponent } from '../summary-view/summary-view.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];
  genre: any = '';
  director: any = '';
  movie: any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    console.log(localStorage.getItem('userId'));
  }
  openUserPage(): void {
    this.router.navigate(['users']);
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

  openSummary(title: string): void {
    this.fetchApiData.getMovie(title).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      this.dialog.open(SummaryViewComponent, {
        data: {
          Title: title,
          Summary: this.movie.Description,
        },
      });
      return this.director;
    });
  }

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe(
      (resp: any) => {
        console.log(resp);
        this.snackBar.open('User updated successfully!', 'OK', {
          duration: 3000,
        });
      },
      (resp) => {
        this.snackBar.open(resp, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
