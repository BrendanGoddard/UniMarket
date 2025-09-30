# Stage 1 — build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install           # Install all dependencies, including devDependencies

COPY . .

RUN npm run build         # Build the project

# Stage 2 — serve
FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=build /app/dist ./dist
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
