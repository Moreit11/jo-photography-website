# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose port for Eleventy
EXPOSE 8080

# Default command for development
CMD ["npx", "eleventy", "--serve", "--port=8080", "--watch"]
