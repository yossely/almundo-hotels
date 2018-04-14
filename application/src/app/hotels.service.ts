import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Hotel } from './hotel.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HotelsService {
  /**
   * All the hotels
   */
  hotels: Array<Hotel>;

  constructor(private http: HttpClient) {
    // Init empty hotels
    this.hotels = new Array<Hotel>();

    this.getHotels();
  }

  /**
   * Get hotels information from the API
   */
  getHotels() {
    return this.http.get('api/hotels')
      // Get the hotels array and return one by one
      .switchMap((hotels: Array<Hotel>) => Observable.from(hotels))
      // Set image url for every hotel
      .map((hotel: Hotel) => {
        hotel.image = 'assets/images/hotels/' + hotel.image;
        return hotel;
      })
      // Push every hotel into the `hotels` property
      .subscribe((hotel: Hotel) => {
        this.hotels.push(hotel);
      });
  }

}
