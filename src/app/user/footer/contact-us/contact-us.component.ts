import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  lat: number = -60.612604 ;
  lng: number = -44.817546;

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  constructor() { }

  ngOnInit(): void {

  }

  onChoseLocation(event:any){
     this.lat = event.coords.lat;
      this.lng = event.coords.lng;
  }
  onNavigate(){
    window.open("https://www.google.com/maps/place/54%C2%B028'50.5%22S+36%C2%B023'33.1%22W/@-54.480704,-36.3947017,17z/data=!3m1!4b1!4m9!1m2!2m1!1slone+island!3m5!1s0x0:0x0!7e2!8m2!3d-54.4807043!4d-36.3925134");
  }


}
