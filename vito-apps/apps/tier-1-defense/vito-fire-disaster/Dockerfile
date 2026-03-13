# VITO Fire Disaster (BLAZE) - Dockerfile
# =========================================
# Emergency Response Mobile Command Post (Tier 1: Defense)
# Aggressive power shedding for extended battery life

FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    curl \
    ca-certificates

# Copy package files
COPY apps/tier-1-defense/vito-fire-disaster/package*.json ./
COPY packages/vito-core ./node_modules/vito-core/

# Install dependencies with build tools
RUN npm install --prefer-offline --no-audit && \
    npm cache clean --force

# Copy application code
COPY apps/tier-1-defense/vito-fire-disaster . .

# ====================================
# Production stage
FROM node:20-alpine

LABEL name="vito-fire-disaster"
LABEL description="VITO Emergency Response Mobile Command Post (BLAZE)"
LABEL codename="BLAZE"
LABEL tier="1"
LABEL version="4.6.6"

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache \
    curl \
    ca-certificates \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Copy built application from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app . .

# Create data directories for STOW store-and-forward logging
RUN mkdir -p /data/fire-disaster/mission-logs /data/incidents /data/stow && \
    chmod 755 /data/fire-disaster /data/incidents /data/stow

# Set environment for BLAZE profile
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=256" \
    VITO_PROGRAM=vito-fire-disaster \
    VITO_CODENAME=BLAZE \
    VITO_TIER=1 \
    KINETIC_BATTERY_EXTENSION=4x \
    KINETIC_AGGRESSIVE_SHEDDING=true \
    STOW_FLUSH_INTERVAL=1000 \
    VIGIL_THERMAL_THRESHOLD=85 \
    VIGIL_POLL_INTERVAL=5000

# Health check - verify BLAZE agents are operational
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start the mission
CMD ["npm", "start"]

# Expose API and mesh networking ports
EXPOSE 3001 41641
