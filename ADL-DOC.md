# Simple NodeJS HTTP Server version 0.1.0
A simple NodeJS Express application for standing up an HTTP server.  The goal of this project is to easily run a local server for developing static content, while allowing for integration with NPM libraries for security and convenience.
 
## Hardware requirements
### Computational Resource Requirements
CPU Cores: 1
CPU Clock Speed: 1.3 GHz
RAM requirements: 2 GiB
### Minimal Physical Storage
Drive Space: 2GB (Plus storage for hosted files)
*HHD or SSD agnostic*
 
## Operating System Requirements
### Drivers and other software
Required Kernel Divers (including version)
Libraries (including version)
### System Setup
Required Operating System: Ubuntu 16.04.6 LTS
Required user permissions: One user with root access
Required credentials: N\A
### Additional Requirements
Third party libraries
- [axios](https://www.npmjs.com/package/axios) v0.18.0
- [cors](https://www.npmjs.com/package/cors) v2.8.5
- [ejs](https://www.npmjs.com/package/ejs) v2.6.1
- [express](https://www.npmjs.com/package/express) v4.16.4
 
Third Party applications:
- Git v2.7.4
- Curl v7.47.0-1ubuntu2.12
- Node.js v4.2.6~dfsg-1ubuntu4.2
- Node Package Manager (NPM) v3.5.2
- Docker v1.5.1 OR Docker-Compose v1.8.0-2~16.04.1r
 
URL and download instructions for above libraries and applications:
All libraries and third party software can be installed by running the install-reqs shell file
 
- `sudo apt update`
- `sudo apt upgrade`
- `sudo sh ./install-reqs.sh`
 
If running locally, you will need to **[install NodeJS](https://nodejs.org/en/download/)**.
 
Licensing information for above libraries and applications
- Node.js: Licenses/NodeJsLicense
- Docker: Licenses/Apache2License
- Docker-Compose: Licenses/Apache2License
- axios: Licenses/MITLicense
- cors: Licenses/MITLicense
- ejs: Licenses/Apache2License
- express: Licenses/MITLicense
 
## Application Documentation
### Deployment Description
Default network topology
Default IP addresses
Default Port usage: Port
Assignment of servers and each HW
### Deployment Instructions
Each of the below will begin with opening your favorite shell.  **The instructions for Docker have not been tested on Windows.**
#### Node
If you are looking to start this on Windows, then this is the preferred method. **These instructions will not work on ubuntu 16.04**
- `git clone https://github.com/vbhayden/simple-node-http`
- `cd simple-node-http`
- `node app.js`
#### Docker
If you enjoy typing out long Docker commands, then this is the method for you.
- `git clone https://github.com/vbhayden/simple-node-http`
- `cd simple-node-http`
- `sudo ./install-reqs.sh`
- `sudo docker build -t simple-http-image .`
- `sudo docker run -d -it -p 80:80 -e PORT=80 --name=simple-http simple-http-image`
 
#### Docker-Compose
If you enjoy Docker but are also civilized, this is the preferred method for you.
- `git clone https://github.com/vbhayden/simple-node-http`
- `cd simple-node-http`
- `sudo ./install-reqs.sh`
- `sudo docker-compose up -d --build`
 
### Installation Testing Instructions


Troubleshooting tips
