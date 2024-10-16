# Set the arguments
ARG DATABASE_URL

# Use an official Node runtime as the base image
FROM node:18.16.0

# Set the environment variables
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /app

# Copy the app files to the working directory
COPY . .

# Install any needed packages
RUN npm ci

# Build the Nest.js application
RUN npm run build

# Run prisma migrations
RUN npx prisma migrate deploy

# Start the application
CMD ["npm", "run", "start:prod"]

# Expose the port on which the app will run
EXPOSE 3000