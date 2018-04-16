import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerAmenitiesIcons();
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
}
