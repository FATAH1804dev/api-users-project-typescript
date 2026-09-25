# ADDRESS API SPEC

## Create Address

EndPoint: POST /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Request Body :

```json
{
  "street": "string",
  "city": "string",
  "province": "string",
  "country": "string",
  "postal_code": "string"
}
```

Response Body (success):

```json
{
  "data": {
    "id": "number",
    "street": "string",
    "city": "string",
    "province": "string",
    "country": "string",
    "postal_code": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "postal_code is required, ..."
}
```

## Get Address

EndPoint: GET /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
  "data": {
    "id": "number",
    "street": "string",
    "city": "string",
    "province": "string",
    "country": "string",
    "postal_code": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "address not found"
}
```

## Update Address

EndPoint: PUT /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Request Body :

```json
{
  "street": "string",
  "city": "string",
  "province": "string",
  "country": "string",
  "postal_code": "string"
}
```

Response Body (success):

```json
{
  "data": {
    "id": "number",
    "street": "string",
    "city": "string",
    "province": "string",
    "country": "string",
    "postal_code": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "postal_code is required"
}
```

## Remove Address

EndPoint: DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
  "data": "ok"
}
```

Response Body (failed):

```json
{
  "errors": "address not found"
}
```

## List Address

EndPoint: GET /api/contacts/:idContact/addresses

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
  "data": [
    {
      "id": "number",
      "street": "string",
      "city": "string",
      "province": "string",
      "country": "string",
      "postal_code": "string"
    },
    {
      "id": "number",
      "street": "string",
      "city": "string",
      "province": "string",
      "country": "string",
      "postal_code": "string"
    }
  ]
}
```

Response Body (failed):

```json
{
  "errors": "address not found"
}
```
