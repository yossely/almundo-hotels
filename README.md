# Almundo Hotels

### Server

NodeJS server application that serves hotels information and allow filter hotels by name and/or stars

### Application

Angular application that allow users to fetch, display and filter hotels information by name and/or stars by consuming the REST API created in the _Server_

## Project Requirements

You must have installed [Node and npm](https://nodejs.org/en/)

## Run the Project

1. Clone this repository `git clone https://github.com/yossely/almundo-hotels.git`
2. Step into the `server` folder `cd almundo-hotels/server`
3. Run `npm run run-app`, this command will:
  - Install NodeJS server dependencies
  - Install Angular application dependencies
  - Build NodeJS server
  - Build Angular application
  - Serve the REST API
  - Serve the angular application with an http server
4. You can visit the application in `http://localhost:8080/`


## Development

To develop more feature of this project you have to:

1. Step into the `server` folder `cd almundo-hotels/server`
2. Run `npm run dev`, this will:
  - Serve the REST API at `http://localhost:3000/`
  - Perform hot reload each time you modified some file
1. In another terminal tab, step into the `application` folder `cd almundo-hotels/application`
2. Run `npm start`, this will:
  - Serve the angular application at `http://localhost:4200/`
  - Perform hot reload each time you modified some file
