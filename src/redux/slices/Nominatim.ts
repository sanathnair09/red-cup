import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Nominatim} from '../../utils/types';

// Define a service using a base URL and expected endpoints
export const nominatimAPI = createApi({
  reducerPath: 'nominatimAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nominatim.openstreetmap.org',
  }),
  endpoints: builder => ({
    searchLocation: builder.query<
      Nominatim[],
      {location: string; conutry: string; state: string}
    >({
      query: arg => {
        return {
          url: `/search?format=json&q=${
            arg.location + ',' + arg.state + ',' + arg.conutry
          }`,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useSearchLocationQuery} = nominatimAPI;
