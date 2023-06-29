import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://movie-api-git-main-brett-ranieri.vercel.app/';
@Injectable({
  providedIn: 'root',
})

/**
 * Creates a new service to load data from the API.
 */
export class FetchApiDataService {
  constructor(private http: HttpClient) {}
  /**
   * Makes API call to the user registraion endpoint
   * @param userDetails registration credentials provided by user in User Registration form
   * @returns http POST request
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * Makes API call to the user login endpoint
   * @param userDetails login credentials provided by user in User Login fom
   * @returns http POST request
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * Makes API call to the get all movies endpoint
   * @returns http GET request, response data contains an array of movie objects
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to the get movie by title endpoint
   * @param movieTitle the title of specified movie
   * @returns http GET request, response data contains an object with details about specified movie
   */
  getMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to the get director by name endpoint
   * @param directorName the name of specified director
   * @returns http GET request, response data contains an object with details about specified director
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to the get genre by name endpoint
   * @param genreName the name of specified genre
   * @returns http GET request, response data contains an object with details about specified genre
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to get all users
   * @returns http GET request, response data contains an array of objects, each with information about an individual user
   */
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}users`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to get a specific user
   * @returns http GET request, response data contains object with informaiton about specific user that was saved to local storage at login
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to the get favorite movies endpoint
   * @returns http GET request, response data contains an object holding id of each movie in favorites list
   */
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }
  /**
   * Makes API call to the add movie to favorites endpoint
   * @param movieId id of movie that wants to be added to favorite
   * @returns http PUT request, response data contains an object holding id of each movies in favorites list, including movie just added
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .put(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to the update user endpoint
   * @param updatedUser an object containing key:value pairs of any piece of information the user wants to update
   * @returns http PUT request, response data contains object with informaiton about specific user, including all updated key:value pairs
   */
  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to delete user endpoint
   *
   * **uses username stored in local storage at login to specify user to delete
   * @returns http DELETE request, response data contains string confirming that user has been deleted
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Makes API call to the remove movie from favorites endpoint
   * @param movieId id of movie that wants to be removed from favorites
   * @returns http DELETE request, response data contains an object holding id of each movies in favorites list, excluding movie just removed
   */
  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username + '/remove/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * function that returns reponse body from API calls
   * @param res response body
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  /**
   * function that handles errors with API calls
   * @param error
   * @returns string stated that there has been an error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
