FROM ruby:3.2

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update -qq && apt-get install -y nodejs && \
    node --version

RUN apt update


COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci


# Install Yarn (not used, but fix)
RUN npm install -g yarn


# Install PostgreSQL client
RUN apt-get install -y postgresql-client

WORKDIR /app


COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN bundle install

COPY . /app

EXPOSE 3000

