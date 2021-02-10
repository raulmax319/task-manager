<h1 align="center">Welcome to Task management app backend ⚙️</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: UNLICENSED" src="https://img.shields.io/badge/License-UNLICENSED-yellow.svg" />
  </a>
</p>

## Install

```sh
##Clone
$ git clone https://github.com/raulmax319/task-manager-be.git

## Install dependencies
npm install

## Usage

npm run start

## Run tests

npm run test
```

***
# Overview
## User
### User - Read data of a User

<tspan
  style="
    background-color: green;
    border-radius: 4px;
    color: white">
  <strong>
    GET
  </strong>
</tspan>
```diff
/user/:id
```

Permission: admin

```
curl -i http://localhost/user/1
```
#### Parameter

| Field | Type | Description |
| ----- | :--: | ----------: |
|  id  | String | The Users ID |

#### Success 200
| Field | Type | Description |
| ----- | :--: | ----------- |
|  id  | String | The Users ID |
| registered | Date | Registration Date |
| username | String | username of the User |

#### Error 4xx
| Field | Description |
| ----- | ----------- |
| NoAccessRight | Only authenticated Admins can access the data. |
| UserNotFound | The id of the User was not found |

### User - Create a new User
<tspan
  style="
    background-color: #4070EC;
    border-radius: 4px;
    color: white">
  <strong>
    POST
  </strong>
</tspan>
```
/user
```
Permision: none

#### Parameter
| Field | Type | Description |
| ----- | :--: | ----------- |
| username | String | Username of the User. |
| password | String | Password of the User. |

#### Success 201
| Field | Type | Description |
| ----- | :--: | ----------- |
| username | String | Username of the User |
| date | String | Creation Date of the User |

#### Error 4xx
| Field | Description |
| ----- | ----------- |
| NoAccessRight | Only authenticated Admins can access the data. |
| UserNameTooShort | Minimum of 4 characters required. |
| PasswordTooWeak | Password must have at least a symbol and a Upper and lowercase letter |
| PasswordTooShort | Minimum of 8 characters required |
| PasswordTooLong | Maximum of 20 characters |

# Tasks
## Task
### Task - Get User's tasks

```
/tasks/
```
Permission: admin

#### Success 200
| Field | Type | Description |
| ----- | :--: | ----------- |
| task  | Task[ ] | Array of tasks of the authenticated User. |

### Query string parameters

```
/tasks/?search=clean+house&status=open
```
#### Success 200

| Query string param | Required / Optional | Return Type | Description |
| ------------------ | :-----------------: | ----------- | ----------- |
|       search       |       Optional      |    Task     | The search term of the task to search for |
|       status       |       Optional      |    Task[ ]  | The status of the tasks you want to filter |

#### Error 4xx
| Field | Description |
| ----- | ----------- |
| NoAccessRight | Only authenticated Admins can access the data. |

***

## Show your support

Give a ⭐️ if you liked this project!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_