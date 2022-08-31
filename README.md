# Numina Take Home
This is a take home assignment from [Numina](https://numina.co/why/) that queries for track data and organizes it based on track ids and class types.

## Getting Started
1. Install [NodeJS](https://nodejs.org/en/download/)
2. Run `npm i --save` to install all package dependencies

### Running Application
- **Run Locally**: Run `npm start`
- **Run With Docker**: 
```
1. Make sure [Docker Desktop](https://www.docker.com/) is downloaded
2. Run docker desktop
3. Build docker image with `docker build -t numina-track-api .`
4. Run in docker container with `docker run -it -p ${local_port}:${docker_port} numina-track-api`
```

## API Endpoints

| Endpoint | Method | Response | Description |
| ----------- | ----------- | --------- | -------- |
| /csvData | GET | {trackid,date,time,class,box,bottom_center,geo_bottom_center}[] | returns all sample data from `data.csv` in a list of json objects |
| /volumes-by-hour/:type  | GET | { [hour]: trackids[] } | return a cumulative sum (volume) of unique `trackids` over 1-hour intervals for a requested `class` (pedestrian, bicycle, etc) |
| /track-points/:trackid | GET | { box, bottom_center, geo_bottom_center }[] | return track points for a given `trackid` |

### Sample cURL Requests
```
curl http://localhost:3000/volumes-by-hour/pedestrian
curl http://localhost:3000/track-points/e71e1c7e573346368b2c2989e8eee61a
```


