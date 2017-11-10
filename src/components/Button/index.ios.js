import React from 'react';
import { object } from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Button = props => (
    <TouchableOpacity { ...props }>
        { props.children }
    </TouchableOpacity>
);

Button.propTypes = {
    children: object
};

export default Button;