# Use a lighter version of Node as a parent image
FROM node:8
# Set the working directory to /api
WORKDIR /backend
# copy package.json into the container at /api
COPY package*.json /backend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /backend
COPY . /backend/
# Make port 5000 available to the world outside this container
EXPOSE 5000
# Run the app when the container launches
CMD ["npm", "start"]