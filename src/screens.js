import { Navigation } from 'react-native-navigation';

import AuthScreen from './screens/AuthScreen';
import SearchScreen from './screens/SearchScreen';

export default function registerScreens(store, Provider) {
    Navigation.registerComponent('app.authScreen', () => AuthScreen, store, Provider);
    Navigation.registerComponent('app.searchScreen', () => SearchScreen, store, Provider);
}

const navigatorStyle = {
    navBarTextColor: '#000',
    drawUnderTabBar: true,
    tabBarHidden: true
};

export const screens = {
    authScreen: {
        label: 'auth',
        screen: 'app.authScreen',
        title: 'Authorization',
        icon: 'auth',
        navigatorStyle
    },
    searchScreen: {
        label: 'search',
        screen: 'app.searchScreen',
        title: 'Search',
        navigatorStyle
        /*navigatorButtons: {
            rightButtons: [
                {
                    title: 'Log out',
                    id: 'logOut',
                    buttonColor: '#000',
                    buttonFontSize: 14,
                    buttonFontWeight: '600',
                }
            ]
        }*/
    }
};
