import { Component } from '@angular/core';
import { AuthenticationService } from './common/service/authentication_service/authentication.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'SportsGeek-WebApp';

  constructor(public authservice3: AuthenticationService) { }
}
