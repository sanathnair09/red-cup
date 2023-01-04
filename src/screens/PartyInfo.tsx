import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import {CurrentParty, User} from '../utils/types';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {MarginStyles, Size} from '../styles/Sizes';
import IconWithText from '../components/IconWithText';
import Toast from 'react-native-toast-message';
import {FlatList} from 'react-native-gesture-handler';
import AttendeeCard from '../components/AttendeeCard';
import {Colors} from '../styles/Colors';
import {FlexStyles} from '../styles/FlexStyles';

const IMAGE_HEIGHT = Size.maxHeight * 0.25;
const ICON_SIZE = Size.maxHeight * 0.08;

const PartyInfo = ({currentParty}: {currentParty: CurrentParty}) => {
  const {party, attending} = currentParty;
  // const date = dateFromString(party.date, party.time);

  // const showToast = () => {
  //   Toast.show({
  //     type: 'info',
  //     text1: 'Address is restricted to attendees',
  //     text2: 'TO CHANGE',
  //   });
  // };

  const renderAttendee = ({item}: {item: User}) => {
    return <AttendeeCard data={item} />;
  };

  return (
    <View style={FlexStyles.flex}>
      <FastImage
        source={require('/Users/sanathnair/Developer/RedCup/src/assets/uci.png')}
        style={styles.icon}
        resizeMode={FastImage.resizeMode.cover}>
        <LinearGradient
          start={{x: 0, y: 0.2}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0.1)', 'rgba(0, 0, 0, 1)']}
          style={FlexStyles.flex}
        />
      </FastImage>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* Make Icon */}
          <FastImage
            source={require('/Users/sanathnair/Developer/RedCup/src/assets/uci.png')}
            style={{
              height: ICON_SIZE,
              width: ICON_SIZE,
              borderRadius: Size.maxHeight * 0.5,
              marginRight: Size.maxWidth * 0.05,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{flex: 1}}>
            <CustomText style={styles.name}>{party.name}</CustomText>
            <CustomText style={styles.host}>{`By ${party.host}`}</CustomText>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1}}>
              {/* <IconWithText
                iconName={'calendar-outline'}
                text={`${date.toLocaleDateString('default', {
                  month: 'short',
                })} ${date.getDate()}, ${date.toLocaleTimeString('default', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}`}
              /> */}
              <IconWithText
                iconName="account-group-outline"
                text={
                  party.max !== -1
                    ? `${party.attendees.length}/${party.max}`
                    : 'Unlimited'
                }
              />
            </View>
            <View style={{flex: 1}}>
              {party.schoolRestriction ? (
                <IconWithText iconName="lock-outline" text="Private" />
              ) : (
                <IconWithText iconName="lock-open-outline" text="Public" />
              )}
              {party.paid ? (
                <IconWithText iconName="currency-usd" text="Paid" />
              ) : (
                <IconWithText iconName="currency-usd-off" text="Free" />
              )}
            </View>
          </View>
        </View>
        <View style={{marginBottom: Size.maxHeight * 0.01}}>
          {party.isLocationVisible ? (
            <IconWithText iconName="map-marker-outline" text={party.location} />
          ) : (
            <IconWithText iconName="map-marker-off-outline" text="Location" />
          )}
        </View>

        <CustomText style={{marginBottom: Size.maxHeight * 0.02}}>
          {party.description}
        </CustomText>
        <CustomText
          style={{fontSize: Size.maxHeight * 0.02, fontWeight: 'bold'}}>
          Attendees
        </CustomText>
        <FlatList data={party.attendees} renderItem={renderAttendee} />
      </View>
      <Pressable
        style={{
          backgroundColor: Colors.red,
          bottom: Size.maxHeight * 0.05,
          alignItems: 'center',
          width: Size.maxWidth * 0.96,
          height: Size.maxHeight * 0.055,
          ...MarginStyles.m2_h,
          borderRadius: Size.maxWidth * 0.03,
          justifyContent: 'center',
        }}
        onPress={() => {
          console.debug('pressed');
        }}>
        <CustomText
          style={{fontSize: Size.maxHeight * 0.03, fontWeight: 'bold'}}>
          JOIN
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: IMAGE_HEIGHT,
    width: Size.maxWidth,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    marginTop: -Size.maxHeight * 0.2,
    ...MarginStyles.m4_h,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size.maxHeight * 0.02,
  },
  name: {
    fontSize: Size.maxHeight * 0.03,
  },
  host: {
    fontSize: Size.maxHeight * 0.02,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PartyInfo;
