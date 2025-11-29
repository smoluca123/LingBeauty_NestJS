# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install all dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN bunx prisma generate --schema=./prisma/schema

# Build application
RUN bun run build

# Production stage
FROM oven/bun:1 AS production

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN bunx prisma generate --schema=./prisma/schema

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start application
CMD ["bun", "run", "dist/main.js"]
