
'use client';

import { LiveBus } from '@/types/transport';

interface Props {
  bus: LiveBus;
}

export default function LiveETA({ bus }: Props) {
  const etaColor =
    bus.eta <= 3 ? '#10b981' :
    bus.eta <= 7 ? '#f59e0b' : '#ef4444';

  const occupancyColors = {
    Low: '#10b981',
    Medium: '#f59e0b',
    High: '#f97316',
    Full: '#ef4444',
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(168,85,247,0.25)',
      borderRadius: 16,
      padding: 20,
      color: 'white',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>
            Bus Arrival Estimate
          </div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>
            Route {bus.routeNumber}
          </div>
        </div>

        <div style={{
          background: `${etaColor}20`,
          color: etaColor,
          padding: '8px 12px',
          borderRadius: 10,
          fontWeight: 700,
        }}>
          {bus.eta} min
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>
          Next Stop
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 5 }}>
          📍 {bus.nextStop}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        fontSize: 13,
      }}>
        <div>
          <div style={{ color: '#9ca3af' }}>Speed</div>
          <strong>{Math.round(bus.speed)} km/h</strong>
        </div>

        <div>
          <div style={{ color: '#9ca3af' }}>Occupancy</div>
          <strong style={{ color: occupancyColors[bus.occupancy] }}>
            {bus.occupancy}
          </strong>
        </div>

        <div>
          <div style={{ color: '#9ca3af' }}>Bus ID</div>
          <strong>{bus.id.toUpperCase()}</strong>
        </div>
      </div>

      <div style={{
        marginTop: 16,
        fontSize: 11,
        color: '#9ca3af',
      }}>
        Demo estimate — simulated transport data
      </div>
    </div>
  );
}
