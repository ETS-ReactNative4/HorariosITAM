FROM node:10.14.1

RUN mkdir -p web_services/src/
WORKDIR web_services/

ADD src/ src/
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install package.json

CMD ["node", "src/app.js"]
