import {useIsFocused, useTheme} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import BackButton from '../components/ui/BackButton';

import Button from '../components/ui/Button';
import CustomDropDown from '../components/ui/CustomDropDown';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';

function TransferScreen({navigation}) {
  const isFocused = useIsFocused();
  const localThemes = useTheme();

  const currentL = useSelector(state => state.counter.value);
  const [transferamount, setTransferamount] = useState('');
  const [transferreason, setTransferreason] = useState('');

  const en = currentL === 'en';
  const styles = useGlobalStyles();

  const [isInputFocused, setIsInputFocused] = useState({
    transferamount: false,
    transferreason: false,
  });

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
  const windowHeight = Dimensions.get('window').height;
  function gotoconfirm() {
    navigation.navigate('ConfirmMobile', {
      source: 'Transfer',
    });
  }

  return (
    <ScrollView contentContainerStyle={{height: 800}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackButton destination="Beneficiaries" />
          </View>

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
        <Text style={styles.title}>{strings.transfer}</Text>
        <CustomDropDown label={strings.typeoftransfer} />
        <CustomDropDown label={strings.transferfrom} />
        <CustomDropDown label={strings.transferto} />
        <View style={{flex: 1}}>
          <View
            style={[
              !isInputFocused.transferamount
                ? styles.password
                : [
                    styles.password,
                    {
                      borderRadius: 10,
                      borderStyle: 'solid',
                      borderWidth: 1.5,
                      borderColor: '#007236',
                    },
                  ],
              {
                flexDirection: 'column',
              },
            ]}>
            <Text
              style={
                isInputFocused.transferamount
                  ? [styles.label, {color: '#007236'}]
                  : [styles.label, {color: 'black'}]
              }>
              {strings.amountotransfer}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={strings.amount}
              value={transferamount}
              onChangeText={setTransferamount}
              placeholderTextColor={localThemes.colors.primary}
              onFocus={() => handleInputFocus('transferamount')}
              onBlur={() => handleInputBlur('transferamount')}
            />
          </View>
          <View
            style={[
              !isInputFocused.transferreason
                ? styles.password
                : [
                    styles.password,
                    {
                      borderRadius: 10,
                      borderStyle: 'solid',
                      borderWidth: 1.5,
                      borderColor: '#007236',
                    },
                  ],
              {
                flexDirection: 'column',
              },
            ]}>
            <Text
              style={
                isInputFocused.transferreason
                  ? [styles.label, {color: '#007236'}]
                  : [styles.label, {color: 'black'}]
              }>
              {strings.reasontotransfer}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={strings.reasontotransfer}
              value={transferreason}
              onChangeText={setTransferreason}
              placeholderTextColor={localThemes.colors.primary}
              onFocus={() => handleInputFocus('transferreason')}
              onBlur={() => handleInputBlur('transferreason')}
            />
            <Button bstyle={{marginTop: 24}} onPress={() => gotoconfirm()}>
              {strings.transfer}{' '}
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
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
      paddingTop: 55,
      paddingHorizontal: 25,
    },
    title: {
      fontSize: 20,
      color: props.colors.text,
      fontWeight: '700',
      marginTop: 30,
    },

    label: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
      marginTop: 11,
      marginStart: 16,
      marginEnd: 16,
    },
    password: {
      marginTop: 20,
      padding: 0,
      backgroundColor: props.colors.backgroundColor,
      flexDirection: 'row',
      borderRadius: 15,
      margin: 0,
      flex: 0.25,
      backgroundColor: props.colors.card,
    },
    input: {
      fontSize: 16,
      fontWeight: '400',
      color: props.colors.text,
      marginHorizontal: 13,
    },
  });
export default TransferScreen;
