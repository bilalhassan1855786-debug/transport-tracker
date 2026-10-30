import { BusRoute, LiveBus } from '@/types/transport';

export const mockRoutes: BusRoute[] = [
  {
    id: 'r1',
    name: 'City Center Express',
    number: '101',
    color: '#a855f7',
    frequency: 10,
    stops: [
      { id: 's1', name: 'Central Station', lat: 31.5204, lng: 74.3587, routes: ['101', '202'] },
      { id: 's2', name: 'Mall Road', lat: 31.5304, lng: 74.3687, routes: ['101'] },
      { id: 's3', name: 'Liberty Market', lat: 31.5404, lng: 74.3787, routes: ['101', '303'] },
      { id: 's4', name: 'Gulberg Circle', lat: 31.5504, lng: 74.3887, routes: ['101'] },
      { id: 's5', name: 'DHA Main Gate', lat: 31.5604, lng: 74.3987, routes: ['101', '404'] },
    ],
  },
  {
    id: 'r2',
    name: 'Airport Shuttle',
    number: '202',
    color: '#06b6d4',
    frequency: 20,
    stops: [
      { id: 's1', name: 'Central Station', lat: 31.5204, lng: 74.3587, routes: ['101', '202'] },
      { id: 's6', name: 'Allama Iqbal Airport', lat: 31.5216, lng: 74.4036, routes: ['202'] },
      { id: 's7', name: 'Walton Road', lat: 31.5116, lng: 74.3936, routes: ['202'] },
    ],
  },
  {
    id: 'r3',
    name: 'University Loop',
    number: '303',
    color: '#f59e0b',
    frequency: 15,
    stops: [
      { id: 's3', name: 'Liberty Market', lat: 31.5404, lng: 74.3787, routes: ['101', '303'] },
      { id: 's8', name: 'Punjab University', lat: 31.5504, lng: 74.3587, routes: ['303'] },
      { id: 's9', name: 'LUMS', lat: 31.5604, lng: 74.3487, routes: ['303'] },
      { id: 's10', name: 'FAST NUCES', lat: 31.5704, lng: 74.3387, routes: ['303'] },
    ],
  },
];

export const mockLiveBuses: LiveBus[] = [
  { id: 'b1', routeId: 'r1', routeNumber: '101', currentLat: 31.525, currentLng: 74.363, speed: 42, nextStop: 'Mall Road', eta: 3, occupancy: 'Medium', driver: 'Ahmed Khan' },
  { id: 'b2', routeId: 'r1', routeNumber: '101', currentLat: 31.545, currentLng: 74.383, speed: 38, nextStop: 'Gulberg Circle', eta: 5, occupancy: 'High', driver: 'Bilal Raza' },
  { id: 'b3', routeId: 'r2', routeNumber: '202', currentLat: 31.518, currentLng: 74.395, speed: 55, nextStop: 'Airport', eta: 8, occupancy: 'Low', driver: 'Kamran Ali' },
  { id: 'b4', routeId: 'r3', routeNumber: '303', currentLat: 31.555, currentLng: 74.365, speed: 30, nextStop: 'Punjab University', eta: 2, occupancy: 'Full', driver: 'Usman Shah' },
];