import { Component, OnInit, Input } from '@angular/core';

import { Hotel } from './../core/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  /**
   * Current hotel displayed in the template
   */
  @Input() hotel: Hotel;

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

}
