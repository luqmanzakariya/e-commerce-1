# Gadget Candy
An e-commerce app for Portofolio on Hacktiv8 Bootcamp. Deployed on: http://gadgetcandy.luqmanzakariya.com/

## USAGE

Before using the API, make sure you install these packages on global by running this code:

    npm install -g @vue/cli
    OR
    yarn global add @vue/cli

### Usage Client
You can access the client via http://localhost:8080 (by default).
Make sure you have vue installed in your computer, then go to client folder and run these commands:

    npm run serve

## Usage Server
You can access the client via http://localhost:3000.
Make sure you have Node.js and npm installed in your computer, then go to server folder and run these commands:

    npm install
    npm start
    npm run dev

## List of User routes:
base url : http//localhost:3000/users

example :

    http//localhost:3000/users/register

| Route  | HTTP | Headers(s) | Body | Sucess Response | Error Response  | Description         |
| ------ | ---- | ---------- | - |-| ---- | ----- | ------------------- |
| `/users/register` | POST | `none` | `name (string, required), email (string, required), password (string, required)` | (201) json(_id, name, email, isAdmin, password (encrypted), createdAt, updatedAt, __v) | (500) json(code, message)  | Sign up with new user info |
| `/users/login` | POST | `none` | `email (string, required), password (string, required)` |  (200) json(              token, _id, name, email, isAdmin | (500) json(code, message), (401) json(code, message)  | Sign in and get an access token based on credentials |


## List of Article routes:
base url : http//localhost:3000/products

example :

    http//localhost:3000/products/findAll

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/findAll` | GET | `none` | `none` | (200) [ json(_id, name, description, fileUrl, price, stock, createdAt, updatedAt, __v)] | (500) json(message) | Get all products |
| `/product/:id` | GET | `none` | `none` | (200) json( json(_id, name, description, fileUrl, price, stock, createdAt, updatedAt, __v) )| (500) json(message) | Get one product |
| `/create` | POST | `token` | `name`, `description`, `price`, `stock`, `fileUrl` | (200) json( json(_id, name, description, fileUrl, price, stock, createdAt, updatedAt, __v) )| (500) json(message), (403) json(message: unauthorized) | Create product |
| `/:id` | PATCH | `token` | `name`, `description`, `price`, `stock`, `fileUrl` | (200) json(n,nModified,ok) )| (500) json(message), (403) json(message: unauthorized) | Update product |
| `/:id` | DELETE | `token` | `none` | (200) json(ok,deletedCount,n)| (500) json(message), (403) json(message: unauthorized) | Delete a product |

## List of Tag routes:
base url : http//localhost:3000/carts

example :

    http//localhost:3000/carts

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/myCarts` | GET | `token` | `none` | (200) [ json(_id, status, UserId, product, quantity, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Find all tags based on user id and status:ordered |
| `/orderStatus` | GET | `token` | `none` | (200) [ json(_id, status, UserId, product, quantity, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Find all carts based on user id and status:delivered |
| `/allOrder` | GET | `token` | `none` | (200) [ json(_id, status, UserId, product, quantity, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Find all carts available |
| `/received/:id` | POST | `token` | `none` | (200) json(n,nModified,ok) | (500) json(message), (403) json(message: unauthorized) | Update cart status from `purchased` to `delivered` |
| `/create/:id` | POST | `token` | `none` | (200) json(_id, status, UserId, product, quantity, createdAt, updatedAt, __v) | (500) json(message), (403) json(message: unauthorized) | Add item to cart |
| `/:id` | DELETE | `token` | `none` | (200) json(ok,deletedCount,n) | (500) json(message) | Delete a cart |
| `/checkout` | POST | `token` | `none` | (200) [ json(_id, status, UserId, product, quantity, createdAt, updatedAt, __v)] | (500) json(message), (403) json(message: unauthorized) | Update cart status from `ordered` to `purchased` |