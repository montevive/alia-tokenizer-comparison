# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS build
WORKDIR /src
COPY web/package.json web/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY web/ ./
ENV BASE_PATH=/alia-tokenizer-comparison/
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
LABEL org.opencontainers.image.source="https://github.com/montevive/alia-tokenizer-comparison"
LABEL org.opencontainers.image.description="Montevive Labs — ALIA tokenizer comparison browser demo"
LABEL org.opencontainers.image.licenses="Apache-2.0"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /src/dist/ /usr/share/nginx/html/alia-tokenizer-comparison/

EXPOSE 8080
