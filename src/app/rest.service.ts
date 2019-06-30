import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { keyShape } from './interfaces/shapes'

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  request(url){
    return this.http.get(url);
  }

  getKey(){
    const res = this.http.get<keyShape>("http://localhost:8080/key/google"); 
    return res;
  }

  getPois(location, radius){
    console.log(location);
    
    const url = "http://localhost:8080/poi/get?latitude=" + location.latitude +
                "&longitude=" + location.longitude +
                "&radius=" + radius;
    const res = this.http.get(url); 
    return res;
  }
}
