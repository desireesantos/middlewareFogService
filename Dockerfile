FROM node:12-alpine

WORKDIR /app
COPY . .    

RUN npm install -g nodemon
RUN npm install && npm ls  --production
# We then copy the rest of our application
# to the app directory and bundle app source
COPY ./service .

# Set instructions on build.
ONBUILD ADD ./service/package.json /app/
ONBUILD RUN npm install
ONBUILD ADD ./service/ /app

CMD [ "npm", "start" ]