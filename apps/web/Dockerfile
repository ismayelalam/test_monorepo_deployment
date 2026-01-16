FROM --platform=$BUILDPLATFORM node:20-alpine AS base

# Enable corepack to use pnpm without global install
RUN corepack enable pnpm

WORKDIR /app

# Copy root package files (required for pnpm install)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (monorepo-wide)
RUN pnpm install --frozen-lockfile

# Copy entire source code
COPY . .

# Build only the web workspace
RUN pnpm build 

# --- Production stage ---
FROM node:20-alpine AS runner

# Enable pnpm (optional, but good practice)
RUN corepack enable pnpm

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone output (requires `output: 'standalone'` in next.config.js/mjs)
COPY --from=builder /app/.next/standalone/apps/web ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]