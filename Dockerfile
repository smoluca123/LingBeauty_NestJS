FROM oven/bun

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install
RUN bun run build

COPY . .

CMD ["bun", "run", "start"]
