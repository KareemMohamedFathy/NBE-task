import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
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
import {useMemo} from 'react/cjs/react.development';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';

function RegisterScreen({navigation}) {
  const localThemes = useTheme();
  const [mobile, onChangeMobile] = useState('');
  const styles = useGlobalStyles();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton destination={'LogIn'} />,
    });
  }, [navigation]);
  function goToConfirm() {
    navigation.navigate('ConfirmMobile', {
      mobileNum: mobile,
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.mobileNum}>Mobile number</Text>
      <Text style={styles.mobileNumEnter}>
        Enter the mobile number registred in the bank
      </Text>

      <View style={styles.password}>
        <Image
          source={require('../assets/mobile.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 24,
          }}></Image>
        <View>
          <Text style={[styles.label, {color: '#007236'}]}>Mobile Number</Text>
          <TextInput
            style={styles.inputpassword}
            onChangeText={onChangeMobile}
            value={mobile}
            placeholder="+20 101 131 5412"
            placeholderTextColor={localThemes.colors.text}
            keyboardType={'phone-pad'}
          />
        </View>
      </View>
      <View
        style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 25}}>
        <Button onPress={goToConfirm}>Next</Button>
        <Text style={styles.footer}>
          By signing up, you agree to our
          <Text style={styles.specialfooter}> Terms of Service</Text> and
          acknowledge that you have read our
          <Text style={styles.specialfooter}> Privacy Policy</Text>.
        </Text>
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
    password: {
      marginTop: 20,
      maxHeight: 65,

      padding: 0,
      backgroundColor: props.colors.backgroundColor,
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
      backgroundColor: props.colors.backgroundColor,
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
    footer: {
      marginTop: 25,
      fontWeight: '400',
      fontSize: 14,
      color: '#808080',
    },
    specialfooter: {
      fontWeight: '700',
      color: props.colors.text,
    },
  });
export default RegisterScreen;
