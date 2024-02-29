FROM ruby:3.2

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get update -qq && apt-get install -y nodejs && \
    node --version

RUN apt update

RUN apt-get install -y npm

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Install Yarn (not used, but fix for the error)
RUN npm install -g yarn

RUN apt-get install -y postgresql-client

WORKDIR /

COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock

RUN bundle install


# Copy the main application
COPY . ./

EXPOSE 3000

