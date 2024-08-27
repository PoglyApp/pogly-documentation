# Docker
## About
Pogly provides a self-contained Docker image that you can spin up with minimal effort.

## Installation
1. Install [Docker](https://docs.docker.com/engine/install/)
2. Choose one of the below two installation methods. If you don't know which to choose, use the docker run command.
3. See [Usage](#usage)

## Docker Run
Example docker run command:
```bash
docker run -p 80:80 -v pogly-keys:/etc/spacetime -v pogly-data:/stdb ghcr.io/poglyapp/pogly
```

## Docker Compose
Example compose file:
```yaml
services:
  pogly:
    image: ghcr.io/poglyapp/pogly
    restart: always
    ports:
      - 80:80/tcp
    volumes:
      - pogly-keys:/etc/spacetime
      - pogly-data:/stdb
volumes:
  pogly-keys:
  pogly-data:
```

## Usage
Once the container is running you can visit http://localhost in your browser. Select **Custom** and input the following:
- Custom domain: `ws://localhost`
- Module name: `pogly`

Once connected, proceed with [first time setup](/use/firstTimeSetup.md).

## Reverse Proxying
The container can also be reverse proxied without issue. The custom domain for the example below would be `wss://pogly.example.com`.
```caddyfile
https://pogly.example.com {
    reverse_proxy pogly:80
}
```

The custom domain entry will always be whatever address you visit the page with. See the image below for an example of a custom domain.

![img.png](../assets/docker_address.png)


