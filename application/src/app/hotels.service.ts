import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

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

    this.getAllHotels();
  }

  /**
   * Get hotels information from the API
   */
  getAllHotels() {
    this.http.get('api/hotels')
      // Clear the hotels array to set the new results on it
      .do(() => {
        this.hotels.length = 0;
      })
      // Get the hotels array and return one by one
      .switchMap((hotels: Array<Hotel>) => hotels)
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

  /**
   * Get hotels information that have the number of stars and which name
   * contains the name received via parameter and
   *
   * @param {string} name - Filter hotels by this name
   * @param {number} stars - Filter hotels by stars
   */
  filterHotels(name: string, stars: number) {
    // Construct the url based on the parameters received
    let filterUrl = '';
    if (name !== '' && stars !== -1) { // both filtered are set
      console.log('filter hotels by name and stars');
      filterUrl = `api/hotels?name=${name}&stars=${stars}`;
    } else if (name !== '' && stars === -1) { // filter only by name
      console.log('filter hotels by name');
      filterUrl = `api/hotels?name=${name}`;
    } else if (name === '' && stars !== -1) { // filter only by stars
      console.log('filter hotels by stars');
      filterUrl = `api/hotels?stars=${stars}`;
    }

    this.http.get(filterUrl)
      // Clear the hotels array to set the new results on it
      .do(() => {
        this.hotels.length = 0;
      })
      // Get the hotels array and return one by one
      .switchMap((hotels: Array<Hotel>) => hotels)
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
