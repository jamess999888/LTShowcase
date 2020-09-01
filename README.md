Technical Showcase For LeanTechniques
============
This is a simple project but it is listed as a technical showcase! I have taken a risk here today because I believe that technial showcase means we need to showcase something different and cool instead of making a python script that can probably achieve this in about 15 lines.
---

## Features
- Node.js express microservice
- one step docker deployment
- bare bones python script to interact with above service :D
---

## Setup
Install Docker from [here](https://docs.docker.com/get-docker/)  
Install Python from [here](https://www.python.org/downloads/)  

---

## Usage
### Primary use case  

- pull this repository
- download and run my docker container:  
  - docker run -p 49160:8080 -d jamess999/leantech  
- run photo-album.py python script
  - python photo-album.py \<album number>  
  
  
### Local Build and Test
- pull this repository and cd to the directory root within a terminal
- npm install
- npm run test

### Local Build and run
- pull this repository and cd to the directory root within a terminal
- npm install
- node src/photoAlbum.js
- modify port in photo-album.py to 8080 on line 6
- python photo-album.py
