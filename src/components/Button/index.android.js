import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { object } from 'prop-types';

const Button = (props) => (
    <TouchableNativeFeedback
        background = { TouchableNativeFeedback.SelectableBackground() }
        delayPressIn = { 0 }
        { ...props }
    >
        { props.children }
    </TouchableNativeFeedback>
);

Button.propTypes = {
    children: object
};

export default Button;
