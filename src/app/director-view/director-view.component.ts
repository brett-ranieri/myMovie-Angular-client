import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.css'],
})
export class DirectorViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Name: string;
      Bio: string;
      BirthYear: string;
      DeathYear: string;
    }
  ) {}
}
