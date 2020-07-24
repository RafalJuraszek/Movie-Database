import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FilmService} from '../film.service';
import {Router} from '@angular/router';
import {RatingRequest} from '../../payload/rating-request.payload';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.css']
})
export class FilmViewComponent implements OnInit {

  description;
  show = true;

  film;
  value = 0;
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  rate;
  blockedRate = false;

  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: 1
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: 2
    }
  ];

  constructor(private formBuilder: FormBuilder, private filmService: FilmService, private router: Router) {
    this.film = this.router.getCurrentNavigation().extras.state?.film;
    this.rate = this.router.getCurrentNavigation().extras.state?.rate;
  }

  ngOnInit(): void {
    this.filmService.getRatingByFilmIdAndUsername(this.film.id).subscribe(rating => {
      this.value = rating.stars;
      this.blockedRate = true;
      this.description = rating.description;
      this.show = false;
      }
    );
  }

  onSubmit() {
    this.filmService.addRating(new RatingRequest(this.film.id, this.value, this.description)).subscribe( res => {
      console.log(res);
      this.show = false;
      this.blockedRate = true;
      }
    );
  }

}
