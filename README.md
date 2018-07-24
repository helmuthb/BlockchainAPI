# BlockchainAPI

This is a simple Blockchain API service as part of the Udacity Blockchain Nanodegree.

It uses [express](https://expressjs.com) as its framework.

## Usage

### Installation

```
npm install
```
This installs the dependencies of the project.

### Start API server
```
npm start
```
This starts the API server, listening on port 8000 of localhost.

### Endpoints

The endpoints implemented are:
```
GET /block/{block-number}
```
This returns the block of the given number

```
POST /block
```
This will store the JSON request body as a new block on the chain.