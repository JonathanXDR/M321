# Use an official Node runtime as the base image
FROM node:18.16.0

# Set the environment variables
ENV NODE_ENV production

# Set the working directory in the container
WORKDIR /app

# Copy the app files to the working directory
COPY . .

# Install any needed packages
RUN npm ci

# Build the React application
RUN npm run build

# Start the application
CMD ["npm", "start"]

# Expose the port on which the app will run
EXPOSE 3001