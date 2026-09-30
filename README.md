# Setup Project

Create .env file

```
DATABASE_URL="mysql://root:******@localhost:3306/users_restfull_api_typescript_for_learning"
DATABASE_USER="root"
DATABASE_PASSWORD=******
DATABASE_NAME="users_restfull_api_typescript_for_learning"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```
