FROM --platform=$BUILDPLATFORM node:20-alpine AS base

# Set them as ENV so Next.js sees them during build
ARG Backend_URL
ENV Backend_URL=${Backend_URL}

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

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextJS -u 1001

# copy standalone output
COPY --from=base --chown=nextJS:nodejs /app/apps/web/.next/standalone ./

# copy required .next/static folder
COPY --from=base --chown=nextJS:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# copy public folder
COPY --from=base --chown=nextJS:nodejs /app/apps/web/public ./apps/web/public

USER nextJS

EXPOSE 3000

CMD ["node", "apps/web/server.js"]