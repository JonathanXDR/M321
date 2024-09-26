# Use an official Node runtime as the base image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm ci

# Copy the app files to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
