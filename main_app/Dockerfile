FROM node:14
# Create app directory
WORKDIR /app
# Copy app code source from our local folder into docker /app working directory
COPY . .
# Install app dependencies
RUN npm install
# envirementVariable
ENV PORT=4000
# Install app on a given port
EXPOSE 4000
# start app
CMD ["npm", "start"]
