# Use Node 20 image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies INCLUDING devDependencies
RUN npm install --include=dev

# Copy the rest of the project
COPY . .

# Start Eleventy + Tailwind watchers
CMD ["npm", "run", "dev"]

