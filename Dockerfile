FROM node:20-slim

# Install system dependencies
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get install -y libssl-dev
# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy the rest of the application
COPY . .

# Generate Prisma client (needed for DB access)
RUN npx prisma generate

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]