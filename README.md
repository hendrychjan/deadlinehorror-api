# Deadline horror API
A REST API for Deadline horror.

## Installation

> Following is a guide explaining how to deploy the Deadline horror REST API as a standalone app. However, you can deploy the whole stack as well with docker compose:
> - [Code and compose script on GitHub](https://github.com/hendrychjan/deadlinehorror-web)

You can choose to deploy a container from a built image, or deploy the API together with mongodb as a stack with docker compose.

Either way, following is a table describing environment variables:

| Variable | Default/example value |Meaning |     |
| -------- | --------------------- | ------- | --- |
| `MONGO_URL` | mongodb://localhost | A connection string to a mongodb instance | **required** |
| `JWT_SECRET` | 1nu3hw5di36hajp | A string secret used for jwt token signing | **required** |
| `SALT_ROUNDS` | 10 | Number of salt rounds to be used for pasword hashing | _optional_ |
| `MORGAN_FORMAT` | tiny | Format to use for morgan logging | _optional_ |

> It is recommended that the `JWT_SECRET` is 32 characters long. You can generate one with openssl: `openssl rand -base64 32`

### Image deploy
There is a prebuilt image on docker hub. This is the best option if you want to get just the core API. 

- [Deadline horror API image on Docker Hub]()

> Note that the default environment variables are already baked into the image, but you still need to set the required ones before deployment.

### Stack deploy
This repository contains a `docker-compose.yaml`, which defines deployment for the API and a mongodb instance in one stack. This is probably the best option if you want to do a quick-start.
