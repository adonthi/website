FROM node:10
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .

RUN npm install react-scripts -g --silent
RUN yarn install


CMD ["yarn", "start"]
EXPOSE 3000