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
import {useDispatch, useSelector} from 'react-redux';
import strings from './Language/AuthNames';
function AppModal(props) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

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
      <View
        style={{
          backgroundColor: 'rgba(28, 36, 55, 0.77)',
          flex: 1,
          paddingHorizontal: 25,
        }}></View>
      <View style={styles.container}>
        <Text style={styles.header}>{strings.fingerPrint}</Text>
        <Text style={styles.subheader}>{strings.fingerPrintLogin}</Text>
        <Image
          source={
            localThemes.dark
              ? require('../assets/fingerprintactivedark.png')
              : require('../assets/fingerprintactive.png')
          }
          style={styles.fingerprint}></Image>

        <Text style={styles.footer}>{strings.touch}</Text>
        <Pressable
          onPress={props.onPress}
          style={{flex: 1, flexDirection: en ? 'row' : 'row-reverse'}}>
          <Text
            style={[
              styles.cancel,
              {flexDirection: en ? 'row' : 'row-reverse'},
            ]}>
            {strings.cancel}
          </Text>
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
      fontSize: 22,
      marginHorizontal: 18,
    },
    subheader: {
      marginTop: 12,
      color: props.colors.text,
      fontWeight: '400',
      fontSize: 18,
      marginHorizontal: 18,
    },
    fingerprint: {
      marginStart: 'auto',
      marginEnd: 'auto',
      marginTop: 35,
    },
    footer: {
      marginTop: 15,
      fontSize: 18,
      color: '#B7B7B7',
      textAlign: 'center',
    },
    cancel: {
      color: '#007236',
      fontSize: 20,
      fontWeight: '700',
      marginStart: 'auto',
      marginTop: 8,
    },
    container: {
      backgroundColor: props.colors.secondaryBackground,
      maxHeight: '37%',
      width: '100%',
      flex: 1,
      marginTop: 'auto',
      paddingHorizontal: 25,
      borderRadius: 18,
    },
  });
export default AppModal;
