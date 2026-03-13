# VITO Defense Tradewinds - Dockerfile
# =====================================
# Military/Defense Supply Chain Tracking (Tier 1: Defense)
# Maintains forensic audit trail and zero-downtime operation

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
COPY apps/tier-1-defense/vito-defense-tradewinds/package*.json ./
COPY packages/vito-core ./node_modules/vito-core/

# Install dependencies with build tools
RUN npm install --prefer-offline --no-audit && \
    npm cache clean --force

# Copy application code
COPY apps/tier-1-defense/vito-defense-tradewinds . .

# ====================================
# Production stage
FROM node:20-alpine

LABEL name="vito-defense-tradewinds"
LABEL description="Military/Defense Supply Chain Tracking (VITO Tier 1)"
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

# Create data directories for audit trail and store-and-forward
RUN mkdir -p /data/audit_trail /data/stow && \
    chmod 755 /data/audit_trail /data/stow

# Set environment for Defense Tradewinds
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=512" \
    VITO_PROGRAM=vito-defense-tradewinds \
    VITO_TIER=1 \
    STOW_STORE_AND_FORWARD_MODE=true \
    KINETIC_BATTERY_SHED_MODE=true \
    AUDIT_TRAIL_ENABLED=true \
    VIGIL_POLL_INTERVAL=5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start the service
CMD ["npm", "start"]

# Expose API, telemetry, and mesh networking ports
EXPOSE 3001 3002 41641
