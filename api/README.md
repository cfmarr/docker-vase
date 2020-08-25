# RESTfull API width Node.js, Express and MongoDB

## Tutorial referanced

https://www.youtube.com/watch?v=vjf774RKrLc

## API Workflows

In app.js express sets the app on port 3000

`http://localhost:3000/motes`

### Developement workflow

In the mongo directory run `docker-compose up -d` so the app has a db

In app.js `DB_CONNECTION_DEV` will be used for the mongoUrl when in dev

`npm run dev` will run the app with nodemon, will watch any changes

### Production workflow

In the root directory run `docker-compose up -d`

The api, mongo, mongo-express and floyd containers will be deployed

In app.js `DB_CONNECTION` will be used for the mongoUrl when in production

`npm start` will be run by docker-compose in the api container

## Usage

Mote schema is as follows

```json
{
  "moteId": "002",
  "roomId": "001",
  "siteId": "001",
  "statusId": "000"
}
```

All responses will have the form

```json
{
  "message": "Description of what happened",
  "mote(s)": "Mote or Motes affected"
}
```

### Add a mote

**Definition**

`POST /motes`

**Arguments**

- `"moteId":string` a globally unique identifier for this mote
- `"roomId":string` unique identifier for the room location of this mote
- `"siteId":string` unique identifier for the site location of this mote
- `"statusId":string` mote status code

**Response**

- `500 Internal Server Error` on error
- `201 Created` on success

```json
{
  "message": "moteId: 001 (5f456c522423de8d1c23c435) has been added",
  "mote": {
    "createdAt": "2020-08-25T19:51:25.181Z",
    "_id": "5f456c522423de8d1c23c435",
    "moteId": "001",
    "roomId": "001",
    "siteId": "001",
    "statusId": "000",
    "__v": 0
  }
}
```

## Delete a mote

**Definition**

`DELETE /motes/<_id>`

**Response**

- `500 Internal Server Error` \_id is not valid
- `404 Not Found` \_id is not found in the list
- `200 OK` when successfully deleted

```json
{
  "message": "moteId: 001 (5f456c522423de8d1c23c435) has been deleted",
  "mote": {
    "createdAt": "2020-08-25T19:51:25.181Z",
    "_id": "5f456c522423de8d1c23c435",
    "moteId": "001",
    "roomId": "001",
    "siteId": "001",
    "statusId": "000",
    "__v": 0
  }
}
```

## Get a specific mote

**Definition**

`GET /motes/<_id>`

**Response**

- `500 Internal Server Error` \_id is not valid
- `404 Not Found` \_id is not found in the list
- `200 OK` on success

```json
{
  "message": "moteId: 001 (5f456ae520a37b8c6af3262a) has been found",
  "mote": {
    "createdAt": "2020-08-25T19:47:43.958Z",
    "_id": "5f456ae520a37b8c6af3262a",
    "moteId": "001",
    "roomId": "001",
    "siteId": "001",
    "statusId": "008",
    "__v": 0
  }
}
```

## Update a mote status

**Definition**

`PATCH /motes/<_id>`

**Response**

- `500 Internal Server Error` \_id is not valid
- `404 Not Found` \_id is not found in the list
- `200 OK` when successfully deleted

```json
{
  "message": "moteId: 001 (5f456ae520a37b8c6af3262a) status is now 001",
  "mote": {
    "createdAt": "2020-08-25T19:47:43.958Z",
    "_id": "5f456ae520a37b8c6af3262a",
    "moteId": "001",
    "roomId": "001",
    "siteId": "001",
    "statusId": "001",
    "__v": 0
  }
}
```

### Get all motes

**Definition**

`GET /motes`

**Response**

- `500 Internal Server Error` on error
- `200 OK` on success

```json
{
  "message": "There are 3 motes",
  "motes": [
    {
      "createdAt": "2020-08-24T23:39:22.818Z",
      "_id": "5f4453917d4fb7001228f5c5",
      "moteId": "001",
      "roomId": "001",
      "siteId": "001",
      "statusId": "000",
      "__v": 0
    },
    {
      "createdAt": "2020-08-24T23:39:22.818Z",
      "_id": "5f4453967d4fb7001228f5c6",
      "moteId": "002",
      "roomId": "001",
      "siteId": "001",
      "statusId": "000",
      "__v": 0
    },
    {
      "createdAt": "2020-08-25T17:25:17.519Z",
      "_id": "5f45499d4005388487a95d9c",
      "moteId": "003",
      "roomId": "001",
      "siteId": "001",
      "statusId": "001",
      "__v": 0
    }
  ]
}
```
