# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the Docker container
WORKDIR .

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application's files to the container
COPY . .

# Specify the container's default port when it runs
EXPOSE 3000

# The command to run the application
CMD [ "node", "server.js" ]
