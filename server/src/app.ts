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
      const hotels = this.db
        .get('hotels')
        .value();

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
}

export default new App().express
