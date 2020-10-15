import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movieDB: any[] = [];
  actorsDB: any[] = [];
  section = 1;
  selectedActorId: string = '';
  selectedMovieId: string = '';
  title: string = '';
  year: number = 0;
  actorId: string = '';
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe((result) => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe((result) => {
      this.onGetMovies();
    });
  }

  // Delete Movie by year
  onDeleteMovieYear(year) {
    this.dbService.deleteMovieYear(year).subscribe((result) => {
      this.onGetMovies();
    });
  }

  // Add actor to movie
  addActorToMovie() {
    this.dbService
      .addActorToMovie(this.selectedMovieId, this.selectedActorId)
      .subscribe((result) => {
        this.onGetMovies();
      });
  }

  onSelectUpdateActor(item) {
    this.selectedActorId = item._id;
  }
  onSelectUpdateMovie(item) {
    this.selectedMovieId = item._id;
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.title = '';
    this.year = 0;
    this.actorId = '';
  }
}
