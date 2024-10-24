# Use the official Node.js image as the base image
FROM node:20.18.0

# Assign the Image to a repository
LABEL org.opencontainers.image.source https://github.com/JonathanXDR/M321

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application source code
COPY . .

# Build the application for production
RUN npm run build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
