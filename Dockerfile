FROM node:lts-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk add --no-cache git

WORKDIR chatgpt
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

CMD pnpm start