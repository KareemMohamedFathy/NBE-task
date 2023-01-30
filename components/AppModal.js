import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import {useState} from 'react';
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
import Modal from 'react-native-modal';
import Button from './ui/Button';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';

function AppModal(props) {
  const a = props.modalon;
  const styles = useGlobalStyles();
  const localThemes = useTheme();

  return (
    <Modal
      transparent={true}
      visible={props.modalon}
      statusBarTranslucent={true}
      onBackdropPress={props.onPress}
      style={{margin: 0}}>
      <View style={{backgroundColor: 'rgba(28, 36, 55, 0.77)', flex: 1}}></View>
      <View style={styles.container}>
        <Text style={styles.header}>Fingerprint for NBE Mobile</Text>
        <Text style={styles.subheader}>Log in with your fingerprint</Text>
        <Image
          source={
            localThemes.dark
              ? require('../assets/fingerprintactivedark.png')
              : require('../assets/fingerprintactive.png')
          }
          style={styles.fingerprint}></Image>

        <Text style={styles.footer}>Touch the fingerprint sensor</Text>
        <Pressable onPress={props.onPress}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
function useGlobalStyles() {
  const {dark} = useTheme();
  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  // We only want to recompute the stylesheet on changes in color.
  const styles1 = useMemo(() => styles({colors}), [colors]);

  return styles1;
}
const styles = props =>
  StyleSheet.create({
    header: {
      marginTop: 17,
      color: props.colors.text,
      fontWeight: '700',
      fontSize: 20,
      marginStart: 18,
    },
    subheader: {
      marginTop: 12,
      color: props.colors.text,
      fontWeight: '400',
      fontSize: 14,
      marginStart: 18,
    },
    fingerprint: {
      marginStart: 'auto',
      marginEnd: 'auto',
      marginTop: 35,
    },
    footer: {
      marginTop: 15,
      fontSize: 16,
      color: '#B7B7B7',
      textAlign: 'center',
    },
    cancel: {
      color: '#007236',
      fontSize: 16,
      fontWeight: '700',
      marginStart: 'auto',
      marginEnd: 44,
      marginTop: 8,
    },
    container: {
      backgroundColor: props.colors.secondaryBackground,
      maxHeight: '37%',
      width: '100%',
      flex: 1,
      marginTop: 'auto',
      borderRadius: 18,
    },
  });
export default AppModal;
