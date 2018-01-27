# Match Report Data Input

This project provides a web app where the user can maintain data about an
on going match. These values will then be updated via websockets to other data clients
and the main graphics clients.

## Technology

The app consists of separate backend and frontend servers, both based in node.js.
The backend server uses express, and is built upon express-generator, whilst the
frontend is built using React, built upon create-react-app.

## Installation

The app can be run in two different ways, either using docker or a package manager.

**Using docker**

This process will required docker to be installed on the machine.

Clone the repository

```
git clone https://github.com/jamie-lynch/MRData
```

Setup environment variables (insert address as appropriate )
Note that the actual ip address of the machine must be used. localhost will not work as the database is run in a separate container

```
# backend/.env

# Database
DB_ADDRESS="mongodb://hostname:27017/mrdata"
```

Run docker containers

```
docker-compose up -d
```

**Using npm / yarn**

This process will require node.js and npm and/or yarn to be installed on your machine. You will also need a running intace of mongodb.

Clone the repository

```
git clone https://github.com/jamie-lynch/MRData
```

Setup environment variables (insert address as appropriate )
Note that the actual ip address of the machine must be used. localhost will not work as the database is run in a separate container

```
# backend/.env

# Database
DB_ADDRESS="mongodb://hostname:27017/mrdata"
```

Run the backend

```
cd backend && yarn install && yarn start

or

cd backend && npm i && npm start
```

Run the frontend

```
cd frontend && yarn install && yarn start

or

cd frontend && npm i && npm start
```

## Listening to websocket messages

All data changes effected in the frontend will be broadcast via a websocket server. These messages can be hooked into from external systems if desired.

The websocket server sits at the same location as the backend http server (by default on port 3001).

Each message will by a JSON objects containing two fields:

* type - this will be one of
  * stats
  * event
* data - this will be (for each of the above types respectively)
  * An array of arrays in the form [name, val1, val2]
  * An object with type (values to be defined) and message keys
