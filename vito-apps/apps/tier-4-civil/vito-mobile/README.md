# VITO Mobile Node — Ford E-450 Integration Guide

## Hardware Overview

**Vehicle:** 2002 Ford E-450 (SUSI)
**Powertrain:** 7.3L Turbo Diesel
**Mobile Command Center:** Lenovo P53 (hosted)

### Power System
- **Solar Array:** 1300W Renogy/Outback MPPT controller
- **Battery Bank:** 280Ah LiFePO4 @ 48V nominal
- **BMS:** JBD-SP04S100A smart management system
- **Inverter:** 6000W continuous (assumed)

### Connectivity
- **Starlink Terminal** (off-grid internet via satellite)
- **Tailscale VPN** (secure mesh access)
- **CAN-Bus/OBD-II** (engine diagnostics)

---

## Hardware Connections Required

### For KINETIC (Solar/Battery Telemetry)
1. **Charge Controller Serial Output** → `/dev/ttyUSB0`
   - Wire: Controller UART TX/RX → USB-TTL adapter
   - Baud: 9600 (standard Renogy)
   - Expected format: `PV_W=1250,BAT_V=48.2,BAT_A=15.3`

2. **Battery BMS Serial Output** → `/dev/ttyUSB1`
   - Wire: BMS UART TX/RX → USB-TTL adapter
   - Baud: 9600 (standard JBD)
   - Expected format: `SoC=85.5,Temp=28.3,Voltage=48.1,Current=12.5`

### For VIGIL (Engine Diagnostics) — Optional
3. **OBD-II Adapter** → `/dev/ttyOBD`
   - Standard ELM327 USB adapter
   - Baud: 38400
   - Plugs directly into 7.3L diesel diagnostic port under dash
   - Reads: RPM, coolant temp, glow plug status, fault codes

---

## Building & Launching

### Step 1: Build the Mobile Container
```bash
cd /opt/ark/apps/tier-4-civil/vito-mobile
docker compose build vito-mobile
```

### Step 2: Deploy with Hardware Access
```bash
docker compose up -d vito-mobile
```

The container will:
- Attempt to open `/dev/ttyUSB0` (charge controller)
- Attempt to open `/dev/ttyUSB1` (BMS)
- Attempt to open `/dev/ttyOBD` (OBD-II, if present)
- Poll every 5 seconds
- Report to VITO dashboard via telemetry bridge

### Step 3: Verify in Dashboard
Navigate to `http://100.124.104.38:5173/` and check:
- **POWER ORCHESTRATION** panel in Dashboard tab
  - Solar Input: should show watts (0W if no sun, 1200+W in full sun)
  - Battery SoC: should show percentage
  - Charge Current: amperage flowing into battery

- **LOGIC SUBSYSTEM** panel
  - Model: `qwen2.5-coder:3b`
  - Platform: `VITO S-4` (now also serving mobile)

---

## Hardware Ports & Fallback Behavior

| Device | Port | If Unavailable | Fallback |
|--------|------|---|---|
| Charge Controller | `/dev/ttyUSB0` | Shows 0W solar | You lose real-time solar monitoring |
| Battery BMS | `/dev/ttyUSB1` | Shows 100% SoC | You lose battery state-of-health |
| OBD-II Adapter | `/dev/ttyOBD` | Skipped gracefully | Engine diagnostics disabled |

The mobile node **will still run** even if hardware is missing—it just won't have sensor data.

---

## Troubleshooting Serial Connections

### Check if USB devices are recognized:
```bash
lsof -i :ttyUSB* || ls -la /dev/ttyUSB*
```

### Test communication with charge controller manually:
```bash
cu -l /dev/ttyUSB0 -s 9600
# Type: PV_W=1250,BAT_V=48.2,BAT_A=15.3
# (Ctrl+D to exit)
```

### Monitor logs in real-time:
```bash
docker logs -f vito-mobile
```

---

## Next Steps

1. **Wire up the charge controller serial output** to a USB adapter, plug into P53 USB hub
2. **Wire up the BMS serial output** (separate USB adapter if not combined)
3. **Optional: Connect OBD-II adapter** for engine diagnostics
4. **Run the docker compose** and watch the POWER ORCHESTRATION panel light up with real data

Once hardware is connected, your dashboard will automatically show:
- Real-time solar harvest curves
- Battery state-of-charge trending
- Tier shedding recommendations (OTTO will suggest when to turn off loads)
- Engine health metrics (if OBD-II is connected)

---

## SUSI (The Bus) vs VITO-MOBILE (The System)

**SUSI** = Your awesome 2002 Ford E-450 (the vehicle)
**VITO-MOBILE** = The containerized software stack that monitors SUSI
**Tailscale IP** = How you access VITO-MOBILE from anywhere on your mesh

This distinction keeps things clear: you're commanding **SUSI** (the bus), but **VITO-MOBILE** (the software) is the intelligence running inside it.
