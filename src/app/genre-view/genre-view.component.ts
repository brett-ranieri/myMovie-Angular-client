import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css'],
})
/**
 * Class to display genre data from movie card component in dialog.
 */
export class GenreViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Name: string;
      Description: string;
    }
  ) {}
}
