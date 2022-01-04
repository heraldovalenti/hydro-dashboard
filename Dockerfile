FROM node 
#:14-alpine as BUILDER

WORKDIR /hydro-dashboard
ADD package.json .

RUN npm install --production
