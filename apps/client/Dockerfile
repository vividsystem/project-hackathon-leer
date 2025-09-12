FROM imbios/bun-node:23-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN ["bun", "i"]

RUN ["bun", "run", "build"]

CMD ["bun", "start"]
