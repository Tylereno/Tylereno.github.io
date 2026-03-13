# VITO Health Field - Dockerfile
# ================================
# Mobile Field Medical Operations (Tier 1: Defense)
# HIPAA-compliant with encrypted vault and patient records

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
COPY apps/tier-1-defense/vito-health-field/package*.json ./
COPY packages/vito-core ./node_modules/vito-core/

# Install dependencies with build tools
RUN npm install --prefer-offline --no-audit && \
    npm cache clean --force

# Copy application code
COPY apps/tier-1-defense/vito-health-field . .

# ====================================
# Production stage
FROM node:20-alpine

LABEL name="vito-health-field"
LABEL description="Mobile Field Medical Operations (VITO Tier 1)"
LABEL compliance="HIPAA"
LABEL tier="1"
LABEL version="4.6.6"

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache \
    curl \
    ca-certificates \
    dumb-init \
    openssl \
    && rm -rf /var/cache/apk/*

# Copy built application from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app . .

# Create data directories with HIPAA compliance
RUN mkdir -p /data/patient_records /data/encrypted_vault /data/stow && \
    chmod 700 /data/patient_records /data/encrypted_vault && \
    chmod 755 /data/stow

# Set environment for Health Field (medical operations)
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=512" \
    VITO_PROGRAM=vito-health-field \
    VITO_TIER=1 \
    HIPAA_COMPLIANCE=true \
    ENCRYPTION_ENABLED=true \
    KINETIC_MEDICAL_DEVICE_THRESHOLD=50 \
    STOW_STORE_AND_FORWARD_MODE=true \
    VIGIL_POLL_INTERVAL=5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start the medical operations system
CMD ["npm", "start"]

# Expose API and mesh networking ports
EXPOSE 3001 41641
