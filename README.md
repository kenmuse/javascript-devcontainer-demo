# Dev Containers Demo!

This repository provides a sample application with multiple development container configurations. The configurations have been tested to work with Visual Studio Code and Codespaces. The images support ARM64 (including macOS M1) and AMD64 (Intel x86/x64).

## Branches

There are multiple branches in this repository. Each represents a different container configuration.

- `main`. Default branch. Contains a simple JavaScript application with no container configuration. This provides a baseline for development and allows Codespaces to be used with the default Codespaces universal container. 
- `bare`. Same content as `main` for ease of comparison.
- `dockerfile`. Uses the default Dockerfile configuration created by older versions of VS Code.
- `alpine`. A minimal container using Alpine. Alpine does not support users, so it runs as `root`.
- `compose`. Development container using Docker Compose for the development environment and a Redis stack server.
- `compose-enhanced`. Variant of `compose` with additional mount configuration.

## Application

The application is a basic TypeScript web application running on Node.js (18.x). The TypeScript is transpiled into JavaScript which is placed in the `dist` folder. The application has two endpoints:

- `/`. Displays an incrementing counter.
- `/reset`. Resets the counter to zero.

By default, the application uses an in-memory counter. The application state is lost when the application is restarted. If Redis is available (such as when Docker Compose is used), it will be used to store the counter state. In this case, the count is preserved between restarts.

A configuration file is provided which configures code debugging in Visual Studio Code, allowing you to step into the application and set breakpoints.

## Compatibility

The images used (`18-bullseye` and `alpine`) support both Intel and ARM64 devices. This enables the containers to use the native processor in both local and cloud environments.
