import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Hotel } from './../core/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit, AfterViewInit {

  /**
   * Current hotel displayed in the template
   */
  @Input() hotel: Hotel;

  /**
   * Handle the hotel image element in the template
   */
  @ViewChild('hotelImage') hotelImage: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Get an array which length is the number of stars to use it in an ngFor directive
   *
   * @param {number} stars - number of stars of a hotel
   * @returns {Array<number>}
   */
  numberOfStars(stars: number): Array<number> {
    return new Array(stars).fill(stars);
  }

  ngAfterViewInit() {
    this.checkHotelImageLoaded();
  }

  /**
   * Check if the hotel image load successfully, if not, set a default image
   */
  checkHotelImageLoaded() {
    const testImage = new Image();
    // testImage.onload = imageFound;
    testImage.onerror = () => {
      this.hotelImage.nativeElement.src = 'assets/images/no-hotel-image.jpg';
    };
    testImage.src = this.hotelImage.nativeElement.src;
  }

}
