import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const Title = ({text, color}) => {
  return (
    <Text
      style={{
        color: color,
        textAlign: 'center',
        fontFamily: 'LeckerliOne-Regular',
        fontSize: 40,
      }}>
      {text}
    </Text>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Title;
