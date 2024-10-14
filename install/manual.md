# Manual Installation
## About
This guide is for manual install of the different Pogly components. You do not need to install both, refer to [this table](/index.md#installation) for guidance.

## Backend
1. Install the [SpacetimeDB CLI](https://spacetimedb.com/install)
    1. Note: The binaries are available [here](https://github.com/clockworklabs/SpacetimeDB/releases/latest) if you don't want to install it
2. Download
   the [SpacetimeDB Pogly module](https://github.com/PoglyApp/pogly-standalone/releases/latest/download/spacetimedb-module.zip)
3. Open up a terminal window and start the SpacetimeDB server:

```bash
spacetime start
```

4. Open up a **SECOND** terminal window and publish the .wasm pogly module you downloaded (and extracted from the .zip) to your server:

```bash
spacetime server add --default http://localhost:3000 local
spacetime publish -w pogly.wasm pogly
```

## Frontend (Optional)
You can either utilize [Pogly's provided webpage](https://standalone.pogly.gg/) in which case you can ignore everything else in this section, or you can self-host the frontend yourself as shown below.

This section assumes that you have an understanding of the command line and web servers. The recommended web server is [Caddy](https://caddyserver.com/), and all the examples will use Caddy configuration.

1. Download and extract the [Pogly web files](https://github.com/PoglyApp/pogly-standalone/releases/latest/download/pogly-web.tar.gz)
2. Place them in your desired web server directory (example is `/usr/share/caddy`)
3. Configure your web server, an example is shown below. The live configuration with reverse proxying of the backend can be found [here](https://github.com/Noxal/pogly-standalone/blob/main/docker/Caddyfile) for further reference.

```caddyfile
https://pogly.example.com {
      root * /usr/share/caddy
      # try_files redirects all requests to index.html so that the React router can handle routing.
      # See https://caddyserver.com/docs/caddyfile/directives/try_files
      try_files {path} /index.html
      file_server
}
```

4. Visit your web page and enter your backend url in the custom url section as shown [here](/install/docker.md#usage)
