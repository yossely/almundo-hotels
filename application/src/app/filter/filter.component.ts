import { Component, OnInit } from '@angular/core';

import { HotelsService } from './../core/hotels.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  /**
   * This array will handle the filter by stars functionality (checkbox)
   */
  starsFilter: Array<any>;

  /**
   * This will control whether or not filter the hotels list by all stars
   */
  allStarsFilter: boolean;

  /**
   * Name to filter the hotels
   */
  nameFilter: string;

  constructor(private hotelsService: HotelsService) {
    this.initStarsFilter();
    this.allStarsFilter = true;
    this.nameFilter = '';
  }

  ngOnInit() {
  }

  /**
   * Initialize an array to handle the filter by stars functionality
   */
  initStarsFilter(): void {
    this.starsFilter = [
      {
        name: '5 stars',
        stars: new Array(5).fill(5),
        isActive: false
      },
      {
        name: '4 stars',
        stars: new Array(4).fill(4),
        isActive: false
      },
      {
        name: '3 stars',
        stars: new Array(3).fill(3),
        isActive: false
      },
      {
        name: '2 stars',
        stars: new Array(2).fill(2),
        isActive: false
      },
      {
        name: '1 stars',
        stars: new Array(1).fill(1),
        isActive: false
      }
    ];
  }

  /**
   * Filter hotels list by stars
   * This function is triggered every time the stars checkbox filter changes
   *
   * @param {boolean} hasAllFilterBeenSelected - Indicates if the `all` stars filter has been selected
   */
  filterHotelsList(hasAllFilterBeenSelected: boolean = false) {
    // If the filter `All stars` has been selected, unselect the rest of stars
    if (hasAllFilterBeenSelected) {
      this.unselectAllFilterStars();
    }

    if (this.isAnyStarsSelectedToFilter() || this.nameFilter !== '') {
      console.log('filter hotels list');
      this.hotelsService.filterHotels(this.nameFilter, this.getStarsFilterSelected());

      // Check or uncheck the `all` stars filter whether there is some stars filter selected or not
      if (this.isAnyStarsSelectedToFilter()) {
        this.allStarsFilter = false;
      } else {
        this.allStarsFilter = true;
      }
    } else {
      console.log('get all hotels');
      this.allStarsFilter = true;
      this.hotelsService.getAllHotels();
    }
  }

  /**
   * Get the number of stars that has been selected by the user
   *
   * @returns {string} Stars filter selected (Example: 3,2,1)
   */
  getStarsFilterSelected(): string {
    const starsSelected = Array<number>();

    this.starsFilter.forEach(starFilter => {
      if (starFilter.isActive) {
        starsSelected.push(starFilter.stars.length);
      }
    });

    return starsSelected.join(',');
  }

  /**
   * Check if there is some star filter selected different than the `all` filter
   *
   * @returns {boolean} true - There is at least ONE star filter selected
   *                    false - There's NO star filter selected
   */
  isAnyStarsSelectedToFilter(): boolean {
    let isThere = false;

    for (let index = 0; index < this.starsFilter.length; index++) {
      if (this.starsFilter[index].isActive) {
        isThere = true;
        break; // break for when find an active filter
      }
    }

    return isThere;
  }

  /**
   * Mark as unselect all the stars in the filter
   */
  unselectAllFilterStars() {
    this.starsFilter.forEach(starFilter => {
      starFilter.isActive = false;
    });
  }

}
