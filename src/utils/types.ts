export type Coord = {
  latitude: number;
  longitude: number;
};

export type User = {
  name: string;
  school: string;
  state: string;
  country: string;
  attending: string[];
};

export type Party = {
  name: string;
  description: string;
  host: string;

  image?: string;
  attendees: string[];
  id: string;

  latitude: number;
  longitude: number;
  address: string;
  addressData?: Nominatim;

  start: string;
  end: string;

  max: number;
  cost: number;
  dressCode: string;
  over21: boolean;
  schoolRestriction: boolean;
};

export type CurrentParty = {
  party: Party;
  attending: boolean;
};

export type Nominatim = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
};
