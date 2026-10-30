export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
}

export interface BusRoute {
  id: string;
  name: string;
  number: string;
  color: string;
  stops: BusStop[];
  frequency: number; // minutes
}

export interface LiveBus {
  id: string;
  routeId: string;
  routeNumber: string;
  currentLat: number;
  currentLng: number;
  speed: number;
  nextStop: string;
  eta: number; // minutes
  occupancy: 'Low' | 'Medium' | 'High' | 'Full';
  driver: string;
}

export interface ETAInfo {
  busId: string;
  routeNumber: string;
  eta: number;
  occupancy: LiveBus['occupancy'];
}