FROM node:14
# Create app directory
WORKDIR /app
# Copy app code source from our local folder into docker /app working directory
COPY . /app
# Install app dependencies
RUN npm install 
# Install app on a given port
EXPOSE 3000
# start app
ENTRYPOINT ["npm", "start"]