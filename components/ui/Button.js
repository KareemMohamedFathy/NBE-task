import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function Button({children, onPress, bstyle, textstyle}) {
  return (
    <View style={[styles.bstyle, bstyle]}>
      <Pressable onPress={onPress}>
        <View>
          <Text style={[styles.textstyle, textstyle]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  bstyle: {
    backgroundColor: '#007236',
    padding: 16,
    borderRadius: 13,
  },
  textstyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Button;
