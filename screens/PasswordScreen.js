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
  }, [password]);
  const styles = useGlobalStyles();
  const {dark} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.mobileNum}>Set your password</Text>
      <Text style={styles.mobileNumEnter}>
        Enter a strong password for your online banking account
      </Text>

      <View style={styles.password}>
        <Image
          source={require('../assets/lock.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 24,
          }}></Image>
        <View>
          <Text style={[styles.label, {color: '#007236'}]}>Password</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputpassword}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Enter password"
              placeholderTextColor={!dark ? 'black' : '#B7B7B7'}
              secureTextEntry
            />
            <Image
              source={require('../assets/closeeye.png')}
              style={{
                position: 'absolute',
                top: 15,
                right: 0,
                left: '168%',
              }}></Image>
          </View>
        </View>
      </View>
      <View style={styles.password}>
        <Image
          source={require('../assets/lock.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 24,
          }}></Image>
        <View>
          <Text style={[styles.label, {color: '#B7B7B7'}]}>
            Confirm Password
          </Text>
          <TextInput
            style={styles.inputpassword}
            onChangeText={onChangeconfirmPassword}
            value={confirmPassword}
            placeholder="Re-Write your password here"
            placeholderTextColor={!dark ? 'black' : '#B7B7B7'}
            secureTextEntry
          />
          <Image
            source={require('../assets/closeeye.png')}
            style={{
              position: 'absolute',
              top: 50,
              right: 0,
              left: '95%',
            }}></Image>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {hasLowerCase && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasLowerCase && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text style={styles.passwordcheck}>Lower case letter</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {hasUpperCase && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasUpperCase && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text style={styles.passwordcheck}>Upper case letter</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {hasEight && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasEight && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text style={styles.passwordcheck}>Minimum 8 characters</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 22,
            }}>
            {hasNumber && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasNumber && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text style={styles.passwordcheck}>Number</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {hasSpecialCharacter && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasSpecialCharacter && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text style={styles.passwordcheck}>Special character</Text>
          </View>
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
const firstStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.background,
      paddingHorizontal: 25,
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

      marginLeft: 20,
    },

    label: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
      marginLeft: 23,
      marginTop: 11,
    },
    passwordcheck: {
      fontWeight: '400',
      fontSize: 16,
      color: props.colors.text,

      marginLeft: 8,
    },
  });
export default PasswordScreen;
