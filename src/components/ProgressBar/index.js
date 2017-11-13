import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ProgressBar = ({ fullScreen }) => (
    <View style = { fullScreen ? styles.loaderWrap : styles.loader }>
        <ActivityIndicator size = 'large' color = { '#EA0000' } />
    </View>
);

const styles = StyleSheet.create({
    loaderWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProgressBar;
