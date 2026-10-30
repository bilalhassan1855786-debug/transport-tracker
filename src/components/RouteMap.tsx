
'use client';

import { BusRoute, LiveBus } from '@/types/transport';

interface Props {
  routes: BusRoute[];
  buses: LiveBus[];
}

export default function RouteMap({ routes, buses }: Props) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(168,85,247,0.2)',
      borderRadius: 20,
      padding: 24,
      color: 'white',
    }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
          🗺️ Transport Route Map
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 13,
          marginTop: 6,
        }}>
          Route stops and simulated bus locations
        </p>
      </div>

      {routes.map(route => {
        const routeBuses = buses.filter(
          bus => bus.routeId === route.id
        );

        return (
          <div key={route.id} style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${route.color}40`,
            borderRadius: 14,
            padding: 18,
            marginBottom: 16,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                background: `${route.color}20`,
                border: `1px solid ${route.color}`,
                color: route.color,
                padding: '8px 12px',
                borderRadius: 9,
                fontWeight: 800,
              }}>
                {route.number}
              </div>

              <div>
                <div style={{ fontWeight: 700 }}>
                  {route.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#9ca3af',
                }}>
                  {route.stops.length} stops · Every {route.frequency} min
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}>
              {route.stops.map((stop, index) => (
                <div key={stop.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 42,
                }}>
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: route.color,
                    border: '3px solid rgba(255,255,255,0.15)',
                    flexShrink: 0,
                  }} />

                  <div style={{
                    fontSize: 13,
                    color: '#e5e7eb',
                  }}>
                    {stop.name}
                    {index === 0 && (
                      <span style={{ color: '#10b981', marginLeft: 8 }}>
                        Start
                      </span>
                    )}
                    {index === route.stops.length - 1 && (
                      <span style={{ color: '#f59e0b', marginLeft: 8 }}>
                        End
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {routeBuses.length > 0 && (
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: 12,
                marginTop: 12,
              }}>
                <div style={{
                  fontSize: 12,
                  color: '#9ca3af',
                  marginBottom: 8,
                }}>
                  Active buses on this route
                </div>

                {routeBuses.map(bus => (
                  <div key={bus.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 13,
                    padding: '7px 0',
                  }}>
                    <span>🚌 {bus.id.toUpperCase()}</span>
                    <span style={{ color: '#10b981' }}>
                      ETA: {bus.eta} min
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
