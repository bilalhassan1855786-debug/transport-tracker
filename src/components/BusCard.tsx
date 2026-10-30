'use client';

import { LiveBus, BusRoute } from '@/types/transport';

interface Props {
  bus: LiveBus;
  routes: BusRoute[];
}

const occupancyConfig = {
  Low:    { color: '#10b981', icon: '🟢', label: 'Seats Available' },
  Medium: { color: '#f59e0b', icon: '🟡', label: 'Getting Busy' },
  High:   { color: '#f97316', icon: '🟠', label: 'Almost Full' },
  Full:   { color: '#ef4444', icon: '🔴', label: 'No Seats' },
};

export default function BusCard({ bus, routes }: Props) {
  const route = routes.find(r => r.id === bus.routeId);
  const occ = occupancyConfig[bus.occupancy];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${route?.color || '#a855f7'}30`,
      borderRadius: 20, padding: 24,
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px ${route?.color || '#a855f7'}20`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `linear-gradient(135deg, ${route?.color || '#a855f7'}, ${route?.color || '#a855f7'}80)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>🚌</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Route {bus.routeNumber}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{route?.name}</div>
          </div>
        </div>
        <div style={{
          background: `${occ.color}15`,
          border: `1px solid ${occ.color}40`,
          borderRadius: 10, padding: '6px 12px',
          fontSize: 12, color: occ.color, fontWeight: 600,
        }}>
          {occ.icon} {occ.label}
        </div>
      </div>

      {/* ETA */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 14, padding: 16, marginBottom: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Next Stop</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>📍 {bus.nextStop}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>ETA</div>
          <div style={{
            fontSize: 28, fontWeight: 800,
            color: bus.eta <= 3 ? '#10b981' : bus.eta <= 7 ? '#f59e0b' : '#ef4444',
          }}>
            {bus.eta}<span style={{ fontSize: 14 }}> min</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Speed', value: `${Math.round(bus.speed)} km/h`, icon: '⚡' },
          { label: 'Driver', value: bus.driver.split(' ')[0], icon: '👨‍✈️' },
          { label: 'Bus ID', value: bus.id.toUpperCase(), icon: '🔢' },
          { label: 'Status', value: 'On Time', icon: '✅' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 10, padding: '10px 14px',
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{item.icon} {item.label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}