FROM node:8 as build

WORKDIR /app
COPY package.json index.js .
RUN npm install

FROM gcr.io/distroless/nodejs

COPY --from=build /app /
EXPOSE 3000
CMD ["index.js"]
