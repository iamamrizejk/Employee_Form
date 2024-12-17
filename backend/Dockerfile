# Backend Dockerfile
FROM node:latest

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server/server.js"]
