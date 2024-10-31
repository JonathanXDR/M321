# Use an official Node.js runtime as a parent image
FROM node:22.11.0

# Assign the Image to a repository
LABEL org.opencontainers.image.source=https://github.com/JonathanXDR/M321

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the wait tool
ADD https://github.com/ufoscout/docker-compose-wait/releases/latest/download/wait /wait

# Make the wait tool executable
RUN chmod +x /wait

# Install any needed packages
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

## Launch the wait tool and then your application
CMD ["/wait", "&&", "prisma", "migrate", "deploy", "&&", "npm", "run", "start"]