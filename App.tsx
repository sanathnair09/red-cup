import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from './src/styles/Colors';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MapScreen from './src/screens/HomeScreen';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HostPartyInformation from './src/screens/fabscreens/host/HostPartyInformation';
import ManageScreen from './src/screens/fabscreens/ManageScreen';
import NotificationScreen from './src/screens/fabscreens/NotificationScreen';
import HostPartyLocation from './src/screens/fabscreens/host/HostPartyLocation';
import HostPartyRestriction from './src/screens/fabscreens/host/HostPartyRestrictions';
import HostPartyReview from './src/screens/fabscreens/host/HostPartyReview';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import 'react-native-get-random-values';
import CreateAccount from './src/screens/createAccount/CreateAccount';
import CreateAccountProfile from './src/screens/createAccount/CreateAccountProfile';
import Login from './src/screens/login/Login';
import {FlexStyles} from './src/styles/FlexStyles';
DropDownPicker.setTheme('DARK');

const Stack = createNativeStackNavigator();
const ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{backgroundColor: Colors.coolgray, borderLeftColor: Colors.succes}}
      text1Style={styles.white}
      text2Style={styles.white}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{backgroundColor: Colors.coolgray, borderLeftColor: Colors.red}}
      text1Style={styles.white}
      text2Style={styles.white}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      style={{backgroundColor: Colors.coolgray, borderLeftColor: Colors.red}}
      text1Style={styles.white}
      text2Style={styles.white}
    />
  ),
};
const App = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const {loggedIn} = useSelector((state: RootState) => state.authentication);
  // useEffect(() => {
  //   requestLocationPermissions();
  // });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={FlexStyles.flex}>
          <NavigationContainer theme={{...DarkTheme}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {/* testing */}
              {false ? (
                <>
                  <Stack.Screen name="Map" component={MapScreen} />
                  <Stack.Group>
                    <Stack.Screen
                      name="HostInformation"
                      component={HostPartyInformation}
                    />
                    <Stack.Screen
                      name="HostLocation"
                      component={HostPartyLocation}
                    />
                    <Stack.Screen
                      name="HostRestrictions"
                      component={HostPartyRestriction}
                    />
                    <Stack.Screen
                      name="HostReview"
                      component={HostPartyReview}
                    />
                  </Stack.Group>
                  <Stack.Screen
                    name="Notifications"
                    component={NotificationScreen}
                  />
                  <Stack.Screen name="Manage" component={ManageScreen} />
                </>
              ) : (
                <>
                  <Stack.Group>
                    <Stack.Screen name="Login" component={Login} />
                  </Stack.Group>
                  <Stack.Group>
                    <Stack.Screen name="SignUp" component={CreateAccount} />
                    <Stack.Screen
                      name="AddlInfo"
                      component={CreateAccountProfile}
                    />
                  </Stack.Group>
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        <Toast position="top" config={ToastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  white: {
    color: 'white',
  },
});

export default App;
