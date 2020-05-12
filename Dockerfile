# Stege1: Generate the build
FROM node:10.17-alpine as ehr-rpc-server-builder

RUN mkdir -p /opt

# install dependecies
RUN apk update
RUN apk add --no-cache git build-base gcc abuild make bash python

# Install postgres
RUN apk add postgresql postgresql-client

RUN yarn global add linklocal

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV


# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=80
ENV PORT=$PORT
EXPOSE $PORT 9229 9230

# install latest npm, reguardless of node version, for speed and fixes
RUN npm i npm@latest -g

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt

COPY package*.json yarn*.lock ./
RUN yarn install --production=false
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
COPY . /opt

RUN yarn workspaces info --json
RUN yarn install --production=false
RUN yarn bootstrap

RUN yarn install --production=false
ENV PATH /opt/node_modules/.bin:$PATH

# build queue
RUN yarn build  

RUN linklocal -r

# copy dir which is not copied by babel
COPY ./bin /opt/dist/
COPY ./build /opt/dist/

CMD yarn start:prod
