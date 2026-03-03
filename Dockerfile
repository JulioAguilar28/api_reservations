# ===============================
# Stage 1 - Base
# ===============================
FROM node:22-alpine AS base

WORKDIR /app

# Prisma necesita openssl en Alpine
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
