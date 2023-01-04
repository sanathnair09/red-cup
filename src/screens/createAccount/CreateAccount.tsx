import {StyleSheet, SafeAreaView, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import Header from '../../components/Header';
import {MarginStyles, PaddingStyles, Size} from '../../styles/Sizes';
import NextButton from '../../components/NextButton';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CustomText from '../../components/CustomText';
import PasswordCriteria from '../../components/PasswordCriteria';
import Animated, {
  FadeInUp,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {EMAIL_REGEX} from '../../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Colors} from '../../styles/Colors';

const CreateAccount = () => {
  const nav = useNavigation();
  //firebase
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  useEffect(() => {
    console.log(user?.emailVerified);
    if (user?.emailVerified) {
      Alert.alert('email is verified');
    }
  }, [user]);
  // Handle user state changes

  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // error
  const [emailErrorStatus, setEmailErrorStatus] = useState(true);
  const [passwordLength, setPasswordLength] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);

  const enabled = useDerivedValue(() => {
    return !emailErrorStatus &&
      email &&
      passwordLength &&
      upperCase &&
      lowerCase
      ? withTiming(1)
      : withTiming(0);
  }, [passwordLength, upperCase, lowerCase, emailErrorStatus, email]);

  const validateEmail = () => {
    if (EMAIL_REGEX.test(email)) {
      setEmailErrorStatus(false);
      return true;
    } else {
      setEmailErrorStatus(true);
      return false;
    }
  };

  const validatePassword = (arg: string) => {
    if (arg.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
    if (/[A-Z]/.test(arg)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    if (/[a-z]/.test(arg)) {
      setLowerCase(true);
    } else {
      setLowerCase(false);
    }
  };
  const updateState = () => {
    if (passwordLength && upperCase && lowerCase) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCreds => {
          setUser(userCreds.user);
          // userCreds.user
          //   .sendEmailVerification()
          //   .then(() => {
          //     if (userCreds.user.emailVerified) {
          //       console.log('User account created & signed in!');
          //     }
          //   })
          //   .catch(err => {
          //     console.error(err);
          //   });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
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
      <Header iconName="close-circle-outline" title="Account Setup" />
      <View style={styles.innerContainer}>
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
          textContentType="newPassword"
          value={password}
          onChangeText={text => {
            setPassword(text);
            validatePassword(text);
          }}
          // error={passwordStatus}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Animated.View
          entering={FadeInUp}
          style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View>
            <PasswordCriteria
              criteria="8 characters minimum"
              met={passwordLength}
            />
            <PasswordCriteria
              criteria="One uppercase character"
              met={upperCase}
            />
          </View>
          <View>
            <PasswordCriteria
              criteria="One lowercase character"
              met={lowerCase}
            />
          </View>
        </Animated.View>
      </View>
      <CustomText style={styles.terms}>
        Creating an account means you agree to our terms and condition and
        privacy policy
      </CustomText>
      <NextButton
        text="Create Account"
        updateState={updateState}
        enabled={enabled}
      />
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...PaddingStyles.p2_h,
  },
  innerContainer: {
    flex: 1,
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
    ...MarginStyles.m3_h,
    ...MarginStyles.m2_b,
    color: 'rgba(255,255,255,0.7)',
  },
});
