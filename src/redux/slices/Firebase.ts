// import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
// import firestore from '@react-native-firebase/firestore';
// import {Party} from '../../utils/types';

// const partiesCollection = firestore().collection('parties');

// // Define a service using a base URL and expected endpoints
// export const firebaseAPI = createApi({
//   reducerPath: 'firebaseAPI',
//   baseQuery: fakeBaseQuery(),
//   endpoints: builder => ({
//     getPartyData: builder.query<Party | undefined, {id: string}>({
//       async queryFn(args) {
//         if (args.id !== '') {
//           const data = (await partiesCollection.doc(args.id).get()).data();
//           if (data) {
//             return data as Party;
//           }
//         }
//         return undefined;
//       },
//     }),
//     createNewParty: builder.mutation<void, {party: Party}>({
//       async queryFn(args) {
//         const {party} = args;
//         await partiesCollection.doc(party.id).set({
//           name: party.name,
//           description: party.description,
//           host: party.host,

//           image: party.image ? party.image : undefined,
//           attendees: party.attendees,
//           id: party.id,

//           latitude: party.latitude,
//           longitude: party.longitude,
//           address: party.address,
//           addressData: party.addressData,

//           start: party.start,
//           end: party.end,

//           max: party.max,
//           cost: party.cost,
//           dressCode: party.dressCode,
//           over21: party.over21,
//           schoolRestriction: party.schoolRestriction,
//         });
//       },
//     }),
//     getAllPartyIds: builder.query<string[], void>({
//       async queryFn() {
//         const partyIds: string[] = [];
//         const list = (await partiesCollection.get()).docs;
//         list.forEach(doc => {
//           partyIds.push(doc.id);
//         });
//         return partyIds;
//       },
//     }),
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const {
//   useGetPartyDataQuery,
//   useGetAllPartyIdsQuery,
//   useCreateNewPartyMutation,
// } = firebaseAPI;
