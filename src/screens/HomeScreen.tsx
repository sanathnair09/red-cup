import {Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ProfileIcon from '../components/ProfileIcon';
import {FlatList} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import {
  clearCurrentParty,
  getPartiesUserHasNotJoined,
  setCurrentParty,
} from '../redux/slices/PartiesSlice';
import {AppDispatch, RootState} from '../redux/store';
import {Size, PaddingStyles, MarginStyles} from '../styles/Sizes';
import RedCupActionButton from '../components/RedCupActionButton';
import Map from '../map/Map';
import SearchBar from '../components/SearchBar';
import PartyInfo from './PartyInfo';
import CustomText from '../components/CustomText';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import {Party} from '../utils/types';
import HandleComponent from '../components/HandleComponent';
import {FlexStyles} from '../styles/FlexStyles';

export default function MapScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const {availableParties, attendingParties, currentParty} = useSelector(
    (state: RootState) => state.parties,
  );

  const partyListModalRef = useRef<BottomSheetModal>(null);
  const partyDetailModalRef = useRef<BottomSheetModal>(null);

  const partyListModalSnapPoints = useMemo(() => ['10%', '45%', '85%'], []);
  const partyDetailModalSnapPoints = useMemo(() => ['50%', '85%'], []);

  const animatedPOIListIndex = useSharedValue<number>(1);
  const animatedPOIListPosition = useSharedValue<number>(Size.maxHeight);
  const animatedPOIDetailsIndex = useSharedValue<number>(0);
  const animatedPOIDetailsPosition = useSharedValue<number>(Size.maxHeight);

  useEffect(() => {
    dispatch(getPartiesUserHasNotJoined('0qiR5Q2D2tywILWChvDu'));
  }, [dispatch]);

  useEffect(() => {
    partyListModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (currentParty) {
      partyDetailModalRef.current?.present();
    }
  }, [currentParty]);

  const onPartyCardPress = useCallback(
    (id: string, attendingParty: boolean) => {
      dispatch(setCurrentParty({id: id, attending: attendingParty}));
      partyDetailModalRef.current?.present();
    },
    [dispatch],
  );

  // renders
  const renderPartyCard = useCallback(
    ({item}: {item: Party}) => {
      return (
        <Pressable onPress={() => onPartyCardPress(item.id, false)}>
          <Card data={item} horizontal={false} />
        </Pressable>
      );
    },
    [onPartyCardPress],
  );

  const renderPartyCardHorizontal = ({item}: {item: Party}) => {
    return (
      <Pressable onPress={() => onPartyCardPress(item.id, true)}>
        <Card data={item} horizontal />
      </Pressable>
    );
  };

  const onBackdropPress = () => {
    dispatch(clearCurrentParty());
  };

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      enableTouchThrough={true}
      // TODO
      pressBehavior={'collapse'}
      appearsOnIndex={1}
      disappearsOnIndex={0}
      opacity={0.1}
      onPress={onBackdropPress}
    />
  );

  const onDismiss = () => {
    dispatch(clearCurrentParty());
  };

  const background = () => {
    return (
      <View style={styles.background}>
        <BlurView
          blurType="light"
          blurAmount={10}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: Size.maxWidth * 0.05,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['rgba(0,0,0,0.35)', 'rgba(0, 0, 0, 0.35)']}
            style={FlexStyles.flex}
          />
        </BlurView>
      </View>
    );
  };

  const renderAvailableParties = useCallback(() => {
    return availableParties.length !== 0 ? (
      <FlatList
        data={availableParties}
        renderItem={renderPartyCard}
        style={{...StyleSheet.absoluteFillObject}}
      />
    ) : (
      <View style={styles.centeredText}>
        <CustomText style={styles.centeredTextStyle}>
          Nothing's happening
        </CustomText>
        <CustomText style={styles.centeredSubTextStyle}>
          Host a Party?
        </CustomText>
      </View>
    );
  }, [availableParties, renderPartyCard]);

  return (
    <View style={FlexStyles.flex}>
      <View style={{...StyleSheet.absoluteFillObject}}>
        <Map />
        <SafeAreaView
          // #TODO fix
          style={styles.fab}>
          <RedCupActionButton />
        </SafeAreaView>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={partyListModalRef}
            key="PartyListSheet"
            name="PartyListSheet"
            index={0}
            snapPoints={partyListModalSnapPoints}
            enableDismissOnClose={false}
            enablePanDownToClose={false}
            keyboardBehavior="extend"
            animatedPosition={animatedPOIListPosition}
            animatedIndex={animatedPOIListIndex}
            backgroundComponent={background}
            backdropComponent={renderBackdrop}
            // detached={true}
            // bottomInset={Size.maxHeight * 0.1}
            style={styles.modalDetached}
            handleComponent={HandleComponent}
            backgroundStyle={styles.modal}>
            <View style={styles.modalContainer}>
              <View style={styles.searchContainer}>
                <SearchBar />
                <ProfileIcon />
              </View>
              <View style={styles.upcoming}>
                <CustomText style={styles.listheader}>Upcoming</CustomText>
                <View style={styles.attendingPartiesContainer}>
                  {attendingParties.length !== 0 ? (
                    <FlatList
                      data={attendingParties}
                      renderItem={renderPartyCardHorizontal}
                      horizontal={true}
                      style={{
                        ...StyleSheet.absoluteFillObject,
                      }}
                    />
                  ) : (
                    <View style={styles.centeredText}>
                      <CustomText style={styles.centeredTextStyle}>
                        Your Weekend Looks Empty
                      </CustomText>
                    </View>
                  )}
                </View>
                <CustomText style={styles.listheader}>Popular</CustomText>
                <View style={styles.availablePartiesContainer}>
                  {renderAvailableParties()}
                </View>
              </View>
            </View>
          </BottomSheetModal>

          <BottomSheetModal
            ref={partyDetailModalRef}
            key="PoiDetailsSheet"
            name="PoiDetailsSheet"
            snapPoints={partyDetailModalSnapPoints}
            animatedIndex={animatedPOIDetailsIndex}
            animatedPosition={animatedPOIDetailsPosition}
            backgroundStyle={styles.modal}
            handleComponent={HandleComponent}
            onDismiss={onDismiss}>
            <PartyInfo currentParty={currentParty!} />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: Size.maxWidth,
  },
  modalDetached: {
    ...MarginStyles.m1_h,
  },
  modal: {
    backgroundColor: 'black',
  },
  modalContainer: {
    ...PaddingStyles.p2_h,
    flex: 1,
  },
  searchContainer: {flexDirection: 'row', ...MarginStyles.m3_b},
  attendingPartiesContainer: {
    flex: 1.5,
    backgroundColor: 'rgba(255,255,255,0.38)',
    // backgroundColor: Colors.coolgray,
    ...MarginStyles.m2_v,
    borderRadius: Size.maxWidth * 0.03,
  },
  availablePartiesContainer: {
    flex: 5,
    backgroundColor: 'rgba(255,255,255,0.38)',
    borderRadius: Size.maxWidth * 0.03,
    ...MarginStyles.m2_v,
  },
  listheader: {
    fontWeight: 'bold',
    fontSize: Size.maxHeight * 0.02,
  },
  centeredText: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredTextStyle: {
    fontSize: Size.maxHeight * 0.02,
    fontWeight: 'bold',
  },
  centeredSubTextStyle: {
    fontSize: Size.maxHeight * 0.02,
    // fontWeight: 'bold',
    fontStyle: 'italic',
  },
  background: {
    backgroundColor: 'rgba(125,125,125,0.4)',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    borderRadius: Size.maxWidth * 0.05,
  },
  upcoming: {...MarginStyles.m2_h, flex: 1},
});
