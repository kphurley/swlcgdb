FROM ruby:3.2.2


RUN apt-get update  && \
    apt-get install -y ca-certificates curl gnupg  &&\
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    NODE_MAJOR=20  && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update  &&\
    apt-get -y install --no-install-recommends nodejs






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

