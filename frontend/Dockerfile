FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ARG NEXT_PUBLIC_BACKEND_URL
# RUN NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL} npm run build

EXPOSE 3000
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]