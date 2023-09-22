FROM us-central1-docker.pkg.dev/gated-inc-prod/docker/node:16.17.1 AS base

WORKDIR /src

RUN yarn global add turbo@1.5.5

COPY . .
RUN turbo prune --docker --scope=admin


FROM us-central1-docker.pkg.dev/gated-inc-prod/docker/node:16.17.1 AS installer
WORKDIR /src

# Install dependencies
COPY --from=base /src/out/json .
COPY --from=base /src/out/yarn.lock .
RUN yarn install --frozen-lockfile

COPY --from=base /src/.env* .
COPY --from=base /src/turbo.json .
COPY --from=base /src/next.config.js .
COPY --from=base /src/tsconfig.json .
COPY --from=base /src/out/full .

RUN yarn build --filter=admin
 
FROM us-central1-docker.pkg.dev/gated-inc-prod/docker/node:16.17.1 AS runner
WORKDIR /app
 
COPY --from=installer /src/.env* .
COPY --from=installer /src/node_modules ./node_modules
COPY --from=installer /src/package.json .
COPY --from=installer /src/turbo.json .
COPY --from=installer /src/yarn.lock .
COPY --from=installer /src/next.config.js .
COPY --from=installer /src/packages ./packages

COPY --from=installer /src/apps/admin/package.json ./apps/admin/package.json
COPY --from=installer /src/apps/admin/.next ./apps/admin/.next
COPY --from=installer /src/apps/admin/next.config.js ./apps/admin/next.config.js
COPY --from=installer /src/apps/admin/public ./apps/admin/public
COPY --from=installer /src/apps/admin/.env* ./apps/admin/

RUN chown -R gated:gated .
 
USER gated

EXPOSE 3000
 
CMD npx turbo run start --filter=admin -- -p 3000
