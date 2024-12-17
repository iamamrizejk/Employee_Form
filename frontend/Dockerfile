# Frontend Dockerfile
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the frontend for production
RUN npm run build

# Install a lightweight server to serve static files
RUN npm install -g serve

# Expose the frontend port
EXPOSE 5173

# Serve the build directory
CMD ["serve", "-s", "dist"]
