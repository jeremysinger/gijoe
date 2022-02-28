# Dockerfile for
# Glasgow Interactive JavaScript Online Editor (GIJOE)
# Jeremy.Singer@glasgow.ac.uk

# use a cut-down base package that
# Coursera supports
FROM node:17-buster-slim

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl

# setup config and files
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# start webserver
EXPOSE 8080
CMD [ "node", "lightserver.js" ]

