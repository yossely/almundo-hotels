import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import isUrl = require('is-url');

import { Hotel } from './hotel.model';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HotelsService {
  /**
   * All the hotels
   */
  hotels: Array<Hotel>;

  /**
   * Handle the api Url based on the environment
   */
  apiUrl: string;

  constructor(private http: HttpClient) {
    // Init empty hotels
    this.hotels = new Array<Hotel>();

    this.apiUrl = environment.apiUrl;

    this.getAllHotels();
  }

  /**
   * Get hotels information from the API
   */
  getAllHotels() {
    this.getHotelsFromAPI(this.apiUrl + 'hotels');
  }

  /**
   * Get hotels information that have the number of stars and which name
   * contains the name received via parameter and
   *
   * @param {string} name - Filter hotels by this name
   * @param {string} stars - Stars filter selected (Example: 3,2,1)
   */
  filterHotels(name: string, stars: string) {
    // Construct the url based on the parameters received
    let filterUrl = '';
    if (name !== '' && stars !== '') { // both filtered are set
      console.log('filter hotels by name and stars');
      filterUrl = `${this.apiUrl}hotels?name=${name}&stars=${stars}`;
    } else if (name !== '' && stars === '') { // filter only by name
      console.log('filter hotels by name');
      filterUrl = `${this.apiUrl}hotels?name=${name}`;
    } else if (name === '' && stars !== '') { // filter only by stars
      console.log('filter hotels by stars');
      filterUrl = `${this.apiUrl}hotels?stars=${stars}`;
    }

    this.getHotelsFromAPI(filterUrl);
  }

  /**
   * Perform the http get request to fetch the hotels information
   *
   * @param url - url to perform the http get request to fetch the hotels information
   */
  getHotelsFromAPI(url: string) {
    this.http.get(url)
      // Clear the hotels array to set the new results on it
      .do(() => {
        this.hotels.length = 0;
      })
      // Get the hotels array and return one by one
      .switchMap((hotels: Array<Hotel>) => hotels)
      // Set image url for every hotel
      .map((hotel: Hotel) => {
        if (!isUrl(hotel.image)) {
          hotel.image = 'assets/images/hotels/' + hotel.image;
        }
        return hotel;
      })
      // Push every hotel into the `hotels` property
      .subscribe((hotel: Hotel) => {
        this.hotels.push(hotel);
      });
  }

}
