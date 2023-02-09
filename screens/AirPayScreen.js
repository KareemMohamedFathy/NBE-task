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
import {Modal} from 'react-native-paper';
import History from '../components/Home/History';
import HomeBanner from '../components/Home/HomeBanner';
import HomeModal from '../components/HomeModal';
import strings from '../components/Language/AuthNames';
import AirPayWorkedModal from '../components/AirPayWorkedModal';
import Button from '../components/ui/Button';
import ButtonWithImg from '../components/ui/ButtonWithImg';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import AirPayFailed from '../components/AirPayFailed';

function AirPayScreen({navigation}) {
  const isFocused = useIsFocused();
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  const [choosenCard, setChoosenCard] = useState(strings.dragcard);
  const [isCard, setisCard] = useState(false);
  const [visible, setVisible] = useState(false);

  const [airpayVisible, setAirPayVisible] = useState(false);
  const [airpayFailedVisible, setAirPayFailedVisible] = useState(false);

  function isVisible() {
    setVisible(!visible);
    setAirPayFailedVisible(true);
  }
  function tryAgain() {
    console.log('hi');
    setVisible(!visible);
    setAirPayFailedVisible(false);
  }
  function isAirPayVisible() {
    setAirPayVisible(!airpayVisible);
  }
  function isAirPayFailedVisible() {
    setAirPayFailedVisible(!airpayFailedVisible);
  }

  function setModal() {
    setVisible(true);
  }
  function setAirPayModal() {
    setAirPayVisible(true);
  }
  function getFingerPrint() {
    setVisible(!visible);
    setAirPayModal();
  }
  function chooseCard(img) {
    console.log('hayo');
    setChoosenCard(img);
    setisCard('true');
  }
  useEffect(() => {
    navigation.setOptions({
      tabBarItemStyle: {
        backgroundColor: isFocused ? '#007236' : '#202933',
        margin: 5,
        borderRadius: 16,
      },
    });
  });
  return (
    <View style={[styles.container]}>
      <View
        style={{
          backgroundColor: 'rgba(28, 36, 55, 0.77)',
          paddingHorizontal: 25,
        }}></View>
      <HomeBanner />
      <ScrollView horizontal={true} style={{marginTop: 12}}>
        <Pressable
          onPress={() => chooseCard(require('../assets/Home/redcarddark.png'))}>
          <Image
            style={{marginEnd: 16}}
            source={require('../assets/Home/redcarddark.png')}></Image>
        </Pressable>
        <Pressable
          onPress={() =>
            chooseCard(require('../assets/Home/bluecarddark.png'))
          }>
          <Image
            style={{marginEnd: 16}}
            source={require('../assets/Home/bluecarddark.png')}></Image>
        </Pressable>
        <Pressable
          onPress={() =>
            chooseCard(require('../assets/Home/greencarddark.png'))
          }>
          <Image
            style={{marginEnd: 16}}
            source={require('../assets/Home/greencarddark.png')}></Image>
        </Pressable>
      </ScrollView>
      <View style={{flex: 4, marginBottom: 30}}>
        <View
          style={{
            borderRadius: 27,
            borderStyle: 'dashed',
            borderColor: '#007236',
            flex: 4,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!isCard && <Text style={styles.hold}>{choosenCard}</Text>}
          {isCard && <Image source={choosenCard} style={{}} />}
        </View>
      </View>

      <View>
        <ButtonWithImg
          img={require('../assets/Home/smallfingerprint.png')}
          bstyle={{marginVertical: 24}}
          textstyle={{textAlign: 'center'}}
          onPress={setModal}>
          {strings.paynow}
        </ButtonWithImg>
      </View>
      <HomeModal
        modalon={visible}
        onPress={isVisible}
        onSecure={getFingerPrint}></HomeModal>
      <AirPayWorkedModal
        modalon={airpayVisible}
        onPress={isAirPayVisible}
        onSecure={getFingerPrint}></AirPayWorkedModal>
      <AirPayFailed
        modalon={airpayFailedVisible}
        onPress={isAirPayFailedVisible}
        onTryAgain={tryAgain}></AirPayFailed>
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
      paddingHorizontal: 25,
      paddingTop: 55,
      backgroundColor: props.colors.background,
      flex: 10,
    },
    hold: {
      fontWeight: '500',
      fontSize: 20,
      textAlign: 'center',
      marginHorizontal: 25,
    },
  });

export default AirPayScreen;
