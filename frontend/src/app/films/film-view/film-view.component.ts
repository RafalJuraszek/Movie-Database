import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FilmService} from '../film.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-film-view',
  templateUrl: './film-view.component.html',
  styleUrls: ['./film-view.component.css']
})
export class FilmViewComponent implements OnInit {

  film;
  value = 0;
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

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
  }

  ngOnInit(): void {
  }

}
