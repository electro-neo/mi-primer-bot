FROM node:18-bullseye-slim as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm install sharp@0.32.6 --legacy-peer-deps && npm install --legacy-peer-deps
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
CMD ["npm", "start"]
