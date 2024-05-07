# Use node image as base image
FROM node:14 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:14-slim

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./build

# Install serve to run the app
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5173"]
