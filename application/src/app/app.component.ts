import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Hotels information fetched from the API
   */
  hotels: Array<Hotel>;

  /**
   * This array will handle the filter by stars functionality (checkbox)
   */
  starsFilter: Array<Object>;

  /**
   * Name to filter the hotels
   */
  nameFilter: string;

  constructor(
      private iconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer,
      private hotelsService: HotelsService
    ) {
    this.registerAmenitiesIcons();
    this.initStarsFilter();

    this.nameFilter = '';
    this.hotels = this.hotelsService.hotels;
  }

  /**
   * Register the amenities icons SVG's to be able to use them in mat-icons
   */
  registerAmenitiesIcons() {
    // Bathrobes
    this.iconRegistry.addSvgIcon(
      'bathrobes',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/bathrobes.svg'));

    // Bathtub
    this.iconRegistry.addSvgIcon(
      'bathtub',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/bathtub.svg'));

    // Beach
    this.iconRegistry.addSvgIcon(
      'beach',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/beach.svg'));

    // Beach pool facilities
    this.iconRegistry.addSvgIcon(
      'beach-pool-facilities',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/beach-pool-facilities.svg'));

    // Business center
    this.iconRegistry.addSvgIcon(
      'business-center',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/business-center.svg'));

    // Children club
    this.iconRegistry.addSvgIcon(
      'children-club',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/children-club.svg'));

    // Coffee maker
    this.iconRegistry.addSvgIcon(
      'coffe-maker',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/coffe-maker.svg'));

    // Deep soaking bathtub
    this.iconRegistry.addSvgIcon(
      'deep-soaking-bathtub',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/deep-soaking-bathtub.svg'));

    // Fitness center
    this.iconRegistry.addSvgIcon(
      'fitness-center',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/fitness-center.svg'));

    // Garden
    this.iconRegistry.addSvgIcon(
      'garden',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/garden.svg'));

    // Kitchen facilities
    this.iconRegistry.addSvgIcon(
      'kitchen-facilities',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/kitchen-facilities.svg'));

    // Newspaper
    this.iconRegistry.addSvgIcon(
      'newspaper',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/newspaper.svg'));

    // Nightclub
    this.iconRegistry.addSvgIcon(
      'nightclub',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/nightclub.svg'));

    // Restaurant
    this.iconRegistry.addSvgIcon(
      'restaurant',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/restaurant.svg'));

    // Safety box
    this.iconRegistry.addSvgIcon(
      'safety-box',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/safety-box.svg'));

    // Separate-bredroom
    this.iconRegistry.addSvgIcon(
      'separate-bredroom',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/separate-bredroom.svg'));

    // Sheets
    this.iconRegistry.addSvgIcon(
      'sheets',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/amenities/sheets.svg'));

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

  /**
   * Initialize an array to handle the filter by stars functionality
   */
  initStarsFilter(): void {
    this.starsFilter = [
      {
        name: 'all',
        isActive: true
      },
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
   */
  filterHotelsListByStars() {
    console.log('stars filter changed, filter hotels list - Not implemented yet');
  }

  /**
   * Filter hotels list by name
   * If current nameFilter is not empty, request the hotels filtered by it, otherwise
   * request all hotels again
   */
  filterHotelsListByName() {
    if (this.nameFilter !== '') {
      console.log('filter hotels list by name');
      this.hotelsService.filterHotelsByName(this.nameFilter);
    } else {
      this.hotelsService.getAllHotels();
    }
  }
}
