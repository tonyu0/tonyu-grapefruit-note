FROM node:24-slim

WORKDIR /app

# Copy package.json and yarn.lock first for cache efficiency
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install

# copy source code
COPY . .

# Vite default port
EXPOSE 5173

# launch (allow access from host)
CMD ["yarn", "dev", "--host"]
