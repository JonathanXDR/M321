# Use an official Node runtime as the base image
FROM node:18.16.0

# Set the arguments
ARG DATABASE_URL

# Set the environment variables
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /app

# Copy the app files to the working directory
COPY . .

# Install the wait tool
ADD https://github.com/ufoscout/docker-compose-wait/releases/latest/download/wait /wait

# Make the wait tool executable
RUN chmod +x /wait

# Install any needed packages
RUN npm ci

# Generate the Prisma client
RUN npx prisma generate

# Run prisma migrations
RUN npx prisma migrate deploy

# Build the Nest.js application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]

# Expose the port on which the app will run
EXPOSE 3000