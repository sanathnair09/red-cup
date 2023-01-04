import {Coord, CurrentParty, Party} from './types';
import {v4 as uuidv4} from 'uuid';
import {LOREUM} from './Constants';

export const DEFAULT_LAT_DELTA = 2 / 70;
export const DEFAULT_LON_DELTA = 2 / 70;
export const ZOOMED_LAT_DELTA = 2 / 100; // 150 also works
export const ZOOMED_LON_DELTA = 2 / 100;

const radians = function (degrees: number) {
  return (degrees * Math.PI) / 180;
};

export const calculateDistanceBetweenCoords = (
  coord1: Coord,
  coord2: Coord,
) => {
  const dlat = radians(coord2.latitude - coord1.latitude);
  const dlon = radians(coord2.longitude - coord1.longitude);
  const alat = radians((coord1.latitude + coord2.latitude) / 2);
  const R = 3958.8;
  const x = dlon * Math.cos(alat);
  const d = Math.sqrt(Math.pow(x, 2) + Math.pow(dlat, 2)) * R;
  return d;
};

export const generateMockData = () => {
  const centerLatitude = 37.785834;
  const centerLongitutde = -122.406417;
  const parties: Party[] = [];
  let x = 0;
  while (x < 10) {
    const party: Party = {
      name: `Party ${x}`,
      description: LOREUM,
      host: `Host ${x}`,

      image: undefined,
      attendees: [],
      id: uuidv4(),

      latitude: Math.random() / 70 + centerLatitude,
      longitude:
        x % 2 === 0
          ? Math.random() / 70 + centerLongitutde
          : Math.random() / 70 - centerLongitutde,
      address: '',
      addressData: undefined,

      start: new Date().toUTCString(),
      end: new Date().toUTCString(),

      max: Math.random() * 100,
      cost: -1,
      dressCode: '',
      over21: false,
      schoolRestriction: false,
    };
    parties.push(party);
    x++;
  }
  return parties;
};

export const getPartyIdFromLatLng = (
  parties: Party[],
  latitude: number,
  longitude: number,
) => {
  for (const party of parties) {
    if (party.latitude === latitude && party.longitude === longitude) {
      return party.id;
    }
  }
};

export const findPartyInfo = (
  parties: string[],
  attending: string[],
  id: string,
): CurrentParty | undefined => {
  for (const party of parties) {
    if (party === id) {
      if (attending.length !== 0) {
        for (const attendingParty of attending) {
          if (attendingParty.id === id) {
            return {party: party, attending: true};
          } else {
            return {party: party, attending: false};
          }
        }
      } else {
        return {party: party, attending: false};
      }
    }
  }
};

export const dateFromString = (date: string, time: string) => {
  const [month, day, year] = date.split('/');
  const [hour, minute] = time.split(':');
  return new Date(+year, +month - 1, +day, +hour, +minute);
};
