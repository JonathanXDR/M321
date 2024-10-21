# Use an official Node runtime as the base image
FROM node:18.16.0

# Assign the Image to a repository
LABEL org.opencontainers.image.source https://github.com/JonathanXDR/Note-Library-Backend

# Set the arguments
ARG DATABASE_URL

# Set the environment variables
# ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /app

# Copy the app files to the working directory
COPY . .

# Install any needed packages
RUN npm ci

# Generate the Prisma client
RUN npx prisma generate

# Build the Nest.js application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]

# Expose the port on which the app will run
EXPOSE 3000