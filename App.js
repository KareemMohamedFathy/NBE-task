import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';

import {NavigationContainer, useTheme} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './screens/LogInScreen';
import FinishScreen from './screens/FinishScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConfirmMobileScreen from './screens/ConfirmMobileScreen';
import PasswordScreen from './screens/PasswordScreen';
import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import MyDarkTheme from './mythemes/MyDarkTheme';
import MyDefaultTheme from './mythemes/MyDefaultTheme';
import HomeScreen from './screens/HomeScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TransferScreen from './screens/TransferScreen';
import BeneficiariesScreen from './screens/BeneficiariesScreen';
import AirPayScreen from './screens/AirPayScreen';
import AtmScreen from './screens/AtmScreen';
import CardsScreen from './screens/CardsScreen';
import Button from './components/ui/Button';
import {Switch} from 'react-native-gesture-handler';
import {store} from './store';
import strings from './components/Language/AuthNames';
import {changeLanguage} from './counter/CounterSlice';
const Drawer = createDrawerNavigator();

function App() {
  const Tab = createBottomTabNavigator();

  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const HomeStack = createNativeStackNavigator();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  const dark = scheme === 'dark';

  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  function myIcons(focused, color, size, path) {
    return (
      <View
        style={{
          backgroundColor: !focused
            ? 'rgba(0,114,54, 0.2)'
            : 'rgba(0,114,54, 0.1)',
          padding: 10,
          borderRadius: 10,
        }}>
        <View style={{opacity: 1.0}}>
          <Image
            source={path}
            resizeMode="contain"
            style={{
              tintColor: !focused ? 'white' : '#007236',
            }}
          />
        </View>
      </View>
    );
  }
  function MyTabs() {
    const currentL = useSelector(state => state.counter.value);
    const en = currentL === 'en';

    return (
      <Tab.Navigator
        id="bottombar"
        initialRouteName={strings.home}
        screenOptions={{
          tabBarStyle: {
            height: 80,

            backgroundColor: dark ? '#151A21' : '#FFFFFF',
          },
          tabBarItemStyle: {
            backgroundColor: dark ? '#202933' : '#F1F3FB',
            margin: 3,
            borderRadius: 22,
          },

          tabBarLabelStyle: {
            textAlign: 'center',
            marginBottom: 8,
            color: '#FFFFFF',
            fontSize: 11,
          },
        }}>
        <Tab.Screen
          name={strings.home}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./assets/Home/home.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={strings.transfer}
          component={TransferScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/transfers.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={strings.beneficiaries}
          component={BeneficiariesScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/Beneficiaries.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={strings.atms}
          component={AtmScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/atms.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={strings.airpay}
          component={AirPayScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/airpay.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  function MyARTabs() {
    const currentL = useSelector(state => state.counter.value);
    const en = currentL === 'en';

    return (
      <Tab.Navigator
        id="bottombar"
        initialRouteName={strings.home}
        screenOptions={{
          tabBarStyle: {
            height: 80,

            backgroundColor: dark ? '#151A21' : '#FFFFFF',
          },
          tabBarItemStyle: {
            backgroundColor: dark ? '#202933' : '#F1F3FB',
            margin: 3,
            borderRadius: 22,
          },

          tabBarLabelStyle: {
            textAlign: 'center',
            marginBottom: 8,
            color: '#FFFFFF',
            fontSize: 11,
          },
        }}>
        <Tab.Screen
          name={strings.airpay}
          component={AirPayScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/airpay.png')}
                style={styles.logo}></Image>
            ),
          }}
        />

        <Tab.Screen
          name={strings.atms}
          component={AtmScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/atms.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
        <Tab.Screen
          name={strings.beneficiaries}
          component={BeneficiariesScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/Beneficiaries.png')}
                style={styles.logo}></Image>
            ),
          }}
        />

        <Tab.Screen
          name={strings.transfer}
          component={TransferScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require('./assets/Home/transfers.png')}
                style={styles.logo}></Image>
            ),
          }}
        />

        <Tab.Screen
          name={strings.home}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./assets/Home/home.png')}
                style={styles.logo}></Image>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  function Home() {
    return (
      <HomeStack.Navigator id="test">
        <Stack.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.cards}
          component={CardsScreen}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  }
  function changeL() {}
  // We only want to recompute the stylesheet on changes incolor.
  const CustomDrawerContent = props => {
    const currentL = useSelector(state => state.counter.value);
    const en = currentL === 'en';
    const dispatch = useDispatch();

    console.log(currentL);

    return (
      <>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              source={
                dark
                  ? require('./assets/darklogo.png')
                  : require('./assets/logogreen.png')
              }
              style={{resizeMode: 'cover'}}
            />
            <Button
              bstyle={{
                backgroundColor: '#FFFFFF',
                padding: 8,
                borderRadius: 10,
                color: '#007236',
              }}
              textstyle={{
                color: '#007236',
                fontSize: 20,

                fontWeight: '500',
              }}
              onPress={() => dispatch(changeLanguage())}>
              {strings.language}
            </Button>
          </View>
          <DrawerItemList {...props} />
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              justifyContent: 'space-between',
            }}>
            <DrawerItem
              style={{flex: 5}}
              label={({focused, color, size}) => (
                <View
                  style={{
                    flexDirection: en ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    marginStart: !en ? -32 : 0,
                  }}>
                  {myIcons(
                    focused,
                    color,
                    size,
                    (path = require('./assets/drawer/darkmode.png')),
                  )}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      marginEnd: en ? 0 : 8,
                      marginStart: en ? 8 : 0,
                      color: focused ? '#007236' : '#FFFFFF',
                    }}>
                    {strings.darkmode}
                  </Text>
                </View>
              )}
            />
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{marginHorizontal: 25}}
            />
          </View>
        </DrawerContentScrollView>
        <View>
          <DrawerItem
            label={({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  marginStart: !en ? -32 : 0,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: dark
                      ? 'rgba(255, 0, 0, 0.2);'
                      : '#E1072133)',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{opacity: 1.0}}>
                    <Image
                      source={require('./assets/drawer/logout.png')}
                      resizeMode="contain"
                      style={{
                        tintColor: !focused ? '#FF0000' : '#FF0000',
                      }}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#FF0000',
                    marginStart: en ? 5 : 0,
                    marginEnd: en ? 0 : 5,
                  }}>
                  {strings.logout}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',

            marginHorizontal: 10,
            paddingVertical: 25,
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 29,
            marginBottom: 20,
            marginTop: 15,
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}>
          <Image
            source={require('./assets/drawer/user.png')}
            resizeMode="contain"
            style={{marginStart: en ? 13 : 0, marginEnd: en ? 0 : 13}}
          />

          <View style={{marginStart: en ? 8 : 0, marginEnd: en ? 0 : 8}}>
            <Text style={{color: '#FFFFFF', marginBottom: 2, fontSize: 18}}>
              Ahmad Sami
            </Text>
            <Text style={{color: '#BABABA', fontSize: 14}}>
              +20 101 131 5412
            </Text>
          </View>
          <Image
            source={require('./assets/drawer/options.png')}
            resizeMode="contain"
            style={{marginStart: 'auto', marginEnd: 25, paddingHorizontal: 20}}
          />
        </View>
      </>
    );
  };

  function Root() {
    const currentL = useSelector(state => state.counter.value);
    console.log(currentL);
    const en = currentL === 'en';

    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerPosition: en ? 'left' : 'right',
          drawerActiveBackgroundColor: dark ? '#FFFFFF' : '#007236',
          drawerActiveTintColor: '#007236',
          drawerItemStyle: {
            borderRadius: 16,
          },
          drawerLabelStyle: {
            fontSize: 18,
            fontWeight: '500',
            marginStart: -22,
            marginEnd: -22,
          },

          drawerStyle: {
            backgroundColor: dark ? 'rgba(0, 50, 24, 1)' : '#F1F3FB',
            width: '80%',
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          },
        }}>
        <Drawer.Screen
          name={strings.accountsummary}
          component={en ? MyTabs : MyARTabs}
          options={{
            headerShown: false,
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/summary.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.accountsummary}
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name={strings.certificates}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/certificates.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.certificates}
                </Text>
              </View>
            ),
          }}
        />

        <Drawer.Screen
          name={strings.payment}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/payment.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.payment}
                </Text>
              </View>
            ),
          }}
        />

        <Drawer.Screen
          name={strings.cardservices}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/cards.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.cardservices}
                </Text>
              </View>
            ),
          }}
        />

        <Drawer.Screen
          name={strings.hardtoken}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/hard.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.hardtoken}
                </Text>
              </View>
            ),
          }}
        />

        <Drawer.Screen
          name={strings.offers}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/offers.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.offers}
                </Text>
              </View>
            ),
          }}
        />

        <Drawer.Screen
          name={strings.customerservice}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/customer.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.customerservice}
                </Text>
              </View>
            ),
          }}
        />

        <Drawer.Screen
          name={strings.calculators}
          component={TransferScreen}
          options={{
            drawerLabel: ({focused, color, size}) => (
              <View
                style={{
                  flexDirection: en ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginStart: !en ? -32 : 0,
                }}>
                {myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/calculators.png')),
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginEnd: en ? 0 : 8,
                    marginStart: en ? 8 : 0,
                    color: focused ? '#007236' : '#FFFFFF',
                  }}>
                  {strings.calculators}
                </Text>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer
        theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Finished"
            component={FinishScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ConfirmMobile"
            component={ConfirmMobileScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Password"
            component={PasswordScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  logo: {
    tintColor: '#B7B7B7',
  },
});

export default App;
