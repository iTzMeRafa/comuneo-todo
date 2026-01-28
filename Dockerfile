# Stage 1: Install development dependencies
FROM node:20-alpine AS development-dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Stage 2: Install production dependencies
FROM node:20-alpine AS production-dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

# Stage 3: Build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
COPY --from=development-dependencies /app/node_modules ./node_modules
RUN yarn build

# Stage 4: Production image
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=7200

# Expose the port
EXPOSE 7200

# Start the app
CMD ["yarn", "start"]
