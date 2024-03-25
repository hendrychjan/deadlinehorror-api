# syntax=docker/dockerfile:1

################################################################################
# Use node image for base image for all stages.
ARG NODE_VERSION=20.10.0

# Set working directory for all build stages.
FROM node:${NODE_VERSION}-alpine

# Load build arguments
ARG API_PORT=3000
ARG API_MORGAN_FORMAT="tiny"
ARG API_SALT_ROUNDS=10

# Set the environment
ENV NODE_ENV production
ENV PORT $APP_PORT
ENV MORGAN_FORMAT $API_MORGAN_FORMAT
ENV SALT_ROUNDS $API_SALT_ROUNDS

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE $API_PORT

# Run the application.
CMD npm start
