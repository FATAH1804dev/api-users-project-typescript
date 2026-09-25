# USER API SPEC

## Register User

EndPoint: POST /api/users

Request Body :

```json
{
  "username": "string",
  "password": "string",
  "name": "string"
}
```

Response Body (success):

```json
{
  "data": {
    "username": "string",
    "name": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "Username or password invalid format"
}
```

## Login User

EndPoint: POST /api/users/login

Request Body :

```json
{
  "username": "string",
  "password": "string"
}
```

Response Body (success):

```json
{
  "data": {
    "username": "string",
    "name": "string",
    "token": "uuid"
  }
}
```

Response Body (failed):

```json
{
  "errors": "Username or password are wrong"
}
```

## Get User

EndPoint: GET /api/users/current

Request Header:

- X-API-TOKEN: token(login)

Response Body (success):

```json
{
  "data": {
    "username": "string",
    "name": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "Unauthorized"
}
```

## Update User

EndPoint: PATCH /api/users/current

Request Header:

- X-API-TOKEN: token

Request Body :

```json
{
  "username": "string",
  "password": "string",
  "name": "string"
  //patch memungkinkan untuk update salah satu data saja
}
```

Response Body (success):

```json
{
  "data": {
    "username": "string",
    "name": "string"
  }
}
```

Response Body (failed):

```json
{
  "errors": "Username or password format are invalid"
}
```

## Log Out User

EndPoint: DELETE /api/users/current

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
  "errors": "Unauthorized"
}
```
