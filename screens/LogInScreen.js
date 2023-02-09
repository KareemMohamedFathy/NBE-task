import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  Modal,
  TouchableOpacity,
  I18nManager,
  Alert,
  DevSettings,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import strings from '../components/Language/AuthNames';
import {useEffect, useState} from 'react';
import Button from '../components/ui/Button';
import AppModal from '../components/AppModal';
import {BlurView} from '@react-native-community/blur';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../counter/CounterSlice';

function LogInScreen({navigation}) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [bgColor, setbgColor] = useState('rgba(0, 0, 0, 0.6)');
  const [visible, setVisible] = useState(false);
  function setModal() {
    setVisible(true);
  }
  function isVisible() {
    setVisible(!visible);
    if (visible) {
      setbgColor('rgba(0, 0, 0, 0.6)');
    }
  }
  function gotoRegister() {
    navigation.navigate('Register');
  }
  function gotoHome() {
    navigation.navigate('Root');
  }
  function changeL() {
    dispatch(changeLanguage());
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar translucent={true} backgroundColor="transparent" /> */}
      <ImageBackground
        source={require('../assets/bankBackground.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>
        <View style={[styles.outercontainer, {backgroundColor: bgColor}]}>
          <View style={styles.innercontainer}>
            <Button
              bstyle={styles.language}
              textstyle={styles.text}
              onPress={changeL}>
              {strings.language}
            </Button>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}></Image>
          </View>
          <View style={styles.appheader}>
            <Text style={styles.header}>
              {strings.welcome} {'\n'}
            </Text>
          </View>
          <View style={[styles.form]}>
            <View
              style={[
                styles.email,
                {flexDirection: en ? 'row' : 'row-reverse'},
              ]}>
              <Image
                source={require('../assets/@.png')}
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginStart: en ? 24 : 5,
                  marginEnd: en ? 0 : 24,
                }}></Image>
              <View style={{flex: 1}}>
                <Text style={styles.label}>{strings.userName}</Text>
                <TextInput
                  style={styles.inputemail}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder={strings.userPlaceHolder}
                  placeholderTextColor={'white'}
                />
              </View>
            </View>
            <View
              style={[
                styles.password,
                {flexDirection: en ? 'row' : 'row-reverse'},
              ]}>
              <Image
                source={require('../assets/lock.png')}
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginStart: en ? 24 : 5,
                  marginEnd: en ? 0 : 24,
                }}></Image>
              <View style={{flex: 1}}>
                <Text style={[styles.label, {color: '#007236'}]}>
                  {strings.password}
                </Text>
                <TextInput
                  style={styles.inputpassword}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder={strings.passwordPlaceHolder}
                  placeholderTextColor={'black'}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: en ? 'row' : 'row-reverse',
                marginLeft: 20,
                marginTop: 15,
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text
                style={[
                  styles.label,
                  {marginStart: 0, marginTop: 0, marginEnd: 0},
                ]}>
                {strings.Rememberme}
              </Text>
              <Text
                style={{marginLeft: 'auto', color: 'white', marginRight: 25}}>
                {strings.Forgotpassword}
              </Text>
            </View>
            <View
              style={{
                flexDirection: en ? 'row' : 'row-reverse',
                marginLeft: 20,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginEnd: 16,
              }}>
              <Button
                bstyle={styles.login}
                onPress={gotoHome}
                textstyle={[
                  {textAlign: 'center', color: 'white', fontSize: 18},
                ]}>
                {strings.LogIn}
              </Button>
              <Pressable onPress={setModal} style={{}}>
                <Image
                  source={require('../assets/fingerprint.png')}
                  style={{marginStart: 'auto'}}></Image>
              </Pressable>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Pressable onPress={gotoRegister}>
                <Text style={{fontSize: 18, color: 'white'}}>
                  {strings.noAccount}{' '}
                  <Text
                    style={{color: '#F6A721', textDecorationLine: 'underline'}}>
                    {strings.signUp}
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.bbanner}>
            <View style={styles.contact}>
              <Text style={{fontSize: 16, color: '#F6A721', marginTop: 16}}>
                {' '}
                {strings.contactUs} <Text style={{color: 'white'}}>-</Text>{' '}
                {strings.faqs} <Text style={{color: 'white'}}>-</Text>{' '}
                {strings.help}
              </Text>
            </View>
            <Text style={{fontSize: 13, color: 'white', marginTop: 8}}>
              {strings.copyright}
            </Text>
          </View>
        </View>
      </ImageBackground>
      {/* {visible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      )} */}
      <View>
        <AppModal modalon={visible} onPress={isVisible}></AppModal>
      </View>
    </View>
  );
}
const statusBarHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  outercontainer: {
    flex: 10,
    paddingTop: statusBarHeight + 5,
    paddingHorizontal: 25,
  },
  start: {
    marginTop: 40,
    fontSize: 55,
  },
  absolute: {
    backgroundColor: 'rgba(28, 36, 55, 0.77)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1.0)',
  },
  backgroundImage: {
    resizeMode: 'stretch',
  },
  logo: {},
  language: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    color: '#007236',
  },
  text: {
    color: '#007236',
    fontSize: 24,

    fontWeight: '500',
  },
  innercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  appheader: {
    minHeight: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 40,
    color: 'white',
    marginTop: 'auto',
    marginBottom: 40,
    fontWeight: '700',
  },
  form: {
    flex: 1,
  },
  email: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1.5,
    flex: 1,
    minWidth: '100%',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 23,
    marginTop: 11,
  },
  inputemail: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginStart: 20,
  },
  password: {
    marginTop: 20,
    maxHeight: 65,

    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: '#007236',
    alignItems: 'center',
    margin: 0,
    backgroundColor: 'white',
  },

  inputpassword: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginStart: 20,
  },
  login: {
    backgroundColor: '#007236',
    padding: 16,
    borderRadius: 13,
    minWidth: '70%',
  },
  bbanner: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 0.45,
    marginTop: 20,
    marginHorizontal: -25,
  },
  contact: {
    flexDirection: 'row',
  },
  copyright: {
    flexDirection: 'row',
  },
});

export default LogInScreen;
