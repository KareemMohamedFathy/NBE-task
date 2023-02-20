import {useTheme} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function BeneficiariesGridCard({
  children,
  onPress,
  bstyle,
  textstyle,
  imagepath,
}) {
  const {dark} = useTheme();

  return (
    <View style={styles.outercontainer}>
      <Pressable onPress={onPress}>
        <View style={[styles.bstyle, bstyle]}>
          <Image
            source={imagepath}
            style={{height: 40, resizeMode: 'contain', marginTop: 14}}></Image>
          {children && (
            <Text style={[styles.textstyle, textstyle]}>{children}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  outercontainer: {
    width: 80,
    marginRight: 13,
    marginTop: 10,
  },
  bstyle: {
    borderRadius: 13,
    height: 90,
    alignItems: 'center',
  },
  textstyle: {
    textAlign: 'center',
    fontSize: 16,
    width: '110%',
    fontWeight: '400',
    margin: 0,
    padding: 0,
    color: '#1C2437',
  },
});
export default BeneficiariesGridCard;
