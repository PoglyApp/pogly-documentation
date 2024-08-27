# Testnet
## About
This installation method utilizes SpacetimeDB's Testnet along with Pogly's Website to give the easiest installation possible.

There are two ways to use Pogly with this method: Utilizing the Discord bot or publishing the module yourself. Both methods are detailed below.

### WARNING
SpacetimeDB's testnet, while free, has two major constraints:
- Limited Energy
  - This will require you to periodically republish your module with a new identity
- Periodic Data Wipes
  - SpacetimeDB doesn't guarantee any uptime with their Testnet, and they may wipe data without notice at any time, requiring you to republish your module

See [SpacetimeDB's Testnet page](https://spacetimedb.com/docs/deploying/testnet) for more info .

## Discord Installation
1. Run the /publish command in discord
2. Visit https://standalone.pogly.gg/
3. Proceed with [first time setup](/use/firstTimeSetup.md).

## Manual Installation
This guide assumes you are running Windows 10+. If you are using other operating systems you may need to adjust the commands and paths listed.
1. Install the [SpacetimeDB CLI](https://spacetimedb.com/install)
   1. Note: The binaries are available [here](https://github.com/clockworklabs/SpacetimeDB/releases/latest) if you don't want to install it
2. Download the [SpacetimeDB Pogly module](https://github.com/PoglyApp/pogly-standalone/releases/latest/download/pogly-spacetimedb-module.wasm)
3. Open up a terminal/cmd window and run the following:
  ```bash
spacetime identity new -d
spacetime publish -w %userprofile%\Downloads\pogly-spacetimedb-module.wasm pogly
```
4. Visit https://standalone.pogly.gg/ and use module name pogly
5. Proceed with [first time setup](/use/firstTimeSetup.md).

You will need to complete step 3 every time your identity runs out of energy. You can check how much energy you have with the command `spacetime energy status`.