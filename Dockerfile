# Build stage
FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy source code
COPY . .

# Generate Prisma client
RUN bun prisma generate --schema=./prisma/schema

# Build application
RUN bun run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/main"]
