import { Observable } from 'rxjs/Observable';
import { BarService } from 'ng-test-lib';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value$: Observable<string>;

  constructor (bar: BarService) {
     this.value$ = bar.value;
  }
}
