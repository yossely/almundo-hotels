import * as express from 'express';

// Database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database/data.json');

class App {
  public express;
  // Database handler
  public db;

  constructor() {
    this.express = express();
    this.initDatabase();
    this.mountRoutes();
  }

  /**
   * Set all routes handle in the server
   */
  private mountRoutes(): void {
    const router = express.Router();

    // Get all hotels
    router.get('/hotels', (req, res) => {
      // hotels to be returned - based on the query params
      let hotels;

      if (req.query.name && req.query.stars) {
        hotels = this.getHotelsByNameAndStars(req.query.name, parseInt(req.query.stars, 10));
      } else if (req.query.name && !req.query.stars) {
        hotels = this.getHotelsByName(req.query.name);
      } else if (!req.query.name && req.query.stars) {
        hotels = this.getHotelsByStars(parseInt(req.query.stars, 10))
      } else {
        hotels = this.getAllHotels();
      }

      res.json(hotels)
    })

    // Root route
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!!'
      })
    })

    // Initialize router for the express application
    this.express.use('/', router);
  }

  /**
   * Initialize the database with the information in the json file
   */
  private initDatabase() {
    this.db = low(adapter);
  }

  /**
   * Get all Hotels from the database
   */
  private getAllHotels() {
    console.log('get all hotels')
    return this.db
      .get('hotels')
      .value();;
  }

  /**
   * Get all hotels with the name receive in the parameter
   *
   * @param {string} name - Name of the Hotel required
   */
  private getHotelsByName(name: string) {
    console.log(`get hotels named ${name}`);
    return this.db
      .get('hotels')
      .filter((hotel) => {
        // Transform the names with toLowerCase to compare them
        const hotelName = hotel.name.toLowerCase();
        name = name.toLowerCase();

        // If the hotel name includes the name set in the parameter return it
        return hotelName.includes(name);
      })
      .value();
  }

  /**
   * Get all hotels with the number of the stars required
   *
   * @param {number} stars - Quantity of stars required for a hotel
   */
  private getHotelsByStars(stars: number) {
    console.log(`get hotels with ${stars} stars`);
    return this.db
      .get('hotels')
      .filter({
        stars
      })
      .value();
  }

  /**
   * Get all hotels with the name and number of stars required
   *
   * @param {string} name - Name of the Hotel required
   * @param {number} stars - Quantity of stars required for a hotel
   */
  private getHotelsByNameAndStars(name: string, stars: number) {
    console.log(`get hotels named ${name} and with ${stars} stars`);
    return this.db
      .get('hotels')
      .filter((hotel) => {
        // Transform the names with toLowerCase to compare them
        const hotelName = hotel.name.toLowerCase();
        name = name.toLowerCase();

        // If the hotel name includes the name set in the parameter return it
        return hotelName.includes(name) && hotel.stars === stars;
      })
      .value();
  }
}

export default new App().express
