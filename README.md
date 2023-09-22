# Gated Frotnend


## Setup

```
cp .env.development .env.local
yarn install
```

## Dev
Start all apps on unique ports
```
yarn dev
```
Run nginx proxy to access all apps from a single origin. This is important for auth to work correctly.
```bash
cd ./nginx
docker compose up
```
Then access the apps from http://localhost:8080 

