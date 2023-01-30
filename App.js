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
const Drawer = createDrawerNavigator();

function App() {
  const Tab = createBottomTabNavigator();

  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const HomeStack = createNativeStackNavigator();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log(isEnabled + 'hayos');
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
    return (
      <Tab.Navigator
        id="bottombar"
        initialRouteName="Home"
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
          name="Home"
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
          name="Transfer"
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
          name="Beneficiaries"
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
          name="Atms"
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
          name="AirPay"
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
  function Home() {
    return (
      <HomeStack.Navigator id="test">
        <Stack.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cards"
          component={CardsScreen}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  }
  // We only want to recompute the stylesheet on changes incolor.
  const CustomDrawerContent = props => {
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
              }}>
              EN
            </Button>
          </View>
          <DrawerItemList {...props} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <DrawerItem
              style={{flex: 5}}
              icon={({focused, color, size}) =>
                myIcons(
                  focused,
                  color,
                  size,
                  (path = require('./assets/drawer/darkmode.png')),
                )
              }
              labelStyle={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: -22,
                marginRight: -32,
              }}
              label="Dark Mode"
            />
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{marginRight: 25}}
            />
          </View>
        </DrawerContentScrollView>
        <View>
          <DrawerItem
            icon={({focused, color, size}) => (
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
            )}
            labelStyle={{
              fontSize: 16,
              fontWeight: '500',
              marginLeft: -22,
              marginRight: -32,
              color: '#FF0000',
            }}
            label="LogOut"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
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
            style={{marginStart: 13}}
          />

          <View style={{marginStart: 8}}>
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
            style={{marginStart: 'auto', marginEnd: 25}}
          />
        </View>
      </>
    );
  };

  function Root() {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: dark ? '#FFFFFF' : '#007236',
          drawerActiveTintColor: '#007236',
          drawerItemStyle: {
            borderRadius: 16,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '500',
            marginLeft: -22,
            marginRight: -32,
          },

          drawerStyle: {
            backgroundColor: dark ? 'rgba(0, 50, 24, 1)' : '#F1F3FB',
            width: '80%',
          },
        }}>
        <Drawer.Screen
          name="Account Summary"
          component={MyTabs}
          options={{
            headerShown: false,
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/summary.png')),
              ),
          }}
        />
        <Drawer.Screen
          name="Open Certificates & Deposits"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/certificates.png')),
              ),
          }}
        />

        <Drawer.Screen
          name="Payement Services"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/payment.png')),
              ),
          }}
        />

        <Drawer.Screen
          name="Cards Services"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/cards.png')),
              ),
          }}
        />

        <Drawer.Screen
          name="Hard Token"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/hard.png')),
              ),
          }}
        />

        <Drawer.Screen
          name="Offers"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/offers.png')),
              ),
          }}
        />

        <Drawer.Screen
          name="Customer Services"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/customer.png')),
              ),
          }}
        />

        <Drawer.Screen
          name="Calculators"
          component={TransferScreen}
          options={{
            drawerIcon: ({focused, color, size}) =>
              myIcons(
                focused,
                color,
                size,
                (path = require('./assets/drawer/calculators.png')),
              ),
          }}
        />
      </Drawer.Navigator>
    );
  }
  return (
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
          options={{
            headerRight: () => (
              <Image
                source={
                  dark
                    ? require('./assets/darklogo.png')
                    : require('./assets/logogreen.png')
                }
                style={{resizeMode: 'cover'}}
              />
            ),
            headerStyle: {
              backgroundColor: colors.background,
            },

            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="ConfirmMobile"
          component={ConfirmMobileScreen}
          options={{
            headerRight: () => (
              <Image
                source={
                  dark
                    ? require('./assets/darklogo.png')
                    : require('./assets/logogreen.png')
                }
                style={{resizeMode: 'cover'}}
              />
            ),
            headerStyle: {
              backgroundColor: colors.background,
            },

            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{
            headerRight: () => (
              <Image
                source={
                  dark
                    ? require('./assets/darklogo.png')
                    : require('./assets/logogreen.png')
                }
                style={{resizeMode: 'cover'}}
              />
            ),
            headerStyle: {
              backgroundColor: colors.background,
            },

            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  logo: {
    tintColor: '#B7B7B7',
  },
});

export default App;
