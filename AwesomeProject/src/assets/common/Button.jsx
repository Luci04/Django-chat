import {Text, TouchableOpacity} from 'react-native';

export const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#202020',
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
