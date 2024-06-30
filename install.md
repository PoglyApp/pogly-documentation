# Installation

Pogly Standalone is split into two parts:
1. The module (Server)
2. The frontend (Client)

For those interested in self-hosting, the react frontend is optional. The [standalone portal](https://standalone.pogly.gg) on our website can be utilized for free instead of self-hosting the frontend react project. That said, if you wish to make changes to the client, you will need to self-host instead of using our portal.

### Prerequisites

**Required**
- The Pogly Standalone project files, downloaded from the [releases](https://github.com/PoglyApp/PoglyStandalone/releases) page in this repository.
  - Just the module files, or the full project depending on if you want to self-host the frontend.
- [SpacetimeDB](https://spacetimedb.com) as Pogly utilizes it for its server and database. The installation instructions can be found on their [website](https://spacetimedb.com/install) or [github](https://github.com/clockworklabs/SpacetimeDB/tree/master#installation). 


**Optional**
- [Node](https://nodejs.org/en/download) (v20.10.0) and [Typescript](https://www.npmjs.com/package/typescript), as Pogly Standalone is written in React/Typescript.
  - Again, only required if you wish to self-host the frontend.

## Getting Started
To get started with installation, you will need to [build and publish your first SpacetimeDB Module](./install/moduleSetup.md).

If you're looking for the optional frontend setup, [you can click here](./install/frontendSetup.md).