'use client';

import { useState } from 'react';
import { BusRoute, LiveBus } from '@/types/transport';

interface Props {
  routes: BusRoute[];
  liveBuses: LiveBus[];
}

export default function StopSearch({ routes, liveBuses }: Props) {
  const [query, setQuery] = useState('');

  const allStops = routes.flatMap(r => r.stops.map(s => ({ ...s, routeName: r.name, routeColor: r.color })));
  const uniqueStops = allStops.filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i);
  const filtered = uniqueStops.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const getBusesAtStop = (stopId: string) =>
    liveBuses.filter(b => {
      const route = routes.find(r => r.id === b.routeId);
      return route?.stops.some(s => s.id === stopId);
    });

  return (
    <div>
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search bus stops..."
          style={{
            width: '100%', padding: '14px 16px 14px 48px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: 14, color: 'white', fontSize: 16,
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(stop => {
          const nearbyBuses = getBusesAtStop(stop.id);
          return (
            <div key={stop.id} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: 16, padding: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(168,85,247,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>📍</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{stop.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    {stop.routes.length} routes serving this stop
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {stop.routes.map(r => (
                  <span key={r} style={{
                    background: 'rgba(168,85,247,0.15)',
                    border: '1px solid rgba(168,85,247,0.3)',
                    borderRadius: 6, padding: '3px 10px',
                    fontSize: 12, fontWeight: 600, color: '#a855f7',
                  }}>Route {r}</span>
                ))}
              </div>

              {nearbyBuses.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Upcoming Buses</div>
                  {nearbyBuses.map(bus => (
                    <div key={bus.id} style={{
                      display: 'flex', justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.03)', borderRadius: 8,
                      padding: '8px 12px', marginBottom: 6,
                    }}>
                      <span style={{ fontSize: 13 }}>🚌 Route {bus.routeNumber}</span>
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: bus.eta <= 3 ? '#10b981' : '#f59e0b',
                      }}>{bus.eta} min</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}