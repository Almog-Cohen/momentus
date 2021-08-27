FROM node:lts-alpine

WORKDIR /app

COPY package.json ./


## Called only if somthing changed in client package.json
COPY client/package*.json client/
RUN npm run install-client --only=production

## Called only if somthing changed in server package.json
COPY server/package*.json server/
RUN npm run install-server --only=production

# Called only if somthing changed in client dir
COPY client/ client/
RUN npm run build --prefix client

# Called only if somthing changed in server dir
COPY server/ server/

# Securtiy - Reduce the user permissions
USER node

CMD [ "npm", "start", "--prefix" , "server"]

EXPOSE 8000