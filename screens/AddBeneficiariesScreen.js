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
import SelectDropdown from 'react-native-select-dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {ScrollView} from 'react-native-gesture-handler';

function AddBeneficiariesScreen({navigation}) {
  const isFocused = useIsFocused();
  const localThemes = useTheme();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const styles = useGlobalStyles();
  const windowHeight = Dimensions.get('window').height;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [branch, setBranch] = useState('');
  const [accountno, setAccountno] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [email, setEmail] = useState('');

  const [isInputFocused, setIsInputFocused] = useState({
    firstname: false,
    lastname: false,
    branch: false,
    accountno: false,
    phoneno: false,
    email: false,
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

  function confirmAddingBen() {
    navigation.navigate('ConfirmMobile', {
      source: 'AddBeneficiaries',
      mobileNum: phoneno,
    });
  }

  return (
    <ScrollView contentContainerStyle={{height: windowHeight + 150}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackButton destination="Beneficiaries" />
            <Image
              source={require('../assets/Benf/notificationgrey.png')}
              style={{
                resizeMode: 'cover',
                marginStart: en ? 6 : 0,
                marginEnd: en ? 0 : 6,
              }}
            />
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
        <View style={styles.camera}>
          <Image
            source={require('../assets/Benf/camera.png')}
            style={{
              resizeMode: 'cover',
              marginStart: en ? 6 : 0,
              marginEnd: en ? 0 : 6,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
            <View
              style={[
                !isInputFocused.firstname
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
                  isInputFocused.firstname
                    ? [styles.label, {color: '#007236'}]
                    : [styles.label, {color: 'black'}]
                }>
                {strings.firstname}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={strings.firstname}
                value={firstname}
                onChangeText={setFirstname}
                placeholderTextColor={localThemes.colors.primary}
                onFocus={() => handleInputFocus('firstname')}
                onBlur={() => handleInputBlur('firstname')}
              />
            </View>
            <View
              style={[
                !isInputFocused.lastname
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

                  marginStart: en ? 16 : 0,
                  marginEnd: en ? 0 : 16,
                },
              ]}>
              <Text
                style={
                  isInputFocused.lastname
                    ? [styles.label, {color: '#007236'}]
                    : [styles.label, {color: 'black'}]
                }>
                {strings.lastname}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={strings.lastname}
                value={lastname}
                onChangeText={setLastName}
                placeholderTextColor={localThemes.colors.primary}
                onFocus={() => handleInputFocus('lastname')}
                onBlur={() => handleInputBlur('lastname')}
              />
            </View>
          </View>
          <View style={{backgroundColor: 'white', marginTop: 16}}>
            <Text
              style={
                isInputFocused.branch
                  ? [styles.label, {color: '#007236'}]
                  : [styles.label, {color: 'black'}]
              }>
              {strings.bankbranch}
            </Text>
            <SelectDropdown
              defaultButtonText={en ? 'Select branch' : 'اختار فرع البنك'}
              data={[
                en ? '043 - Water Way Mall' : ' 043 - فرع واتر واي مول ',
                en ? '045 - City Stars Mall' : ' 045 - فرع سيتي ستارز ',
              ]}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderDropdownIcon={() => {
                return <Image source={require('../assets/Benf/down.png')} />;
              }}
              dropdownIconPosition={en ? 'right' : 'left'}
              buttonStyle={{
                width: '100%',
                backgroundColor: 'white',
                alignItems: en ? 'flex-end' : 'flex-start',
                flexDirection: 'column',
              }}
              buttonTextStyle={{
                fontSize: 16,
                alignSelf: en ? 'flex-start' : 'flex-end',
              }}
              onFocus={() => handleInputFocus('branch')}
              onBlur={() => handleInputFocus('branch')}
            />
          </View>
          <View
            style={[
              !isInputFocused.accountno
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
                isInputFocused.accountno
                  ? [styles.label, {color: '#007236'}]
                  : [styles.label, {color: 'black'}]
              }>
              {strings.accountno}
            </Text>
            <TextInput
              style={styles.input}
              value={accountno}
              onChangeText={setAccountno}
              placeholder={strings.accountno}
              placeholderTextColor={localThemes.colors.primary}
              onFocus={() => handleInputFocus('accountno')}
              onBlur={() => handleInputBlur('accountno')}
            />
          </View>
          <View
            style={[
              !isInputFocused.phoneno
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
                isInputFocused.phoneno
                  ? [styles.label, {color: '#007236'}]
                  : [styles.label, {color: 'black'}]
              }>
              {strings.phoneno}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={strings.mobileno}
              value={phoneno}
              onChangeText={setPhoneno}
              placeholderTextColor={localThemes.colors.primary}
              onFocus={() => handleInputFocus('phoneno')}
              onBlur={() => handleInputBlur('phoneno')}
            />
          </View>
          <View
            style={[
              !isInputFocused.email
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
                isInputFocused.email
                  ? [styles.label, {color: '#007236'}]
                  : [styles.label, {color: 'black'}]
              }>
              {strings.email}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={strings.email}
              placeholderTextColor={localThemes.colors.primary}
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Button
            style={{flex: 1}}
            bstyle={{marginVertical: 25}}
            onPress={() => confirmAddingBen()}>
            {strings.addbeneficiar}
          </Button>
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
      paddingHorizontal: 25,
      marginTop: 55,
      backgroundColor: props.colors.background,
      flex: 1,
    },
    camera: {
      marginTop: 20,
      backgroundColor: 'white',
      borderRadius: 30,
      marginHorizontal: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.22,
    },
    input: {
      fontSize: 16,
      fontWeight: '400',
      color: props.colors.text,
      marginHorizontal: 13,
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
      borderRadius: 10,
      margin: 0,
      flex: 1,
      backgroundColor: props.colors.card,
    },
  });
export default AddBeneficiariesScreen;
