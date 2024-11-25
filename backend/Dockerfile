FROM node:22.11.0-alpine
LABEL org.opencontainers.image.source="https://github.com/JonathanXDR/M321"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
