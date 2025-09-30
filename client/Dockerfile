# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

RUN chmod +x node_modules/.bin/vite

COPY . .

RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS prod
WORKDIR /app

COPY --from=build /app/dist ./dist
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
