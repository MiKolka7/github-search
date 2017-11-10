import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { NetInfo } from 'react-native';

import registerScreens, { screens } from './screens';
import configureStore from './store/configureStore';
import { connectionState } from './actions/app.actions';

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
    screen: screens.authScreen,
    tabsStyle: {
        tabBarButtonColor:         'white',
        tabBarSelectedButtonColor: 'white',
        tabBarBackgroundColor:     'black'
    }
});


NetInfo.isConnected.addEventListener('connectionChange', changeNetworkStatus);

function changeNetworkStatus(status) {
    store.dispatch(connectionState(status));
}
