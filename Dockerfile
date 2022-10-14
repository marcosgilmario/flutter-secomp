FROM node:16.15-alpine3.14

RUN mkdir -p /opt/api
WORKDIR /opt/api

RUN adduser -S app

COPY . .
# COPY db_init.sql /docker-entrypoint-initdb.d/
# COPY init.sh /docker-entrypoint-initdb.d/

RUN yarn install
RUN yarn add  pm2 --save


RUN chown -R app /opt/api

USER app

EXPOSE 5000
CMD [ "yarn", "deploy" ]
