# Deadline horror API

A REST API for Deadline horror.

## Docker

An option to containerize the api standalone is provided. You can use the instructions below to create and run it as a docker image.

> The entire Deadline horror stack is containerized (and a built image is provided) as a whole as well:
>
> - [docker hub](https://hub.docker.com/repository/docker/hendrychjan/deadlinehorror)
> - [github](https://github.com/hendrychjan/deadlinehorror-docker)

### Build

To build an image, use the command below:

```
docker build --build-arg <ARG NAME>=<arg value> -t <image name> .
```

#### Build arguments

You can specify any of the build arguments below, the rest will use their repsective default values. Build arguments are used during the process of building an image. They do not affect the actual image during runtime.

| Argument | Default value | Meaning |     |
| -------- | ------------- | ------- | --- |
| `API_MORGAN_FORMAT` | _tiny_ | The log format for [morgan](https://www.npmjs.com/package/morgan) | _optional_ |
| `API_SALT_ROUNDS` | _10_ | The number of salt rounds to use for password hashing | _optional_ |
| `API_PORT` | _3000_ | A port at which the app will listen on (internally, inside the container) | _optional_ |
| `API_MONGO_URL` | - | A connection string to a mongodb instance | **required** |
| `API_JWT_SECRET` | - | A string secret used for jwt token signing | **required** |

#### Environment variables
| Variable | Meaning |
| -------- | ------- |
| `MONGO_URL` | A URL to a mongodb instance |

### Run

To run a built image, use the command below:

```
docker run -d <image name>
```

> The `-d` argument runs the image in detached mode (in the background). It is not required to use it, but probably what one would want.
