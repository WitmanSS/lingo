# ─── Build Stage ─────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npx prisma generate
RUN npm run build

# ─── Production Stage ───────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts --legacy-peer-deps && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Switch to non-root user
USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["sh", "-c", "npx prisma@6 migrate deploy && node dist/main"]
