# syntax=docker/dockerfile:1

# --- Stage 1: build the Angular app ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN npx ng build

# --- Stage 2: serve the built app with nginx ---
FROM nginxinc/nginx-unprivileged:alpine AS runtime
COPY --from=build --chown=101:101 /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
USER 101
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO /dev/null http://127.0.0.1:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
