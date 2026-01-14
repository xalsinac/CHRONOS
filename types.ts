
export type InterventionType = 'operation' | 'coup' | 'support';

export interface Intervention {
  id: string;
  country: string;
  years: number[];
  type: InterventionType;
  description: string;
  expandedDescription: string;
  coordinates: [number, number]; // [lat, lng]
}

export interface MapState {
  center: [number, number];
  zoom: number;
}
