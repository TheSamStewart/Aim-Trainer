FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY . .
EXPOSE 8080
CMD ["serve", "-p", "8080"]
