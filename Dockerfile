# Use an official Node runtime as the base image
FROM node:18.16.0

# Set the environment variable
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm ci

# Copy the app files to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Run prisma migrations
RUN npx prisma migrate deploy

# Expose the port on which the app will run
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
