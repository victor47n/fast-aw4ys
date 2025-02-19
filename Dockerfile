FROM node:22.8.0-slim

USER root

WORKDIR /home/node/app

# Instalar OpenSSL e a versão compatível do libssl
RUN apt-get update && apt-get install -y \
    openssl \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

USER node

CMD [ "tail", "-f", "/dev/null" ]