# Image Size: 221MB

# INSTALL
FROM node:current-alpine as install
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# BUILD
FROM install as build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=install /app ./
RUN npm run build

# DEPLOY
FROM node:current-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
RUN npm install next


EXPOSE 3000
CMD npm run start
