'use client';

import { useState, useEffect } from 'react';
import { mockRoutes, mockLiveBuses } from '@/lib/mockData';
import { LiveBus, BusRoute, ETAInfo } from '@/types/transport';
import BusCard from './BusCard';
import StopSearch from './StopSearch';
import LiveETA from './LiveETA';

export default function TransportTracker() {
  const [buses, setBuses] = useState<LiveBus[]>(mockLiveBuses);
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [searchStop, setSearchStop] = useState<string>('');
  const [time, setTime] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'routes' | 'stops'>('live');

  useEffect(() => {
  // Set time only after the component mounts in the browser
  setTime(new Date());

  // Update clock every second
  const clockTimer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // Simulate live bus movement every 5 seconds
  const busTimer = setInterval(() => {
    setBuses(prev =>
      prev.map(bus => ({
        ...bus,
        eta: Math.max(
          1,
          bus.eta + (Math.random() > 0.5 ? 1 : -1)
        ),
        speed: Math.max(
          20,
          Math.min(60, bus.speed + (Math.random() - 0.5) * 5)
        ),
      }))
    );
  }, 5000);

  return () => {
    clearInterval(clockTimer);
    clearInterval(busTimer);
  };
}, []);

  const filteredBuses = buses.filter(b =>
    selectedRoute === 'all' || b.routeId === selectedRoute
  );

  const occupancyColor = {
    Low: '#10b981',
    Medium: '#f59e0b',
    High: '#f97316',
    Full: '#ef4444',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
      fontFamily: "'Inter', sans-serif",
      color: 'white',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(168,85,247,0.2)',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>🚌</div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0,
              background: 'linear-gradient(90deg, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TransitLive
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              Real-time Public Transport Tracker
            </p>
          </div>
        </div>
        <div style={{
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 20, padding: '6px 16px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981',
            animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 13, color: '#10b981' }}>
  Live • {time ? time.toLocaleTimeString() : 'Loading time...'}
</span>
        </div>
      </div>

      <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Active Buses', value: buses.length, icon: '🚌', color: '#a855f7' },
            { label: 'Routes Running', value: mockRoutes.length, icon: '🛣️', color: '#06b6d4' },
            { label: 'Avg ETA', value: `${Math.round(buses.reduce((s,b) => s+b.eta,0)/buses.length)} min`, icon: '⏱️', color: '#f59e0b' },
            { label: 'Total Stops', value: '47', icon: '📍', color: '#10b981' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${stat.color}30`,
              borderRadius: 16, padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontSize: 32 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['live', 'routes', 'stops'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14, textTransform: 'capitalize',
              background: activeTab === tab
                ? 'linear-gradient(135deg, #a855f7, #06b6d4)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s',
            }}>
              {tab === 'live' ? '🔴 Live Buses' : tab === 'routes' ? '🛣️ Routes' : '📍 Stops'}
            </button>
          ))}

          {/* Route Filter */}
          <select
            value={selectedRoute}
            onChange={e => setSelectedRoute(e.target.value)}
            style={{
              marginLeft: 'auto', padding: '10px 16px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(168,85,247,0.3)',
              color: 'white', fontSize: 14, cursor: 'pointer',
            }}
          >
            <option value="all">All Routes</option>
            {mockRoutes.map(r => (
              <option key={r.id} value={r.id}>Route {r.number}</option>
            ))}
          </select>
        </div>

        {/* Live Buses Tab */}
        {activeTab === 'live' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {filteredBuses.map(bus => (
              <BusCard key={bus.id} bus={bus} routes={mockRoutes} />
            ))}
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 }}>
            {mockRoutes.map(route => (
              <div key={route.id} style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${route.color}40`,
                borderRadius: 20, padding: 24,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${route.color}20`,
                    border: `2px solid ${route.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 800, color: route.color,
                  }}>{route.number}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{route.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      Every {route.frequency} min • {route.stops.length} stops
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {route.stops.map((stop, i) => (
                    <div key={stop.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: '50%',
                          background: i === 0 || i === route.stops.length - 1 ? route.color : 'rgba(255,255,255,0.3)',
                          border: `2px solid ${route.color}`,
                        }} />
                        {i < route.stops.length - 1 && (
                          <div style={{ width: 2, height: 20, background: `${route.color}40` }} />
                        )}
                      </div>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{stop.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stops Tab */}
        {activeTab === 'stops' && <StopSearch routes={mockRoutes} liveBuses={buses} />}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        select option { background: #1a0a2e; color: white; }
      `}</style>
    </div>
  );
}