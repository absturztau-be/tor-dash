# tor-dash

tor-dash is a small little statistics website for your tor node. It uses the control port of your tor node to gather current stats of your node.

![Screenshot of the dashboard](/docs/screenshot.png)

## installation

make sure you have composer and yarn installed.

### building the code

- clone this repository
- run `yarn`
- run `yarn build`
- copy all contents of `/dist` to the docroot of your webserver

### configuration

- copy the `config/example.tor-dash.conf` to `/etc/tor/tor-dash.conf` and change it according to your config of the tor control port.
- if you are using nginx, you can use `config/example.tor.nginx` as a template for your config (i don't have an apache sooooo couldn't add one there)

## development

copy `config/example.proxy.json` to `proxy.json` and change `target` to where your api is running on.

run `yarn dev` to start the web dev server on `localhost:8080`

## contact

you can find me on fedi: [@puniko@mk.absturztau.be](https://mk.absturztau.be/@puniko)