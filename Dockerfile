#############
### build ###
#############

# base image
FROM mhart/alpine-node:14.16.1 AS setup

# set working directory
WORKDIR /app

COPY . /app
RUN npm set progress=false
RUN npm ci

CMD ["npm", "run", "dev:csr"]

#############
### build ###
#############
FROM setup AS builder

ARG target
ENV target=${target}
# set working directory
WORKDIR /app
RUN npm run "build:ssr-${target}"

FROM mhart/alpine-node:14.16.1 as main

WORKDIR /app
RUN npm i --save-exact express@4.17.1 cookie-parser@1.4.5 compression@1.7.4

COPY --from=builder /app/package.json /app
COPY --from=builder /app/dist /app/dist

EXPOSE 80
ENV PORT 80
ENV NODE_ENV production
CMD ["npm", "run", "serve:ssr"]
