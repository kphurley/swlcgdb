# swlcgdb.com

## Introduction
This is a deck building app for Star Wars: The Card Game.  This project is inspired by (but not a fork of) the Alciende-created deck building sites (netrunnerdb.com, arkhamdb.com, ringsdb.com, etc).  This was lacking for the Star Wars game so I wanted to make one to help people get into this great game.

### Prerequisites

1. For local deployment
    - Ruby 3.2.2
    - Rails 7
    - Postgres 16
    - Node.js 20
2. For container deployment
    - Docker
    - Docker Compose

### For Development
1. Clone the repository: `git clone https://github.com/kphurley/swlcgdb.git swlcgdb`
2. Change directory: `cd swlcgdb`
3. Start postgres configure config/database.yml if required. To start a docker instance of postgres run: `./postgres_docker.sh`
4. Install esbuild: `npx install esbuild`
5. Update the db schemes: `bin/rails db:migrate`
6. Seed the db with playing cards from OCTGN: `bin/rails db:seed`
7. Start the development server: `bin/dev`
8. Visit `localhost:3000` in your browser

### For Production
To use swlcgdb in production use the `docker-compose.yml`. 
Make sure to change the `.env` variables to secure your application.

- To start the server:
`docker compose up`
- To stop the server:
`docker compose down`


### Other info
- Feel free to submit issues if you're interested in some functionality this is missing.
- For now, I'm only including support for the official FFG cards released, but the xml source I am using to build the DB (the OCTGN data) has a lot of the custom cards released after the FFG period ended - if folks find this useful and find that certain custom sets are needed, please submit an issue.

If you find this useful and appreciate my efforts, I'd happily accept a tip on paypal - kphurley1477@live.com
