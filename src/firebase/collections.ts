import firestore from '@react-native-firebase/firestore';

export const partiesCollection = firestore().collection('parties');
export const userCollection = firestore().collection('users');
