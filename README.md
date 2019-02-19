# Cream-opoly

## Goal
Help Ice Cream entrepreneurs make informed decisions about what market they should open their next shop in. 


## How to use:
This app is entirely backend. Use a tool like Postman to make use of our data aggregations.

### Step 1: Get a JSON Webtoken by signing up.

-Make a request using a POST method to:

  https://team-guitar.herokuapp.com/auth/signup


-Provide an email and password in the body, should look like:

    {
      "email": "tylerIsCool@gmail.com",
      "password": "superSecretPassword13"
    }

-The response body will give you your token back. Copy your token into your authorization field to make use of the rest of our aggregations. Response body should look like:

    {
    "user": {
        "_id": "5c6c3a2a0b10017fdsafdd",
        "email": "tylerIsCool@gmail.com"
    },
    "token":               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjVjNmMzZTBiYTJhMGIxMDAxN2FjMmQyZCIsImVtYWlsIjoidHlsZXIxMkB0ZXN0LmNvbSJ9LCJpYXQiOjE1NTA1OTc2NDQsImV4cCI6MTU1MDYwMTI0NH0.Cbh5JFKP-UeboUbDYtep-2Pl4OUkLN2Uvwl2RqQwc4U"
   }

### Step 2: Try out some aggregations.

#### Show revenue per ice cream store:

https://team-guitar.herokuapp.com/purchase/stats/revPerStore

#### Show the top 5 most popular ice cream flavors

https://team-guitar.herokuapp.com/purchase/stats/top5flavors

#### Show the top spending customers

http://localhost:27017/purchase/stats/topSpendingCustomers


### Features
1. Multiple data aggregations
1. Custom built seed data
1. User authentication


#### Notes
This project is hosted on Heroku here:

  https://team-guitar.herokuapp.com/
  
