FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
RUN npx prisma generate

COPY . .

CMD ["bun", "run", "start"]
