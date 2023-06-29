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
/**
 * Class that fetches and displays all movies in the database in a card format.
 */
export class MovieCardComponent {
  movies: any[] = [];
  genre: any = '';
  director: any = '';
  movie: any = '';
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Calls getAllMovies() from fetch-api-data.service.ts
   * @returns An array of objects, each containing all data about a specific movie.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * Calls getFavoriteMovies() from fetch-api-data.service.ts
   * @returns An array of movie Ids that have been favorited by user, will be empty by default until updated by user.
   */
  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favorites = resp;
      return this.favorites;
    });
  }
  /**
   * Checks if the favorite movies array contains the specified movieId
   * @param id id of specified movie
   * @returns a boolean value
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }
  /**
   * Calls getGenre() from fetch-api-data.service.ts
   * @param name genre name
   * @param title title of specified movie
   * @returns opens dialog to display movie title, name of genre, and genre description
   */
  openGenre(name: string, title: string): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      this.genre = resp;
      this.dialog.open(GenreViewComponent, {
        data: {
          Title: title,
          Name: this.genre.Name,
          Description: this.genre.Description,
        },
      });
      // return this.genre;
    });
  }
  /**
   * Calls getDirector() from fetch-api-data.service.ts
   * @param name director name
   * @param title title of specified movie
   * @returns opens dialog to display movie title, name of director, director bio, director birth year and director death year
   */
  openDirector(name: string, title: string): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      this.director = resp;
      this.dialog.open(DirectorViewComponent, {
        data: {
          Title: title,
          Name: this.director.Name,
          Bio: this.director.Bio,
          BirthYear: this.director.Birth,
          DeathYear: this.director.Death,
        },
      });
      // return this.director;
    });
  }
  /**
   * Calls getMovie() from fetch-api-data.service.ts
   * @param title title of specified movie
   * @returns opens dialog to display movie title and movie summary
   */
  openSummary(title: string): void {
    this.fetchApiData.getMovie(title).subscribe((resp: any) => {
      this.movie = resp;
      this.dialog.open(SummaryViewComponent, {
        data: {
          Title: title,
          Summary: this.movie.Description,
        },
      });
      // return this.director;
    });
  }
  /**
   * Calls addFavoriteMovie() from fetch-api-data.service.ts, adds id to favorite movies array
   * @param id id of specified movie
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(
      (resp: any) => {
        this.snackBar.open('Movie has been added to your favorites!', 'OK', {
          duration: 3000,
        });
        this.getFavorites();
      },
      (resp) => {
        this.snackBar.open(resp, 'OK', {
          duration: 2000,
        });
      }
    );
  }
  /**
   * Calls removeFavoriteMovie() from fetch-api-data.service.ts, removes id from favorite movies array
   * @param id
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe(
      (resp: any) => {
        this.snackBar.open('Movie has been removed from your favorites', 'OK', {
          duration: 3000,
        });
        this.getFavorites();
      },
      (resp) => {
        this.snackBar.open(resp, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
