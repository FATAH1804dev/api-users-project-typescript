# CONTACT API SPEC

## Create Contact

EndPoint: POST /api/contacts

Request Header:

- X-API-TOKEN: token

Request Body :

```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "phone": "string"
}
```

Response Body (success):

```json
{
  "data": {
    "id": "number",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "phone": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Get Contact

EndPoint: GET /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
  "data": {
    "id": "number",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "phone": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "contact not found"
}
```

## Update Contact

EndPoint: PUT /api/contacts/:id

Request Header:

- X-API-TOKEN: token

Request Body :

```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "phone": "string"
}
```

Response Body (success):

```json
{
  "data": {
    "id": "number",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "phone": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Remove Contact

EndPoint: DELETE /api/contacts/:id

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
  "errors": "contact not found"
}
```

## Search Contact

EndPoint: GET /api/contacts

Query Parameter :

- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header:

- X-API-TOKEN: token

Response Body (success):

```json
{
  "data": [
    {
      "id": "number",
      "firstname": "string",
      "lastname": "string",
      "email": "string",
      "phone": "string"
    },
    {
      "id": "number",
      "firstname": "string",
      "lastname": "string",
      "email": "string",
      "phone": "string"
    }, ...
  ],
  "paging" : {
    "current_page" : "number",
    "total_page" : "number",
    "size" : "number"
    }
}
```

Response Body (failed):

```json
{
  "errors": "Unauthorized"
}
```
