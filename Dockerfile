FROM node:20-slim
WORKDIR /app
# We use a simple server called 'serve' to view your HTML
RUN npm install -g serve
COPY . .
EXPOSE 8080
CMD ["serve", "-p", "8080"]