FROM node:18.14.2-alpine3.17
# Set the working directory to /app
WORKDIR /app
# Install dependencies
COPY ./package.json ./

RUN apk update && apk upgrade && \ 
   apk add --no-cache bash git openssh

RUN npm install

COPY . .

ENV NODE_ENV =production

EXPOSE 8080

CMD [ "npm", "run", "app" ]