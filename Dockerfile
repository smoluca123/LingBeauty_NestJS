# ================================
# Stage 1: Dependencies
# ================================
FROM oven/bun:1-alpine AS deps

WORKDIR /app

# Install dependencies required for Prisma on Alpine
RUN apk add --no-cache openssl libc6-compat

# Copy package files and prisma config
COPY package*.json bun.lock* ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

# Install dependencies
RUN bun install --frozen-lockfile

# ================================
# Stage 2: Builder
# ================================
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN bun run build

# ================================
# Stage 3: Production
# ================================
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Install dependencies required for Prisma on Alpine
RUN apk add --no-cache openssl libc6-compat

# Set environment
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "dist/main.js"]