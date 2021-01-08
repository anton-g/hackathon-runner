# HACKATHON RUNNER

HACKATHON RUNNER is a small platform game built with the game engine
Phaser. Besides the game istelf it has toplists and **real time "ghosts" of other players**. It was built with [Phaser3](https://phaser.io/phaser3), [React](https://reactjs.org), [NestJS](https://nestjs.com) and [Redis](https://redislabs.com) for [DigitalOceans App Platform Hackathon on DEV](https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k). . If you want to try it out yourself you can deploy your own version:

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/anton-g/hackathon-runner/tree/main)

You can read a bit more from the development [here](https://dev.to/awnton/do-hackathon-runner-devlog-1-28pd).

## Running for development

### Prerequisites

HACKATHON RUNNER have two external dependencies, Postgres and Redis.

Postgres is the database used to store the results for the top lists. To set it up locally you can use any of the methods described [here](https://www.postgresql.org/download/).

Redis is used to distribute the messages sent by the server if it's run across multiple nodes (ie to make sure all players are visible to everyone else). Follow [this guide](https://redis.io/topics/quickstart) to set it up on your machine.

> This is in practice a rather unneccesary performance improvement unless the game is used by lots and lots of people, so you can disable redis by replacing `RedisIoAdapter` with `IoAdapter` in [`main.ts`](https://github.com/anton-g/hackathon-runner/blob/main/server/src/main.ts#L10).

### Server

To run the server:

1. Create a `.env` file in `/server` and set the environment variables to the correct values:

```text
DB_HOST=localhost
DB_PORT=5432
DB_USER=db_user
DB_PASSWORD=
DB_NAME=testdb
REDIS_HOST=localhost
REDIS_PORT=6379
```

2. Run `npm install` in `/server`
3. Run `npm start` in `/server`

The server should now be served at `localhost:3001`.

### Client

1. Run `npm install` in `/client`
1. Run `npm start` in `/client`

The client should now be served at `localhost:3000`.

## License

Copyright 2021 Anton Gunnarsson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
