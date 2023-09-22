FROM node:18-alpine AS pruner

RUN yarn global add turbo@1.5.5

COPY . .
RUN turbo prune --docker --scope=admin
RUN turbo prune --docker --scope=challenge
RUN turbo prune --docker --scope=dashboard
RUN turbo prune --docker --scope=nonprofits
RUN turbo prune --docker --scope=signup
RUN turbo prune --docker --scope=user
RUN turbo prune --docker --scope=requests
RUN turbo prune --docker --scope=webflow

# Install dependencies only when needed
FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY --from=pruner out/json .
COPY --from=pruner out/yarn.lock .
RUN yarn --frozen-lockfile

COPY --from=pruner .env* .
COPY --from=pruner .gitignore .
COPY --from=pruner turbo.json .
COPY --from=pruner next.config.js .
COPY --from=pruner tsconfig.json .
COPY --from=pruner out/full .

RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

RUN apk update
RUN apk add nginx gettext git

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/packages ./packages


#challenge files
COPY --from=builder --chown=nextjs:nodejs /app/apps/challenge/package.json ./apps/challenge/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/challenge/.next ./apps/challenge/.next
COPY --chown=nextjs:nodejs /apps/challenge/next.config.js ./apps/challenge/next.config.js
COPY --from=builder /app/apps/challenge/public ./apps/challenge/public
COPY --from=builder /app/apps/challenge/.env* ./apps/challenge/

#signup files
COPY --from=builder --chown=nextjs:nodejs /app/apps/signup/package.json ./apps/signup/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/signup/.next ./apps/signup/.next
COPY --chown=nextjs:nodejs /apps/signup/next.config.js ./apps/signup/next.config.js
COPY --from=builder /app/apps/signup/public ./apps/signup/public
COPY --from=builder /app/.env* ./apps/signup/

#admin files
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/package.json ./apps/admin/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next ./apps/admin/.next
COPY --chown=nextjs:nodejs /apps/admin/next.config.js ./apps/admin/next.config.js
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder /app/.env* ./apps/admin/

#dashboard files
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/package.json ./apps/dashboard/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next ./apps/dashboard/.next
COPY --chown=nextjs:nodejs /apps/dashboard/next.config.js ./apps/dashboard/next.config.js
COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public
COPY --from=builder /app/.env* ./apps/dashboard/

#user files
COPY --from=builder --chown=nextjs:nodejs /app/apps/user/package.json ./apps/user/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/user/.next ./apps/user/.next
COPY --chown=nextjs:nodejs /apps/user/next.config.js ./apps/user/next.config.js
COPY --from=builder /app/apps/user/public ./apps/user/public
COPY --from=builder /app/.env* ./apps/user/

#requests files
COPY --from=builder --chown=nextjs:nodejs /app/apps/requests/package.json ./apps/requests/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/requests/.next ./apps/requests/.next
COPY --chown=nextjs:nodejs /apps/requests/next.config.js ./apps/requests/next.config.js
COPY --from=builder /app/apps/requests/public ./apps/requests/public
COPY --from=builder /app/.env* ./apps/requests/

#nonprofits files
COPY --from=builder --chown=nextjs:nodejs /app/apps/nonprofits/package.json ./apps/nonprofits/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/nonprofits/.next ./apps/nonprofits/.next
COPY --chown=nextjs:nodejs /apps/nonprofits/next.config.js ./apps/nonprofits/next.config.js
COPY --from=builder /app/apps/nonprofits/public ./apps/nonprofits/public
COPY --from=builder /app/.env* ./apps/nonprofits/

#webflow files
COPY --from=builder --chown=nextjs:nodejs /app/apps/webflow/package.json ./apps/webflow/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/webflow/.next ./apps/webflow/.next
COPY --chown=nextjs:nodejs /apps/webflow/next.config.js ./apps/webflow/next.config.js
COPY --from=builder /app/apps/webflow/public ./apps/webflow/public
COPY --from=builder /app/.env* ./apps/webflow/

COPY ./nginx/nginx.conf /etc/nginx/nginx.temp

ENV NGINX_GATEWAY=localhost
RUN envsubst '$NGINX_GATEWAY' < /etc/nginx/nginx.temp > /etc/nginx/nginx.conf

COPY ./nginx/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
