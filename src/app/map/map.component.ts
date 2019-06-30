import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { keyShape } from './../interfaces/shapes'
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  coords = [
    { lat: 19, lng: 19 },
    { lat: 20, lng: 20 }
  ];
  markers = [
    { lat: 20, lng: 20 },
    { lat: 21, lng: 21 },
    { lat: 22, lng: 22 },
    { lat: 23, lng: 23 }
  ];
  pois = []
  selectedPoi = []
  location;
  marker;
  maptype = 'satelite'
  url = null;
  key = null;
  coord = { lat: 20, lng: 20 };

  constructor(private http: RestService) { }

  // loadExternalScript(url){
  //   return new Promise(resolve => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = url;
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   });
  // }


  ngOnInit() {
    this.http.getKey().subscribe((key: keyShape) => {
      this.key = key.key
      this.url = "https://maps.googleapis.com/maps/api/js?key=" + this.key + "&callback=initMap";
      console.log(this.url);
      // this.loadExternalScript(this.url);
      this.getLocation();
      // this.getPois();
    });
  }

  setMapType(type) {

  }

  getPois() {
    this.http.getPois(this.location, 50).subscribe((pois : any[]) => {
      console.log(pois);
      this.pois = pois;
    })
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(loc => {
        this.location = loc.coords;
        this.getPois();
      });
    }
  }

}