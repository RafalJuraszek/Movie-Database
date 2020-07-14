import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FilmService} from '../films/film.service';
import {Router} from '@angular/router';
import {RatingModel} from '../films/rating.model';
import {StarRatingComponent} from 'ng-starrating';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

  addRatingForm: FormGroup;
  film;

  constructor(private formBuilder: FormBuilder, private filmService: FilmService, private router: Router) {
    this.film = this.router.getCurrentNavigation().extras.state?.film;
  }

  ngOnInit(): void {

    this.addRatingForm = this.formBuilder.group({
      description: [null, Validators.required],
      stars: [null, Validators.required]
    });
  }


  addRating() {

    if (!this.addRatingForm.valid || this.addRatingForm.value.stars > 5 || this.addRatingForm.value.stars < 0) {
      return;
    }
    const value = this.addRatingForm.value;
    const newRating = new RatingModel(null, this.film.id, value.stars, value.description);

    this.filmService.addRating(newRating).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/films');
    });


  }

}
