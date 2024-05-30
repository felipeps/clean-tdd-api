FROM mongo:latest
EXPOSE 27017
COPY init-mongo.js /docker-entrypoint-initdb.d/
CMD ["mongod"]
