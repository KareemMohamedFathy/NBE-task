import {useFocusEffect, useIsFocused, useTheme} from '@react-navigation/native';
import {useCallback, useMemo, useState} from 'react';
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
import {FlatList} from 'react-native-gesture-handler';
import SmallCard from '../components/ui/SmallCard';
import MediumCard from '../components/ui/MediumCard';

import {useSelector} from 'react-redux';
import {useEffect} from 'react/cjs/react.development';
import HomeBanner from '../components/Home/HomeBanner';
import strings from '../components/Language/AuthNames';
import Button from '../components/ui/Button';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import BeneficiariesGridCard from '../components/ui/BeneficiariesGridCard';
import BeneficiariesDetailedCard from '../components/ui/BeneficiariesDetailedCard';
import MissonCompleteModal from '../components/MissionCompleteModal';
import BeneficiarisOptionsModal from '../components/BeneficiarisOptionsModal';

function BeneficiariesScreen({navigation}) {
  let users = [
    {
      username: 'Hala',
      img: require('../assets/Benf/user.png'),
      mobileno: '0120301231',
      balance: '84,232,2',
    },
    {
      username: 'Ayman',
      img: require('../assets/Benf/user.png'),
      mobileno: '0120301231',
      balance: '84,232,2',
    },
    {
      username: 'Alex',
      img: require('../assets/Benf/user.png'),
      mobileno: '0120301231',
      balance: '84,232,2',
    },
    {
      username: 'Soha1',
      img: require('../assets/Benf/user.png'),
      mobileno: '0120301231',
      balance: '84,232,2',
    },
    {
      username: 'Soha2',
      img: require('../assets/Benf/user.png'),
      mobileno: '0120301231',
      balance: '84,232,2',
    },
  ];
  const history = [
    {username: 'Flat Rent', price: '$892,48.0', date: '15-12-2021'},
    {username: 'House Fixes', price: '$764,92.0', date: '15-12-2021'},
    {username: 'New Laptop', price: '$764,92.0', date: '20-12-2021'},
    {username: 'College Expenses', price: '$764,92.0', date: '20-12-2021'},
  ];

  const [visible, setVisible] = useState(false);
  function isVisible() {
    setVisible(!visible);
  }
  function setModal() {
    setVisible(true);
  }

  const isFocused = useIsFocused();
  const localThemes = useTheme();
  const styles = useGlobalStyles();
  const [numCols, setColumnNo] = useState(4);
  const [index, setIndex] = useState(-1);

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const [renderMode, setRenderMode] = useState('grid');
  function changeRenderMode() {
    const mode = renderMode === 'grid' ? 'list' : 'grid';
    setRenderMode(mode);
    setColumnNo(numCols == 4 ? 1 : 4);
  }
  function gotoAddBen() {
    navigation.navigate('AddBeneficiaries');
  }
  function renderUserHistory(itemData) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'white',
          borderWidth: 0,
          borderBottomWidth: 1,
          marginTop: 12,
        }}>
        <View style={{marginStart: 10}}>
          <Text style={styles.historytitle}>{itemData.item.username}</Text>
          <Text style={styles.historydate}>{itemData.item.date}</Text>
        </View>
        <Text style={styles.historyprice}>{itemData.item.price}</Text>
      </View>
    );
  }
  function renderUsersItem(itemData) {
    return (
      <BeneficiariesGridCard
        bstyle={{
          backgroundColor: '#F8F9FC',
        }}
        imagepath={itemData.item.img}>
        {itemData.item.username}
      </BeneficiariesGridCard>
    );
  }
  function transactionHistory(itemdata) {
    setIndex(index !== -1 ? -1 : itemdata.index);
  }

  function renderUsersDetailed(itemData) {
    return (
      <BeneficiariesDetailedCard
        itemdata={itemData}
        onPress={transactionHistory}
        onOptions={onOptions}
      />
    );
  }
  function onOptions() {
    setModal(true);
  }

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarLabelStyle: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 11,
      },
    });
  });

  return (
    <View style={styles.container}>
      <HomeBanner />
      {index === -1 && (
        <View
          style={[
            styles.bentitle,
            {flexDirection: en ? 'row' : 'row-reverse'},
          ]}>
          <Text style={[styles.beneficiaries]}>{strings.beneficiaries}</Text>
          <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
            <Pressable onPress={changeRenderMode}>
              <Image
                source={
                  renderMode === 'grid'
                    ? require('../assets/Benf/grid.png')
                    : require('../assets/Benf/list.png')
                }
              />
            </Pressable>
            <Pressable onPress={gotoAddBen}>
              <Image
                source={
                  en
                    ? require('../assets/Benf/Add.png')
                    : require('../assets/Benf/addar.png')
                }
                style={{marginStart: en ? 10 : 0, marginEnd: en ? 0 : 10}}
              />
            </Pressable>
          </View>
        </View>
      )}

      {users.length == 0 && (
        <View
          style={{flex: 20, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/Benf/noben.png')}
            style={{marginStart: 10}}
          />
          <Text style={styles.nobenheader}>{strings.nobeneficiaries}</Text>
          <Text style={styles.nobencontent}>{strings.nobeneficiariesadd}</Text>
          <Pressable onPress={gotoAddBen}>
            <Image
              source={
                en
                  ? require('../assets/Benf/Add.png')
                  : require('../assets/Benf/addar.png')
              }
              style={{marginStart: en ? 10 : 0, marginEnd: en ? 0 : 10}}
            />
          </Pressable>
        </View>
      )}

      <View style={{flex: index == -1 ? 15 : 1, marginTop: 15}}>
        <FlatList
          data={index == -1 ? users : [users[index]]}
          renderItem={
            renderMode === 'grid' ? renderUsersItem : renderUsersDetailed
          }
          key={numCols}
          keyExtractor={item => item.username}
          horizontal={false}
          numColumns={numCols}
        />
      </View>
      {index !== -1 && (
        <View style={{flex: 5}}>
          <Text style={styles.beneficiaries}>
            {strings.transactionshistory}
          </Text>
          {history.length == 0 && (
            <View
              style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/Benf/transactions.png')}
                style={{marginStart: 10}}
              />
              <Text style={styles.nobenheader}>{strings.no}</Text>
              <Text style={styles.nobencontent}>{strings.notransactions}</Text>
            </View>
          )}
          <FlatList
            data={history}
            renderItem={renderUserHistory}
            keyExtractor={item => item.username}
          />
        </View>
      )}
      <BeneficiarisOptionsModal
        modalon={visible}
        onPress={isVisible}></BeneficiarisOptionsModal>
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
      flex: 10,
      backgroundColor: props.colors.background,
      paddingTop: 55,
      paddingHorizontal: 25,
    },
    beneficiaries: {
      fontWeight: '700',
      fontSize: 20,
      color: props.colors.text,
    },
    bentitle: {
      justifyContent: 'space-between',
      marginTop: 30,
      flex: 1,
    },
    nobenheader: {
      color: props.colors.text,
      fontWeight: '500',
      fontSize: 18,
      textAlign: 'center',
    },
    historytitle: {
      fontSize: 18,
      color: props.colors.text,
    },
    historydate: {
      color: '#B7B7B7',
      fontSize: 14,
      marginBottom: 10,
    },
    historyprice: {
      color: props.colors.text,
      fontWeight: '700',
      fontSize: 18,
      marginStart: 'auto',
      marginBottom: 10,
    },

    nobencontent: {
      color: '#464665',
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 35,
    },
  });
export default BeneficiariesScreen;
