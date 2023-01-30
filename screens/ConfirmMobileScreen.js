import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../mythemes/MyDarkTheme';
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
} from 'react-native';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import VerifyText from '../components/ui/VerifyText';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';

function ConfirmMobileScreen({navigation, route}) {
  const {mobileNum} = route.params ? route.params : '';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton destination={'Register'} />,
    });
  }, [navigation]);
  function goToPassword() {
    navigation.navigate('Password');
  }
  const styles = useGlobalStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.mobileNum}>Verification</Text>
      <Text style={styles.mobileNumEnter}>
        Enter 5 digit code we sent to {mobileNum}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <VerifyText />
        <VerifyText />
        <VerifyText />
        <VerifyText />
        <VerifyText />
      </View>
      <Text style={styles.mobileNumEnter}>Didn’t receive the code?</Text>
      <Text style={[styles.mobileNum, {marginTop: 5}]}>
        Request new one in 00:12
      </Text>

      <View
        style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 25}}>
        <Button onPress={goToPassword}>Submit</Button>
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
      backgroundColor: props.colors.backgroundColor,
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

    login: {
      backgroundColor: '#007236',
      padding: 16,
      borderRadius: 13,
      minWidth: '70%',
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
      marginLeft: 23,
      marginTop: 11,
    },
    footer: {
      marginTop: 25,
      fontWeight: '400',
      fontSize: 14,
      color: '#808080',
    },
    specialfooter: {
      fontWeight: '700',
      color: 'black',
    },
  });
export default ConfirmMobileScreen;
