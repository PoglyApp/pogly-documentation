# Building and Publishing Our SpacetimeDB Module

There are two options for hosting your SpacetimeDB module:
1. SpacetimeDB's testnet*
2. Self-host your module

\* SpacetimeDB's testnet, while free, has two major constraints:
- Limited Energy
  - This will require you to periodically republish your module with a new identity
- Periodic Data Wipes
  - SpacetimeDB doesn't guarantee any uptime with their Testnet, and they may wipe data without notice at any time, requiring you to republish your module

### Install SpacetimeDB

If you have not yet already, ensure [SpacetimeDB CLI](https://spacetimedb.com/install) is installed: https://spacetimedb.com/install

## Testnet setup
Open up a terminal/powershell window.

If you downloaded the entire Pogly project, navigate to the `server` folder / If you downloaded only the module files, open the root folder.

Configure your `spacetime` CLI to use Testnet:
```bash
spacetime server add --default "https://testnet.spacetimedb.com" testnet
```

Confirm your identity has sufficient energy:
```bash
spacetime energy status
```

If your identity does not have sufficient energy, you can make a new identity, and set it to default with: 
```bash
spacetime identity new -d
```
*(You will have to do this once your identity runs out of energy)*

Once you've confirmed your identity is connected to testnet and has sufficient energy, you can publish:
```bash
spacetime publish -c -s testnet MY_POGLY_STANDALONE_MODULE
```
Make sure to replace `MY_POGLY_STANDALONE_MODULE` with whatever you plan on calling your module.

Your module is now published! If you plan on utilizing the [pogly.gg standalone portal](https://standalone.pogly.gg), you are now done!

Optionally, if you wish to self-host the react project, continue to the [frontend setup instructions](./frontendSetup.md).

## Self-hosting setup

Open up a terminal/powershell window.

Start your local server instance of SpacetimeDB:
```bash
spacetime start
```
Leave that window running!

If you downloaded the entire Pogly project, navigate to the `server` folder / If you downloaded only the module files, open the root folder.

***In another command-line window***, make sure localhost is added to your `spacetime` CLI:
```bash
spacetime server add --default "http://localhost:3000" localhost
```

Publish your Pogly Standalone module to your local server:
```bash
spacetime publish -c -s localhost MY_POGLY_STANDALONE_MODULE
```
Make sure to replace `MY_POGLY_STANDALONE_MODULE` with whatever you plan on calling your module.

Your module is now published! If you plan on utilizing the [pogly.gg standalone portal](https://standalone.pogly.gg), you are now done!

Optionally, if you wish to self-host the react project, continue to the [frontend setup instructions](./frontendSetup.md).