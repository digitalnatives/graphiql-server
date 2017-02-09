FROM node:boron

RUN mkdir -p /usr/src/graphiql-server
WORKDIR /usr/src/graphiql-server

COPY package.json /usr/src/graphiql-server/
RUN npm install --progress=false --quiet

COPY . /usr/src/graphiql-server

EXPOSE 5000
