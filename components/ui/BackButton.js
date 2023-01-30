import {Pressable, Image} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
function BackButton({destination}) {
  const navigation = useNavigation();
  const {dark} = useTheme();
  return (
    <Pressable onPress={() => navigation.navigate(destination)}>
      {!dark && (
        <Image
          source={require('../../assets/back.png')}
          style={{resizeMode: 'cover'}}
        />
      )}
      {dark && (
        <Image
          source={require('../../assets/backdark.png')}
          style={{resizeMode: 'cover'}}
        />
      )}
    </Pressable>
  );
}
export default BackButton;
