FROM --platform=$BUILDPLATFORM node:24-alpine AS base

# Set them as ENV so Next.js sees them during build
ARG Backend_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG test
ARG NEXT_PUBLIC_test

ENV Backend_URL=${Backend_URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV test=${test}
ENV NEXT_PUBLIC_test=${NEXT_PUBLIC_test}
ENV NODE_ENV=production


RUN echo "Backend_URL=$Backend_URL"

# Enable corepack to use pnpm without global install
RUN corepack enable pnpm

WORKDIR /app

# Copy root package files (required for pnpm install)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (monorepo-wide)
RUN pnpm install --frozen-lockfile --recursive

# Copy entire source code
COPY . .

# Build only the web workspace
RUN pnpm build 

# --- Production stage ---
FROM node:24-alpine AS runner

# Enable pnpm (optional, but good practice)
RUN corepack enable pnpm

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextJS -u 1001

# copy standalone output
COPY --from=base --chown=nextJS:nodejs /app/apps/web/.next/standalone ./
COPY --from=base --chown=nextJS:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=base --chown=nextJS:nodejs /app/apps/web/public ./apps/web/public

USER nextJS

EXPOSE 3000

CMD ["node", "apps/web/server.js"]