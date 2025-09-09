## Developing

Install dependencies with `bun install` (or `npm install` or `yarn`), start a development server:

```bash
bun run client:dev

# or start the server and open the app in a new browser tab
bun run client:dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `bun run client:build` will generate a Node app that you can run with `bun client:start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## Deploying via Docker

If you have docker installed you can run `docker compose up --build` once to build the image and install all of the dependencies.
And then run `docker compose up` to start the webapp.
