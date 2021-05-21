import { Component } from '@angular/core';
import { AuthenticationService } from './common/service/authentication_service/authentication.service';
import {ViewEncapsulation} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'SportsGeek-WebApp';
  mediaSub!:Subscription;
  deviceXs!:boolean;
  constructor(
    public authservice3: AuthenticationService,
    public mediaObserver:MediaObserver
    ) { }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }
}
