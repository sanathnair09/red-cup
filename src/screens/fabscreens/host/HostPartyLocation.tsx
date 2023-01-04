import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import CustomText from '../../../components/CustomText';
import {MarginStyles, PaddingStyles, Size} from '../../../styles/Sizes';
import {Colors} from '../../../styles/Colors';
import {useSearchLocationQuery} from '../../../redux/slices/Nominatim';
import DropDownPicker from 'react-native-dropdown-picker';
import {Coord, Nominatim} from '../../../utils/types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import MapView, {Marker} from 'react-native-maps';
import {ZOOMED_LAT_DELTA, ZOOMED_LON_DELTA} from '../../../utils/lib';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {updateLocationAndTime} from '../../../redux/slices/CreatePartySlice';
import NextButton from '../../../components/NextButton';
import {runOnJS, useDerivedValue, withTiming} from 'react-native-reanimated';
import {FlexStyles} from '../../../styles/FlexStyles';

export default function HostPartyLocation() {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigation();

  const {school, state, country} = useSelector(
    (appState: RootState) => appState.user,
  );
  const userCoords = useSelector(
    (appState: RootState) => appState.map.userCoords,
  );
  const {addressData, address, start, end, latitude, longitude} = useSelector(
    (appState: RootState) => appState.newParty,
  );

  const [location, setLocation] = useState(school);

  // picker options
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(address); // (STATE) address
  const [items, setItems] = useState<any[]>([]);

  // state vars
  const [addressDataLocal, setAddressDataLocal] = useState<
    Nominatim | undefined
  >(addressData);
  const [startDateAndTime, setStartDateAndTime] = useState<Date>(
    start ? new Date(start) : new Date(),
  );
  const [endDateAndTime, setEndDateAndTime] = useState<Date>(
    end ? new Date(end) : new Date(),
  );

  // status vars
  const [valueStatus, setValueStatus] = useState(false);
  const [timeStatus, setTimeStatus] = useState(false);

  const {data, refetch, isFetching} = useSearchLocationQuery({
    location: location,
    state: state,
    conutry: country,
  });

  useEffect(() => {
    if (data) {
      const newData = [];
      for (var x = 0; x < data.length; x++) {
        var obj = {display_name: ''};
        obj.display_name = data[x].display_name;
        newData.push(obj);
      }
      setItems(newData);
    }
  }, [data]);

  //map stuff
  const [marker, setMarker] = useState<Coord | null>(null);

  useEffect(() => {
    moveCamera(
      latitude !== 0 ? latitude : userCoords.latitude,
      longitude !== 0 ? longitude : userCoords.longitude,
      ZOOMED_LAT_DELTA,
      ZOOMED_LON_DELTA,
    );
  }, [latitude, longitude, userCoords]);
  useEffect(() => {
    if (value && data) {
      for (var x = 0; x < data.length; ++x) {
        if (data[x].display_name === value) {
          setAddressDataLocal(data[x]);
          setMarker({
            latitude: parseFloat(data[x].lat),
            longitude: parseFloat(data[x].lon),
          });
          moveCamera(
            parseFloat(data[x].lat),
            parseFloat(data[x].lon),
            ZOOMED_LAT_DELTA,
            ZOOMED_LON_DELTA,
          );
        }
      }
    }
  }, [value, data]);
  const mapRef = useRef<MapView>(null);

  const moveCamera = (
    lat: number,
    lon: number,
    latitudeDelta: number,
    longitudeDelta: number,
  ) => {
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lon,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
  };
  const validateTime = useCallback(
    () => () => {
      if (startDateAndTime >= endDateAndTime) {
        setTimeStatus(true);
      } else {
        setTimeStatus(false);
      }
      return (
        startDateAndTime && endDateAndTime && startDateAndTime < endDateAndTime
      );
    },
    [startDateAndTime, endDateAndTime],
  );
  const enabled = useDerivedValue(() => {
    return value && addressDataLocal && runOnJS(validateTime)
      ? withTiming(1)
      : withTiming(0);
  }, [value, addressDataLocal, validateTime]);

  const updateState = () => {
    if (value && addressDataLocal) {
      setValueStatus(false);
      if (validateTime()) {
        dispatch(
          updateLocationAndTime({
            nominatim: addressDataLocal,
            start: startDateAndTime.toUTCString(),
            end: endDateAndTime.toUTCString(),
          }),
        );
        nav.navigate('HostRestrictions');
      } else {
        Toast.show({
          text1: 'Invalid Start or End Time',
          text2: 'Make sure your end time is after your start time',
          type: 'error',
        });
      }
    } else {
      setValueStatus(true);
      if (validateTime()) {
        Toast.show({
          text1: 'Missing address',
          text2: 'Make sure you add a location',
          type: 'error',
        });
      } else {
        Toast.show({
          text1: 'Please fill in all the fields',
          text2: "Make sure you choose your party's location and time",
          type: 'error',
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={FlexStyles.flex}>
        <Header iconName="chevron-left-circle-outline" title="Location" />
        <CustomText style={styles.text}>Address</CustomText>
        <DropDownPicker
          schema={{
            label: 'display_name',
            value: 'display_name',
          }}
          open={open}
          value={value as any}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          loading={isFetching}
          activityIndicatorColor={'white'}
          disableLocalSearch
          searchable
          onChangeSearchText={text => {
            setLocation(text);
            refetch();
          }}
          searchPlaceholder="Search . . ."
          searchPlaceholderTextColor="white"
          textStyle={{fontFamily: 'Urbanist', color: 'white'}}
          searchTextInputStyle={{borderColor: 'white'}}
          searchContainerStyle={{borderBottomColor: 'white'}}
          style={valueStatus ? {borderColor: Colors.red} : null}
        />
        <CustomText style={styles.text}>Map</CustomText>
        <MapView
          ref={mapRef}
          zoomEnabled={true}
          style={styles.mapContainer}
          showsUserLocation={true}
          userInterfaceStyle="dark"
          showsCompass={false}
          showsPointsOfInterest={false}>
          {marker ? (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          ) : null}
        </MapView>
        <CustomText style={styles.text}>Time</CustomText>
        <View style={timeStatus ? styles.dateError : null}>
          <View style={[styles.dateContainer]}>
            <CustomText style={{fontSize: Size.maxHeight * 0.02}}>
              Start
            </CustomText>
            <RNDateTimePicker
              value={startDateAndTime}
              onChange={event => {
                setStartDateAndTime(new Date(event.nativeEvent.timestamp!));
              }}
              mode="datetime"
              accentColor={Colors.red}
            />
          </View>
          <View style={[styles.dateContainer]}>
            <CustomText style={{fontSize: Size.maxHeight * 0.02}}>
              End
            </CustomText>
            <RNDateTimePicker
              value={endDateAndTime}
              onChange={event => {
                setEndDateAndTime(new Date(event.nativeEvent.timestamp!));
              }}
              mode="datetime"
              accentColor={Colors.red}
            />
          </View>
        </View>
      </View>
      <NextButton text="Next" updateState={updateState} enabled={enabled} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...MarginStyles.m3_h,
    ...PaddingStyles.p2,
  },
  text: {
    fontSize: Size.maxHeight * 0.02,
    fontWeight: 'bold',
    ...MarginStyles.m2_v,
  },
  mapContainer: {
    // flex: 1,
    height: Size.maxHeight * 0.3,
    borderRadius: Size.maxWidth * 0.05,
    ...MarginStyles.m2_b,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...MarginStyles.m1_v,
    ...PaddingStyles.p2,
  },
  dateError: {
    borderColor: Colors.red,
    borderWidth: 2,
    borderRadius: Size.maxWidth * 0.02,
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
