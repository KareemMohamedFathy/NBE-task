import {useEffect, useLayoutEffect, useState} from 'react';
import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useMemo} from 'react/cjs/react.development';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';

function PasswordScreen({navigation}) {
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeconfirmPassword] = useState('');

  const [hasLowerCase, sethasLowerCase] = useState(false);
  const [hasUpperCase, sethasUpperCase] = useState(false);
  const [hasEight, sethasEight] = useState(false);
  const [hasNumber, sethasNumber] = useState(false);
  const [hasSpecialCharacter, sethasSpecialCharacter] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton destination={'ConfirmMobile'} />,
    });
  }, [navigation]);
  function goToConfirm() {
    if (!en) {
      sethasUpperCase(true);
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (
      !hasEight ||
      !hasLowerCase ||
      !hasSpecialCharacter ||
      !hasUpperCase ||
      !hasNumber
    ) {
      Alert.alert("You don't meet the password criteria");
    } else {
      navigation.navigate('Finished');
    }
  }
  useEffect(() => {
    sethasLowerCase(password.toUpperCase() !== password);
    sethasUpperCase(password.toLowerCase() !== password);

    sethasEight(password.length > 7);
    sethasNumber(/\d/.test(password));
    sethasSpecialCharacter(format.test(password));
    if (!en) {
      sethasUpperCase(true);

      let match = false;
      let arabicnums = '٠١٢٣٤٥٦٧٨٩';
      let count = 0;
      for (let i = 0; i < 10; i++) {
        if (password.includes(arabicnums[i])) {
          match = true;
          count++;
        }
      }
      sethasNumber(match ? true : false);
      sethasLowerCase(password.length == count ? false : true);
    }
  }, [password]);
  const styles = useGlobalStyles();
  const {dark} = useTheme();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const localThemes = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: en ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
          marginTop: 0,
        }}>
        <BackButton destination="Register" />
        <View>
          <Image
            source={
              localThemes.dark
                ? require('../assets/darklogo.png')
                : require('../assets/logogreen.png')
            }
            style={{resizeMode: 'cover'}}
          />
        </View>
      </View>
      <Text style={styles.mobileNum}>{strings.setpassword}</Text>
      <Text style={styles.mobileNumEnter}>{strings.enterpassword}</Text>

      <View
        style={[styles.password, {flexDirection: en ? 'row' : 'row-reverse'}]}>
        <Image
          source={require('../assets/lock.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginStart: en ? 20 : 0,
            marginEnd: en ? 0 : 20,
          }}></Image>
        <View
          style={{
            flex: 1,
            marginStart: en ? 20 : 0,
            marginEnd: en ? 0 : 20,
          }}>
          <Text style={[styles.label, {color: '#007236'}]}>
            {strings.password}
          </Text>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              paddingHorizontal: 8,
            }}>
            <TextInput
              style={styles.inputpassword}
              onChangeText={onChangePassword}
              value={password}
              placeholder={strings.setpassword}
              secureTextEntry
              placeholderTextColor={!dark ? 'black' : '#B7B7B7'}
            />
            <Image
              source={require('../assets/closeeye.png')}
              style={{
                position: 'absolute',
                top: 0,
                right: en ? '0%' : '0%',
              }}></Image>
          </View>
        </View>
      </View>
      <View
        style={[styles.password, {flexDirection: en ? 'row' : 'row-reverse'}]}>
        <Image
          source={require('../assets/lock.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginStart: en ? 20 : 0,
            marginEnd: en ? 0 : 20,
          }}></Image>
        <View
          style={{flex: 1, marginStart: en ? 20 : 0, marginEnd: en ? 0 : 20}}>
          <Text style={[styles.label, {color: '#B7B7B7'}]}>
            {strings.confirmpassword}
          </Text>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              paddingHorizontal: 8,
            }}>
            <TextInput
              style={[styles.inputpassword]}
              onChangeText={onChangeconfirmPassword}
              value={confirmPassword}
              placeholder={strings.setpassword}
              secureTextEntry
              placeholderTextColor={!dark ? 'black' : '#B7B7B7'}
            />
            <Image
              source={require('../assets/closeeye.png')}
              style={{marginStart: 'auto'}}></Image>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: en ? 'column' : 'column-reverse',
          marginTop: en ? 20 : 0,
        }}>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
          }}>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              alignItems: 'center',
              minWidth: '50%',
            }}>
            {hasLowerCase && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasLowerCase && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text
              style={[
                styles.passwordcheck,
                {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
              ]}>
              {strings.lowercase}
            </Text>
          </View>
          {en && (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                minWidth: '50%',
                marginStart: 20,
              }}>
              {hasUpperCase && (
                <Image source={require('../assets/filledcircle.png')}></Image>
              )}
              {!hasUpperCase && (
                <Image
                  source={require('../assets/nonfilledcircle.png')}></Image>
              )}
              <Text style={styles.passwordcheck}>{strings.uppercase}</Text>
            </View>
          )}
          {!en && (
            <View
              style={{
                flexDirection: en ? 'row' : 'row-reverse',
                minWidth: '50%',
                marginStart: 20,

                alignItems: 'center',
              }}>
              {hasSpecialCharacter && (
                <Image source={require('../assets/filledcircle.png')}></Image>
              )}
              {!hasSpecialCharacter && (
                <Image
                  source={require('../assets/nonfilledcircle.png')}></Image>
              )}
              <Text
                style={[
                  styles.passwordcheck,
                  {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
                ]}>
                {strings.specialcharacter}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',

            marginTop: en ? 12 : 0,
            marginBottom: en ? 0 : 12,
          }}>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              alignItems: 'center',
              minWidth: '50%',
            }}>
            {hasEight && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasEight && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text
              style={[
                styles.passwordcheck,
                {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
              ]}>
              {strings.min8}
            </Text>
          </View>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              alignItems: 'center',
              minWidth: '50%',
              marginStart: 20,
            }}>
            {hasNumber && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasNumber && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text
              style={[
                styles.passwordcheck,
                {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
              ]}>
              {strings.number}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {en && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {hasSpecialCharacter && (
                <Image source={require('../assets/filledcircle.png')}></Image>
              )}
              {!hasSpecialCharacter && (
                <Image
                  source={require('../assets/nonfilledcircle.png')}></Image>
              )}
              <Text style={styles.passwordcheck}>
                {strings.specialcharacter}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 25}}>
        <Button onPress={goToConfirm}>Submit</Button>
      </View>
    </View>
  );
}
function useGlobalStyles() {
  const {dark} = useTheme();
  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => firstStyles({colors}), [colors]);

  return styles;
}
const statusBarHeight = StatusBar.currentHeight;

const firstStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.background,
      paddingHorizontal: 25,
      marginTop: statusBarHeight + 5,
    },

    mobileNum: {
      fontSize: 20,
      fontWeight: '700',

      color: props.colors.text,
      marginTop: 30,
    },
    mobileNumEnter: {
      fontSize: 16,
      fontWeight: '400',
      color: '#B7B7B7',
      marginTop: 5,
    },
    password: {
      marginTop: 20,
      maxHeight: 65,

      padding: 0,
      flexDirection: 'row',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1.5,
      borderColor: '#007236',
      alignItems: 'center',
      margin: 0,
      backgroundColor: props.colors.card,
    },
    login: {
      backgroundColor: '#007236',
      padding: 16,
      borderRadius: 13,
      minWidth: '70%',
    },

    inputpassword: {
      fontSize: 16,
      fontWeight: '400',
      color: props.colors.text,
      marginStart: -10,
      marginEnd: -10,
    },

    label: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
      marginTop: 11,
    },
    passwordcheck: {
      fontWeight: '400',
      fontSize: 15,
      color: props.colors.text,

      marginLeft: 8,
    },
  });
export default PasswordScreen;
