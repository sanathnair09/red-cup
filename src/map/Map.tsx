import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {
  // Callout,
  Circle,
  // Marker,
  MarkerDeselectEvent,
  MarkerSelectEvent,
  Region,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCurrentMarker,
  updateCurrentMarker,
  updateMapDeltas,
  updateUserLocation,
} from '../redux/slices/MapSlice';
import {AppDispatch, RootState} from '../redux/store';
import {
  DEFAULT_LAT_DELTA,
  DEFAULT_LON_DELTA,
  getPartyIdFromLatLng,
} from '../utils/lib';
import {setCurrentParty} from '../redux/slices/PartiesSlice';
import {Colors} from '../styles/Colors';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
});

export type Location = {
  id: string;
  name: string;
  address: string;
  photos: string[];
};

export default function Map() {
  const mapRef = useRef<MapView>(null);

  const dispatch = useDispatch<AppDispatch>();
  const {availableParties, attendingParties, currentParty} = useSelector(
    (state: RootState) => state.parties,
  );
  const {userCoords} = useSelector((state: RootState) => state.map);

  const renderMarkers = useCallback(() => {
    const allParties = availableParties.concat(attendingParties);
    return allParties.map(party => {
      // #TODO
      return (
        // <Marker
        //   key={party.id}
        //   coordinate={{
        //     latitude: party.latitude,
        //     longitude: party.longitude,
        //   }}
        //   title={party.name}>
        //   <Callout tooltip={true} />
        // </Marker>
        <Circle
          radius={800}
          strokeColor={Colors.red}
          strokeWidth={4}
          fillColor="rgba(255,57,66,0.5)"
          center={{latitude: party.latitude, longitude: party.longitude}}
        />
      );
    });
  }, [attendingParties, availableParties]);

  const init = useCallback(() => {
    Geolocation.getCurrentPosition(res => {
      const coord = res.coords;
      dispatch(updateUserLocation(coord));
      moveCamera(
        coord.latitude,
        coord.longitude,
        DEFAULT_LAT_DELTA,
        DEFAULT_LON_DELTA,
      );
    });
  }, [dispatch]);

  useEffect(() => {
    console.log('map init');
    init();
  }, [init]);

  useEffect(() => {
    const lat = currentParty
      ? currentParty.party.latitude
      : userCoords.latitude;
    const lon = currentParty
      ? currentParty.party.longitude
      : userCoords.longitude;
    moveCamera(lat, lon, DEFAULT_LAT_DELTA, DEFAULT_LON_DELTA); // FIX DELTAS for view
  }, [currentParty, userCoords]);

  const moveCamera = (
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
  ) => {
    mapRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
  };

  const onRegionChangeComplete = (region: Region) => {
    dispatch(updateMapDeltas([region.latitudeDelta, region.longitudeDelta]));
    // TODO update party markers visible
  };

  const onMarkerSelect = (e: MarkerSelectEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    dispatch(updateCurrentMarker(e.nativeEvent.coordinate));
    const id_attending = getPartyIdFromLatLng(
      attendingParties,
      latitude,
      longitude,
    );
    if (id_attending) {
      dispatch(setCurrentParty({id: id_attending, attending: true}));
      return;
    } else {
      const id_available = getPartyIdFromLatLng(
        availableParties,
        latitude,
        longitude,
      );
      if (id_available) {
        dispatch(setCurrentParty({id: id_available, attending: false}));
        return;
      }
    }
    // make current party visible
  };

  const onMarkerDeselect = (_: MarkerDeselectEvent) => {
    dispatch(clearCurrentMarker());
    moveCamera(
      userCoords.latitude,
      userCoords.longitude,
      DEFAULT_LAT_DELTA,
      DEFAULT_LON_DELTA,
    );
    // remove current party data
  };

  return (
    <View style={styles.contianer}>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        style={styles.mapContainer}
        showsUserLocation={true}
        userInterfaceStyle="dark"
        showsCompass={false}
        showsPointsOfInterest={false}
        onRegionChangeComplete={onRegionChangeComplete}
        onMarkerSelect={onMarkerSelect}
        onMarkerDeselect={onMarkerDeselect}>
        {renderMarkers()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
