# Simple NodeJS HTTP Server

A simple NodeJS Express application for standing up an HTTP server.  The goal of this project is to easily run a local server for developing static content, while allowing for integration with NPM libraries for security and convenience.

## Setup
There are a few different ways to run the server.  If running locally, you will need to **[install NodeJS](https://nodejs.org/en/download/)**.  

Each of the below will begin with opening your favorite shell.  **The instructions for Docker have not been tested on Windows.**

### w/ Node
If you are looking to start this on Windows, then this is the preferred method.  
- `git clone https://github.com/vbhayden/simple-node-http`
- `cd simple-node-http`
- `node app.js`

### w/ plain Docker
If you enjoy typing out long Docker commands, then this is the method for you.
- `git clone https://github.com/vbhayden/simple-node-http`
- `cd simple-node-http`
- `sudo ./install-reqs.sh`
- `sudo docker build -t simple-http-image .`
- `sudo docker run -d -it -p 80:80 -e PORT=80 --name=simple-http simple-http-image`

### w/ Docker-Compose
If you enjoy Docker but are also civilized, this is the preferred method for you.
- `git clone https://github.com/vbhayden/simple-node-http`
- `cd simple-node-http`
- `sudo ./install-reqs.sh`
- `sudo docker-compose up -d --build`
