# QA BDD interview demo

A small standalone TypeScript T-shirt shop and browser-test example for discussing QA engineering, BDD, Cucumber, and Playwright. Its shopping flow is inspired by the [PetShop example](https://github.com/thenifemi/PetShop), but this is a small local web app—not a port of that Flutter/Firebase Android project. It stays deterministic with no credentials or external services.

## Run locally

Requirements: Node.js 20 or newer and npm.

```sh
npm ci
npm run install:browser
npm test
```

`npm test` starts the local app, waits for it to respond, runs the Cucumber scenarios in headless Chromium, then stops the app. To run the app by itself, use `npm start` and open <http://127.0.0.1:4173/>. To run Cucumber against an already-running app, set `BASE_URL` and run `npm run test:features`.

## Run with Docker

The Docker image uses Microsoft's Playwright image pinned to `v1.56.1-noble`; the installed `playwright` package is pinned to the same version so its browser binaries match.

See Microsoft's [Playwright Docker guide](https://playwright.dev/docs/docker) for the standard image and container options.

```sh
docker build -t qa-bdd-interview .
docker run --rm qa-bdd-interview
```

The container compiles the TypeScript, starts the app, and runs the BDD scenarios. To make the app available from the host as well, override the command and publish its port:

```sh
docker run --rm -p 4173:4173 qa-bdd-interview npm start
```

## Project map

- `app/` — the tiny shop app and its static TypeScript server
- `features/shop.feature` — readable scenarios for selecting sizes, cart totals, and checkout
- `features/step-definitions/` — TypeScript Cucumber steps using Playwright locators
- `features/support/world.ts` — one isolated browser context per scenario
- `tsconfig.json` — TypeScript build configuration; compiled output goes to ignored `dist/`
- `Dockerfile` — reproducible browser test runtime

Interview materials are kept separately in the sibling folder `../qa-engineer-interview/`; they are not part of this project.
