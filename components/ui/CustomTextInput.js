import {useTheme} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../constants/styles';
import MyDarkTheme from '../../mythemes/MyDarkTheme';
import MyDefaultTheme from '../../mythemes/MyDefaultTheme';
import strings from '../Language/AuthNames';

function CustomTextInput({}) {
  const [isInputFocused, setIsInputFocused] = useState({
    mobileno: false,
  });
  const [mobile, onChangeMobile] = useState('');

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const styles = useGlobalStyles();

  const handleInputFocus = textinput => {
    setIsInputFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsInputFocused({
      [textinput]: false,
    });
  };
  return (
    <View
      style={
        isInputFocused.mobileno
          ? [
              styles.textinput,
              {flexDirection: en ? 'row' : 'row-reverse'},
              {backgroundColor: 'white', borderColor: '#007236'},
            ]
          : [styles.textinput, , {flexDirection: en ? 'row' : 'row-reverse'}]
      }>
      <Image
        source={require('../../assets/mobile.png')}
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginStart: en ? 24 : 5,
          marginEnd: en ? 0 : 24,

          tintColor: '#B7B7B7',
        }}></Image>
      <View style={{flex: 1}}>
        <Text
          style={
            isInputFocused.mobileno ? [styles.labelfocused] : [styles.label]
          }>
          {strings.mobileno}
        </Text>
        <TextInput
          style={[styles.input, {color: 'black'}]}
          onChangeText={onChangeMobile}
          value={mobile}
          placeholder={strings.mobileno}
          placeholderTextColor={'grey'}
          onBlur={() => handleInputBlur('mobileno')}
          onFocus={() => handleInputFocus('mobileno')}
        />
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
    label: {
      fontWeight: '700',

      fontSize: 16,
      color: 'black',
      marginHorizontal: 23,
      marginTop: 11,
    },

    labelfocused: {
      fontSize: 16,
      color: '#007236',
      fontWeight: '700',

      marginHorizontal: 23,
      marginTop: 11,
    },
    textinput: {
      marginTop: 20,

      padding: 0,
      flexDirection: 'row',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      backgroundColor: '#FFFFFF',

      alignItems: 'center',
      margin: 0,
      flex: 0.2,
    },

    input: {
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
      marginStart: 20,
    },
  });

export default CustomTextInput;
