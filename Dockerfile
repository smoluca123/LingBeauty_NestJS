# Build stage
FROM oven/bun:1 AS base

WORKDIR /app

FROM base AS install
# Copy package files
COPY package*.json ./

# Install dependencies
RUN bun install --frozen-lockfile --production

FROM base AS prerelease
# Copy source code
COPY . .

# Generate Prisma client
RUN bun prisma generate --schema=./prisma/schema

# Build application
RUN bun run build

# Production stage
FROM base AS release

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN bun install --frozen-lockfile --production

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN bun prisma generate --schema=./prisma/schema

RUN bun run build

# Copy built application from builder stage
COPY --from=base /app/dist ./dist

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/main"]
