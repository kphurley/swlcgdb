# swlcgdb.com

## Introduction
This is a deck building app for Star Wars: The Card Game.  This project is inspired by (but not a fork of) the Alciende-created deck building sites (netrunnerdb.com, arkhamdb.com, ringsdb.com, etc).  This was lacking for the Star Wars game so I wanted to make one to help people get into this great game.

## Hacking on this Project
### You need
- Ruby 3.0
- Rails 7
- Postgres 14

### Getting it running
- clone
- configure your `database.yml` as needed
- `bin/rails db:migrate` to set the db up
- `bin/rails db:seed` to seed the DB with data from the cardXml directory (taken from OCTGN)
- `bin/dev` to start it all up

### Other info
- Feel free to submit issues if you're interested in some functionality this is missing.
- For now, I'm only including support for the official FFG cards released, but the xml source I am using to build the DB (the OCTGN data) has a lot of the custom cards released after the FFG period ended - if folks find this useful and find that certain custom sets are needed, please submit an issue.

If you find this useful and appreciate my efforts, I'd happily accept a tip on my [patreon](https://www.patreon.com/kphurley).
