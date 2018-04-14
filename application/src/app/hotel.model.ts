export interface Hotel {
  /**
   * Id of the hotel
   */
  id: number;

  /**
   * Name of the hotel
   */
  name: string;

  /**
   * Number of stars of the hotel
   */
  stars: number;

  /**
   * Pricer per night of the hotel
   */
  price: number;

  /**
   * Image name of the hotel
   */
  image: string;

  /**
   * Array of amenities of the hotel
   */
  amenities: Array<string>;
}
