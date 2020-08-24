# RESTfull API width Node.js, Express and MongoDB

### Tutorial referanced

https://www.youtube.com/watch?v=vjf774RKrLc

## Usage

Mote schema is as follows:

```json
{
  "moteId": "002",
  "roomId": "001",
  "siteId": "001",
  "statusId": "000"
}
```

### Get all motes

`GET /motes`

**Response**

- `500 Internal Server Error` on error
- `200 OK` on success

```json
[
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
  }
]
```
