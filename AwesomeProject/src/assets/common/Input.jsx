import {Text, TextInput, View} from 'react-native';

export const Input = ({title, value, onChange, isPassword = false}) => {
  return (
    <View>
      <Text
        style={{
          color: '#70747a',
          marginVertical: 6,
          paddingLeft: 16,
        }}>
        {title}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword}
        style={{
          color: '#000',
          backgroundColor: '#e1e2e4',
          borderRadius: 26,
          height: 52,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
      />
    </View>
  );
};
