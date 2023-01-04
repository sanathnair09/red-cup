import {StyleSheet, SafeAreaView, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import {MarginStyles, PaddingStyles, Size} from '../../styles/Sizes';
import NextButton from '../../components/NextButton';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CustomText from '../../components/CustomText';
import {useDerivedValue, withTiming} from 'react-native-reanimated';
import {EMAIL_REGEX} from '../../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Colors} from '../../styles/Colors';
import FastImage from 'react-native-fast-image';

const IMAGE_SIZE = Size.maxHeight * 0.25;

const Login = () => {
  const nav = useNavigation();

  //firebase
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  useEffect(() => {
    // console.log(user?.emailVerified);
    // if (user?.emailVerified) {
    //   Alert.alert('email is verified');
    // }
  }, [user]);
  // Handle user state changes

  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // error
  const [emailErrorStatus, setEmailErrorStatus] = useState(true);

  const enabled = useDerivedValue(() => {
    return !emailErrorStatus && password && email
      ? withTiming(1)
      : withTiming(0);
  }, [emailErrorStatus, password, email]);

  const validateEmail = () => {
    if (EMAIL_REGEX.test(email)) {
      setEmailErrorStatus(false);
      return true;
    } else {
      setEmailErrorStatus(true);
      return false;
    }
  };

  const updateState = () => {
    if (password && email) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCreds => {
          setUser(userCreds.user);
          console.log('success');
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      Toast.show({
        text1: 'Invalid Email/Password',
        text2: 'Double check your email and password',
        type: 'error',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <FastImage
          source={require('/Users/sanathnair/Developer/RedCup/src/assets/Logo.png')}
          style={styles.image}
        />
        <CustomText style={styles.text}>School Email</CustomText>

        <CustomTextInput
          leftIcon="email-outline"
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={text => {
            setEmail(text);
            validateEmail();
          }}
          error
          errorValue={emailErrorStatus}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <CustomText style={styles.text}>Password</CustomText>
        <CustomTextInput
          leftIcon="key-chain"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText style={styles.terms}>Don't have an account? </CustomText>
          <Pressable onPress={() => nav.navigate('SignUp')}>
            <CustomText style={[styles.terms, styles.clickable]}>
              Sign Up
            </CustomText>
          </Pressable>
        </View>
        <NextButton
          text="Sign In"
          updateState={updateState}
          enabled={enabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...PaddingStyles.p2_h,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 3,
    ...MarginStyles.m2,
    justifyContent: 'center',
  },
  text: {
    fontSize: Size.maxHeight * 0.02,
    fontWeight: 'bold',
    ...MarginStyles.m2_b,
    color: Colors.red,
  },
  terms: {
    fontStyle: 'italic',
    ...MarginStyles.m2_b,
    color: 'rgba(255,255,255,0.7)',
  },
  clickable: {
    color: Colors.red,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});
