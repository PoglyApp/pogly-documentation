# Installation

### Prerequisites
- The Pogly Standalone project files, downloaded from the [releases](https://github.com/PoglyApp/PoglyStandalone/releases) page in this repository.
- [SpacetimeDB](https://spacetimedb.com) as Pogly utilizes it for its server and database. The installation instructions can be found on their [website](https://spacetimedb.com/install) or [github](https://github.com/clockworklabs/SpacetimeDB/tree/master#installation). 
- [Node](https://nodejs.org/en/download) (v20.10.0) and [Typescript](https://www.npmjs.com/package/typescript), as Pogly Standalone is written in React/Typescript.


### Frontend Setup

There are two setup options for Pogly Standalone's frontend:
1. Utilize the [Standalone App](https://standalone.pogly.gg) on Pogly.gg*
2. Self-host your own react app

\* The Standalone App hosted on Pogly.gg does not guarantee any uptime. The web application will always be running the most up-to-date release. If your module is not compatible with the most recent release, you will be unable to utilize the hosted Standalone App.

#### Self-hosting setup:

In the Pogly project directory, download the required packages via node package manager, which installed with Node.
```bash
npm install
```
 
 Once sucecssfully installed, you can run the app in development mode by running:
 
 ```bash
 npm start
 ```

Alternatively, you can build the app for production by running:
```bash
npm run build
```
To run your built production version, you will need to utilize a web server, like [nginx](http://nginx.org/).

You have completed the frontend setup. In your browser, navigate to: http://localhost:3006, or if you used a web-server, replace 3006 with whatever port you've configured it with.

### SpacetimeDB Module

There are two options for hosting your SpacetimeDB module:
1. SpacetimeDB's testnet, a free testing environment*
2. Self-host your module

\* If you choose to utilizes SpacetimeDB's testnet, you agree to their terms. You will have limited module "energy", which may require you to republish your module when it depletes. Additionally, testnet does experience periodic data wipes, so your data is not guaranteed. Please make use of Pogly Standalone's backup and import feature, if this is a concern for you.

#### Testnet setup:

Navigate to the `server` folder in the Pogly project directory. 

Configure your `spacetime` CLI to use Testnet:
```bash
spacetime server add --default "https://testnet.spacetimedb.com" testnet
```

Publish your Pogly Standalone module to the Testnet:
```bash
spacetime publish -c -s testnet MY_POGLY_STANDALONE_MODULE
```
Make sure to replace `MY_POGLY_STANDALONE_MODULE` with whatever you plan on calling your module.

Your module is published, and you are done with SpacetimeDB setup.

#### Self-hosting setup:

Navigate to the `server` folder in the Pogly project directory.

Start your local server instance of SpacetimeDB:
```bash
spacetime start
```

Leave that window running. ***In another command-line window***, make sure localhost is added to your `spacetime` CLI:
```bash
spacetime server add --default "http://localhost:3000" localhost
```

Publish your Pogly Standalone module to your local server:
```bash
spacetime publish -c -s localhost MY_POGLY_STANDALONE_MODULE
```
Make sure to replace `MY_POGLY_STANDALONE_MODULE` with whatever you plan on calling your module.

Your module is published, and you are done with SpacetimeDB setup.