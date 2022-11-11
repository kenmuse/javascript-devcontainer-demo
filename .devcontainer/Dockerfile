FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:18-bullseye

# Install netcat
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends netcat redis-tools

RUN su node -c "npm i --location=global npm@latest"
