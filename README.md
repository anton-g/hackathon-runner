# HACKATHON RUNNER

HACKATHON RUNNER is a small platform game built with the game engine
Phaser. Besides the game istelf it has toplists and **real time "ghosts" of other players**. It was built with [Phaser3](https://phaser.io/phaser3), [React](https://reactjs.org), [NestJS](https://nestjs.com) and [Redis](https://redislabs.com) for [DigitalOceans App Platform Hackathon on DEV](https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k). . If you want to try it out yourself you can deploy your own version:

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/anton-g/hackathon-runner/tree/main)

You can read a bit more from the development [here](https://dev.to/awnton/do-hackathon-runner-devlog-1-28pd).

IMAGE

## Running for development

### Dependencies

HACKATHON RUNNER have one required external dependency, Postgres.

Postgres is the database used to store the results for the top lists. To set it up locally you can use any of the methods described [here](https://www.postgresql.org/download/).

> There is also an optional dependency in Redis, but you can [read more below](<#using-redis-(optional)>) if that is relevant.

### Server

To run the server:

1. Create a `.env` file in `/server` and set the environment variables to the values corresponding to your Postgres database:

```text
DB_HOST=localhost
DB_PORT=5432
DB_USER=db_user
DB_PASSWORD=
DB_NAME=testdb
```

2. Run `npm install` in `/server`
3. Run `npm start` in `/server`

The server should now be served at `localhost:3001`.

### Client

1. Run `npm install` in `/client`
1. Run `npm start` in `/client`

The client should now be served at `localhost:3000`.

### Using Redis (optional)

Redis is used to distribute the messages sent by the server if it's run across multiple nodes (ie to make sure all players are visible to everyone else). This is probably an unneccesary performance optimization if you're just playing around with the game so it's completely optional.

If you do wanna try it out locally you can follow [this guide](https://redis.io/topics/quickstart) to install Redis on your own machine.
Then you need to add two more keys to your `.env` file:

```text
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### Redis with DigitalOcean

If you want to host it on DigitalOcean with Redis the easiest way is to add a new Redis Database Cluster on [DigitalOcean Cloud](https://cloud.digitalocean.com) and name it `hackathon-runner-db-cluster`. Then use the [`doctl`](https://www.digitalocean.com/docs/apis-clis/doctl/) CLI to create (or update) an app with the [app spec](https://github.com/anton-g/hackathon-runner/blob/main/.do/app.yaml). For example:

**Create a new app**:

```text
> doctl apps create --spec .do/spec.yaml
```

**Update an existing app** (for example created with the "Deploy to DO" button above):

```text
> doctl apps list

ID                 Spec Name         ...
12341234-abcdabcd  hackathon-runner  ...

> doctl apps update 12341234-abcdabcd --spec .do/app.yaml
```

> Remember to change the `repo` fields in the `app.yaml` if you've forked the repo.

## License

Copyright 2021 Anton Gunnarsson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
