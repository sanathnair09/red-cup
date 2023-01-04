import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../../../components/Header';
import CustomText from '../../../components/CustomText';
import {MarginStyles, PaddingStyles, Size} from '../../../styles/Sizes';
import {Colors} from '../../../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import ReviewTime from '../../../components/ReviewTime';
import MapView, {Marker} from 'react-native-maps';
import {ZOOMED_LAT_DELTA, ZOOMED_LON_DELTA} from '../../../utils/lib';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  createNewPartyThunk,
  resetHostParty,
} from '../../../redux/slices/CreatePartySlice';
import NextButton from '../../../components/NextButton';
import {useDerivedValue, withTiming} from 'react-native-reanimated';
import {FlexStyles} from '../../../styles/FlexStyles';

const Seperator = () => {
  return <View style={styles.seperator} />;
};

export default function HostPartyReview() {
  const nav = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const newParty = useSelector((state: RootState) => state.newParty);
  const startDate = new Date(newParty.start);
  const endDate = new Date(newParty.end);

  const mapRef = useRef<MapView>(null);

  const [confirmation, setConfirmation] = useState(false);

  const enabled = useDerivedValue(() => {
    return confirmation ? withTiming(1) : withTiming(0);
  }, [confirmation]);

  const updateState = () => {
    if (confirmation) {
      dispatch(createNewPartyThunk(newParty))
        .unwrap()
        .then(() => {
          nav.navigate('Map');
          dispatch(resetHostParty());
        })
        .catch(err => {
          console.log(err);
          console.error('oh no');
        });
    } else {
      Toast.show({
        text1: 'Are you sure?',
        text2: 'Double check that everything is right',
        type: 'info',
      });
      setConfirmation(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={FlexStyles.flex}>
        <Header iconName="chevron-left-circle-outline" title="Review" />
        <View style={styles.innerContainer}>
          <CustomText style={styles.text}>{newParty.name}</CustomText>
          <CustomText>{newParty.description}</CustomText>
          <Seperator />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ReviewTime date={startDate} text="Start" />
            <ReviewTime date={endDate} text="End" />
          </View>
          <Seperator />
          <CustomText style={{...MarginStyles.m2_b}}>
            {newParty.address}
          </CustomText>
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: newParty.latitude,
              longitude: newParty.longitude,
              latitudeDelta: ZOOMED_LAT_DELTA,
              longitudeDelta: ZOOMED_LON_DELTA,
            }}
            zoomEnabled={true}
            style={styles.mapContainer}
            showsUserLocation={true}
            userInterfaceStyle="dark"
            showsCompass={false}
            showsPointsOfInterest={false}>
            <Marker
              coordinate={{
                latitude: newParty.latitude,
                longitude: newParty.longitude,
              }}
            />
          </MapView>
          <Seperator />
          <CustomText style={styles.text}>Guest Restriction</CustomText>
          <CustomText style={styles.restrictionText}>{`Age: ${
            newParty.over21 ? '21+' : '18+'
          }`}</CustomText>
          <CustomText style={styles.restrictionText}>{`Dresscode: ${
            newParty.dressCode ? newParty.dressCode : 'N/A'
          }`}</CustomText>
          <CustomText style={styles.restrictionText}>{`Cost: ${
            newParty.cost !== -1 ? '$' + newParty.cost.toString() : 'Free'
          }`}</CustomText>

          <CustomText style={styles.restrictionText}>{`Guest Limit: ${
            newParty.max !== -1 ? newParty.max : 'Unlimited'
          }`}</CustomText>
          <CustomText style={styles.restrictionText}>{`School Restriction: ${
            newParty.schoolRestriction ? 'Yes' : 'No'
          }`}</CustomText>
        </View>
      </View>
      <NextButton text="Create" updateState={updateState} enabled={enabled} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...MarginStyles.m2_h,
    ...PaddingStyles.p2,
  },
  text: {
    fontSize: Size.maxHeight * 0.02,
    fontWeight: 'bold',
    ...MarginStyles.m2_b,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.coolgray,
    borderRadius: Size.maxHeight * 0.02,
    marginBottom: Size.maxHeight * 0.02,
    ...PaddingStyles.p3,
  },
  seperator: {
    backgroundColor: 'white',
    height: Size.maxHeight * 0.002,
    ...MarginStyles.m3_v,
  },
  mapContainer: {
    // flex: 1,
    height: Size.maxHeight * 0.3,
    borderRadius: Size.maxWidth * 0.05,
  },
  restrictionText: {
    ...MarginStyles.m1_b,
  },
  button: {
    backgroundColor: Colors.red,
    alignSelf: 'center',
    alignItems: 'center',
    width: Size.maxWidth * 0.9,
    height: Size.maxHeight * 0.055,
    borderRadius: Size.maxWidth * 0.03,
    justifyContent: 'center',
  },
});
