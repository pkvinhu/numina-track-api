# Numina Take Home
This is a take home assignment from [Numina](https://numina.co/why/) that queries for track data and organizes it based on track ids and class types.

## Getting Started
1. Install [NodeJS](https://nodejs.org/en/download/)
2. Run `npm i --save` to install all package dependencies

### Running Application
- **Run Locally**: Run `npm start`
- **Run With Docker**: 

Make sure [Docker Desktop](https://www.docker.com/) is downloaded
```
1. Run docker desktop
2. Build docker image with `docker build -t numina-track-api .`
3. Run in docker container with `docker run -it -p ${local_port}:${docker_port} numina-track-api`
```

## API Endpoints

| Endpoint | Method | Response | Description |
| ----------- | ----------- | --------- | -------- |
| /csvData | GET | {trackid,date,time,class,box,bottom_center,geo_bottom_center}[] | returns all sample data from `data.csv` in a list of json objects |
| /volumes-by-hour/:type  | GET | { [hour]: { count, trackids } } | return a cumulative sum (volume) of unique `trackids` over 1-hour intervals for a requested `class` (pedestrian, bicycle, etc) |
| /track-points/:trackid | GET | { box, bottom_center, geo_bottom_center }[] | return track points for a given `trackid` |

### Sample cURL Requests
```
curl http://localhost:3000/volumes-by-hour/pedestrian
curl http://localhost:3000/track-points/e71e1c7e573346368b2c2989e8eee61a
```
For additional API testing, I'd recommend using [Postman](https://www.postman.com/downloads/).

## Additional Information on Sample Data
The data presented in data.csv are individual object detections from May 3, 2020, from a Numina sensor deployed in Brooklyn, New York. Each row corresponds to one detection of an object at a given time. A collection of these detections for a single object is stored in a unique trackid. (.) Detections that are part of the same track have the same trackid value. 

A detection is a rectangular box on a 640x480 image captured by the sensor. Each detection is a point. A track sequence of detections, which we combine like connect-the-dots. 

| Field | Type | Description |
| ----- | ---- | ----------- |
| trackid | uuid | unique identifier for the track this detection is part of (detections with the same trackid represent the path an object took through the scene) | 
| track_date | date | date detection was recorded |
| time | timestamp | timestamp for this detection |
| class | string | type of object (ex. pedestrian, bicycle) |
| box | number[] (representing [x1, y1, x2, y2]) | coordinates representing detection bounding box. Note that in image coordinates, [0,0] is the top left corner of the image |
| bottom_center | number[] (representing [x, y]) | bottom center coordinate of the detected bounding box. This is our best proxy for the on-the-ground position of the object. |
| geo_bottom_center | number[] (rep [lat, lon]) | approximate [lat, lon] position of the bottom_center coordinate |
| bottom_center | number[] (rep [lat, lon]) | |





