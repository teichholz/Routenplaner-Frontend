import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { keyShape } from './interfaces/keyShape'

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
}
