FROM node:18
WORKDIR /usr/src/clean-tdd-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start