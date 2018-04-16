import * as express from 'express';

// Database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database/data.json');
// Allow CORS - because of the two servers (http-server and node server app)
const cors = require('cors');
const shortid = require('shortid');

class App {
  public express;
  // Database handler
  public db;

  constructor() {
    this.express = express();
    // Support JSON-encoded bodies
    this.express.use(express.json());
    // User cors
    this.express.use(cors());

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
        hotels = this.getHotelsByNameAndStars(req.query.name, this.getStarsFromQueryParam(req.query.stars));
      } else if (req.query.name && !req.query.stars) {
        hotels = this.getHotelsByName(req.query.name);
      } else if (!req.query.name && req.query.stars) {
        hotels = this.getHotelsByStars(this.getStarsFromQueryParam(req.query.stars))
      } else {
        hotels = this.getAllHotels();
      }

      res.json(hotels)
    });

    // Create a new hotel
    router.post('/hotel', (req, res) => {
      console.log('create new hotel');
      const newHotel = req.body;
      // Generate a unique `id` for the new hotel
      newHotel.id = shortid.generate();

      const validationMessage = this.isHotelValid(newHotel);

      if (validationMessage === '') {
        this.db.get('hotels')
          .push(newHotel)
          .write();

        res.json({
          message: 'Great! Hotel created successfully'
        })
      } else {
        res.status(400).send({
          message: validationMessage
        });
      }
    });

    // Remove hotel
    router.delete('/hotel/:hotelId', (req, res) => {
      console.log('delete hotel with ID:', req.params.hotelId);

      if (this.hotelExists(req.params.hotelId)) {
        this.db.get('hotels')
          .remove({ id: req.params.hotelId })
          .write()

        res.json({
          message: 'Hotel removed successfully'
        })
      } else {
        res.status(400).send({
          message: `The hotel with id ${req.params.hotelId} does not exists`
        });
      }
    });

    // Create a new hotel
    router.put('/hotel/:hotelId', (req, res) => {
      console.log('update hotel with id', req.params.hotelId);
      const hotelInfo = req.body;

      const validationMessage = this.isHotelValid(hotelInfo);

      if (this.hotelExists(req.params.hotelId) && validationMessage === '') {
        this.db.get('hotels')
          .find({ id: req.params.hotelId })
          .assign(hotelInfo)
          .write();

        res.json({
          message: 'Great! Hotel updated successfully'
        })
      } else {
        if (validationMessage !== '') {
          res.status(400).send({
            message: validationMessage
          });
        } else {
          res.status(400).send({
            message: `The hotel with id ${req.params.hotelId} does not exists`
          });
        }
      }
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
      .value();
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
   * @param {Array<number>} stars - Quantity of stars required for a hotel
   */
  private getHotelsByStars(stars: Array<number>) {
    console.log(`get hotels with ${stars} stars`);
    return this.db
      .get('hotels')
      .filter((hotel) => stars.indexOf(hotel.stars) !== -1)
      .value();
  }

  /**
   * Transform the stars received in the request from string to an array of integer that
   * indicate the hotel stars that are going to be used in the filter
   *
   * @param {string} starsQuery - all the stars received in the query from the request (Example: 3,2)
   */
  private getStarsFromQueryParam(starsQuery: string): Array<number> {
    const starsNumber = starsQuery.split(',').map((star: string) => {
      return parseInt(star, 10);
    });

    return starsNumber;
  }

  /**
   * Get all hotels with the name and number of stars required
   *
   * @param {string} name - Name of the Hotel required
   * @param {Array<number>} stars - Quantity of stars required for a hotel
   */
  private getHotelsByNameAndStars(name: string, stars: Array<number>) {
    console.log(`get hotels named ${name} and with ${stars} stars`);
    return this.db
      .get('hotels')
      .filter((hotel) => {
        // Transform the names with toLowerCase to compare them
        const hotelName = hotel.name.toLowerCase();
        name = name.toLowerCase();

        // If the hotel name includes the name and stars set in the parameter return it
        return hotelName.includes(name) && (stars.indexOf(hotel.stars) !== -1);
      })
      .value();
  }

  /**
   * Check the hotel to validate that all the information required is present
   *
   * @param {Object} hotel - new hotel information to check
   * @return {string} - error message if found or empty string if everything goes well
   */
  private isHotelValid(hotel): string {

    if (!hotel.name || (typeof hotel.name !== 'string')) {
      return 'Check hotel name';
    } else if (!hotel.stars || (typeof hotel.stars !== 'number')) {
      return 'Check hotel stars';
    } else if (!hotel.price || (typeof hotel.price !== 'number')) {
      return 'Check hotel price';
    } else if (!hotel.image || (typeof hotel.image !== 'string')) {
      return 'Check hotel image';
    } else if (!hotel.amenities) {
      return 'Check hotel amenities';
    }

    return '';
  }

  /**
   * Check if the hotel exists based on the id received via parameter
   *
   * @param {string} hotelId - hotel id to find in the hotels list
   * @return {boolean} - true - Hotel exists
   *                     false - Hotel doesn't exist
   */
  private hotelExists(hotelId: string): boolean {
    const hotelResult = this.db
      .get('hotels')
      .filter((hotel) => hotel.id === hotelId)
      .value()

    if (hotelResult.length > 0) {
      return true;
    }
    return false;
  }
}

export default new App().express
